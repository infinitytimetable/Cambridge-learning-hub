package zm.lots.teachinghub;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.core.content.FileProvider;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.util.Collections;

public class MainActivity extends Activity {
    static final String HOST = "appassets.androidplatform.net";
    static final String HOME = "https://" + HOST + "/app/hub.html";
    static final String REPO_RAW = "https://raw.githubusercontent.com/infinitytimetable/Cambridge-learning-hub/main/";
    static final String MANIFEST = REPO_RAW + "update/manifest.json";
    static final int FILE_PICK = 41, PERM_WRITE = 42;

    WebView web;
    FrameLayout root;
    View customView;
    WebChromeClient.CustomViewCallback customCb;
    WebChromeClient chrome;
    ValueCallback<Uri[]> fileCb;
    WebViewAssetLoader loader;
    SharedPreferences prefs;
    String bridgeJs = "";
    boolean updateRunning = false;

    /* file being saved from the hub */
    File dlTmp; OutputStream dlOut; String dlName, dlMime;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        prefs = getSharedPreferences("hub", MODE_PRIVATE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        root = new FrameLayout(this);
        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);
        immersive();

        try { bridgeJs = readAll(getAssets().open("bridge.js")); } catch (IOException e) { bridgeJs = ""; }

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportZoom(true);
        s.setBuiltInZoomControls(true);
        s.setDisplayZoomControls(false);
        s.setTextZoom(100);
        s.setJavaScriptCanOpenWindowsAutomatically(true);
        s.setSupportMultipleWindows(false);

        loader = new WebViewAssetLoader.Builder().setDomain(HOST).addPathHandler("/app/", new HubHandler()).build();
        web.addJavascriptInterface(new Bridge(), "LOTSANDROID");
        if (WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
            WebViewCompat.addDocumentStartJavaScript(web, bridgeJs, Collections.singleton("https://" + HOST));
        }

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
                return loader.shouldInterceptRequest(r.getUrl());
            }
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (HOST.equals(u.getHost())) return false;
                String sc = u.getScheme();
                if ("blob".equals(sc) || "data".equals(sc) || "javascript".equals(sc) || "about".equals(sc)) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (ActivityNotFoundException e) { toast("No app can open this link."); }
                return true;
            }
            @Override
            public void onPageFinished(WebView v, String url) {
                if (!WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) v.evaluateJavascript(bridgeJs, null);
            }
        });

        chrome = new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
                if (fileCb != null) fileCb.onReceiveValue(null);
                fileCb = cb;
                try {
                    Intent i = p.createIntent();
                    i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, p.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE);
                    startActivityForResult(i, FILE_PICK);
                } catch (Exception e) {
                    fileCb = null; toast("No file picker found on this device."); return false;
                }
                return true;
            }
            @Override
            public void onShowCustomView(View view, CustomViewCallback cb) {
                if (customView != null) { cb.onCustomViewHidden(); return; }
                customView = view; customCb = cb;
                root.addView(view, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                web.setVisibility(View.GONE); immersive();
            }
            @Override
            public void onHideCustomView() {
                if (customView == null) return;
                root.removeView(customView); customView = null;
                web.setVisibility(View.VISIBLE);
                if (customCb != null) customCb.onCustomViewHidden();
                customCb = null; immersive();
            }
        };
        web.setWebChromeClient(chrome);

        if (b != null) web.restoreState(b); else web.loadUrl(HOME);
        checkForUpdate(false);
    }

    /* ---------- the hub page: the newest downloaded copy, or the one inside the app ---------- */
    File hubFile() { return new File(new File(getFilesDir(), "hub"), "hub.html"); }

    class HubHandler implements WebViewAssetLoader.PathHandler {
        @Override
        public WebResourceResponse handle(String path) {
            try {
                if (path.equals("hub.html") || path.isEmpty()) {
                    File f = hubFile();
                    InputStream in = (f.exists() && f.length() > 1000000) ? new FileInputStream(f) : getAssets().open("hub.html");
                    return new WebResourceResponse("text/html", "utf-8", in);
                }
                String mime = path.endsWith(".js") ? "text/javascript" : path.endsWith(".css") ? "text/css" : path.endsWith(".png") ? "image/png" : "application/octet-stream";
                return new WebResourceResponse(mime, "utf-8", getAssets().open(path));
            } catch (IOException e) {
                return null;
            }
        }
    }

    /* ---------- over-the-air updates of the hub page (same update list as the Windows hub) ---------- */
    boolean online() {
        try {
            ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo ni = cm.getActiveNetworkInfo();
            return ni != null && ni.isConnected();
        } catch (Exception e) { return true; }
    }

    void checkForUpdate(final boolean userAsked) {
        if (updateRunning) return;
        long last = prefs.getLong("lastCheck", 0);
        if (!userAsked && System.currentTimeMillis() - last < 3 * 3600 * 1000L) return;
        if (!online()) { if (userAsked) toast("No internet connection."); return; }
        updateRunning = true;
        new Thread(() -> {
            try {
                JSONObject m = new JSONObject(new String(get(MANIFEST + "?t=" + System.currentTimeMillis()), "UTF-8"));
                String ver = m.optString("version", "");
                JSONArray files = m.getJSONArray("files");
                JSONObject hub = null;
                for (int i = 0; i < files.length(); i++) if ("hub.html".equals(files.getJSONObject(i).optString("name"))) hub = files.getJSONObject(i);
                prefs.edit().putLong("lastCheck", System.currentTimeMillis()).apply();
                if (hub == null) { done(userAsked, "No update found."); return; }
                String sha = hub.getString("sha256");
                String have = prefs.getString("sha", bundledSha());
                if (sha.equalsIgnoreCase(have)) { done(userAsked, "You have the latest version (" + ver + ")."); return; }
                File dir = new File(getFilesDir(), "hub"); dir.mkdirs();
                File tmp = new File(dir, "hub.tmp");
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                HttpURLConnection c = (HttpURLConnection) new URL(REPO_RAW + hub.getString("path") + "?v=" + sha.substring(0, 12)).openConnection();
                c.setConnectTimeout(20000); c.setReadTimeout(60000);
                try (InputStream in = c.getInputStream(); OutputStream out = new FileOutputStream(tmp)) {
                    byte[] buf = new byte[65536]; int n;
                    while ((n = in.read(buf)) > 0) { out.write(buf, 0, n); md.update(buf, 0, n); }
                }
                String got = hex(md.digest());
                if (!got.equalsIgnoreCase(sha)) { tmp.delete(); done(userAsked, "The update did not download correctly. It will try again later."); return; }
                File f = hubFile();
                if (f.exists()) f.delete();
                if (!tmp.renameTo(f)) { done(userAsked, "Could not save the update."); return; }
                prefs.edit().putString("sha", sha).putString("ver", ver).apply();
                runOnUiThread(() -> new AlertDialog.Builder(this)
                        .setTitle("Update ready")
                        .setMessage("Version " + ver + " of the hub has been downloaded.\n\n" + m.optString("notes", ""))
                        .setPositiveButton("Restart now", (d, w) -> web.loadUrl(HOME))
                        .setNegativeButton("Later", null)
                        .show());
            } catch (Exception e) {
                done(userAsked, "Could not check for updates right now.");
            } finally {
                updateRunning = false;
            }
        }).start();
    }

    void done(boolean userAsked, String msg) { if (userAsked) runOnUiThread(() -> toast(msg)); }

    String bundledSha() {
        try { return readAll(getAssets().open("hub.sha256")).trim(); } catch (IOException e) { return ""; }
    }

    static byte[] get(String u) throws IOException {
        HttpURLConnection c = (HttpURLConnection) new URL(u).openConnection();
        c.setConnectTimeout(15000); c.setReadTimeout(30000);
        try (InputStream in = c.getInputStream()) {
            ByteArrayOutputStream o = new ByteArrayOutputStream(); byte[] buf = new byte[16384]; int n;
            while ((n = in.read(buf)) > 0) o.write(buf, 0, n);
            return o.toByteArray();
        }
    }

    static String hex(byte[] b) { StringBuilder s = new StringBuilder(); for (byte x : b) s.append(String.format("%02x", x)); return s.toString(); }

    static String readAll(InputStream in) throws IOException {
        ByteArrayOutputStream o = new ByteArrayOutputStream(); byte[] buf = new byte[16384]; int n;
        while ((n = in.read(buf)) > 0) o.write(buf, 0, n);
        in.close(); return o.toString("UTF-8");
    }

    /* ---------- saving exported files ---------- */
    class Bridge {
        @JavascriptInterface
        public String version() { return BuildConfigVersion(); }

        @JavascriptInterface
        public void begin(String name, String mime) {
            try {
                if (dlOut != null) dlOut.close();
                dlName = name.replaceAll("[\\\\/:*?\"<>|]+", "_");
                dlMime = mime;
                dlTmp = new File(getCacheDir(), "save.tmp");
                dlOut = new FileOutputStream(dlTmp);
            } catch (IOException e) { dlOut = null; }
        }

        @JavascriptInterface
        public void chunk(String b64) {
            try { if (dlOut != null) dlOut.write(Base64.decode(b64, Base64.DEFAULT)); } catch (IOException e) { }
        }

        @JavascriptInterface
        public String end() {
            try {
                if (dlOut == null) return "error";
                dlOut.close(); dlOut = null;
                final Uri uri = store(dlTmp, dlName, dlMime);
                final String n = dlName, mime = dlMime;
                runOnUiThread(() -> saved(uri, n, mime));
                return "ok";
            } catch (Exception e) {
                runOnUiThread(() -> toast("Could not save the file."));
                return "error";
            }
        }

        @JavascriptInterface
        public void checkUpdate() { runOnUiThread(() -> checkForUpdate(true)); }
    }

    String BuildConfigVersion() {
        try { return getPackageManager().getPackageInfo(getPackageName(), 0).versionName; } catch (Exception e) { return ""; }
    }

    /* Android 10+: Downloads/My Teaching Hub. Older: the same folder if allowed, otherwise the app's own folder. */
    Uri store(File src, String name, String mime) throws IOException {
        if (Build.VERSION.SDK_INT >= 29) {
            ContentValues v = new ContentValues();
            v.put(MediaStore.MediaColumns.DISPLAY_NAME, name);
            v.put(MediaStore.MediaColumns.MIME_TYPE, mime);
            v.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/My Teaching Hub");
            Uri u = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
            if (u == null) throw new IOException("insert failed");
            try (OutputStream o = getContentResolver().openOutputStream(u); InputStream in = new FileInputStream(src)) { copy(in, o); }
            return u;
        }
        File dir;
        if (checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
            dir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), "My Teaching Hub");
        } else {
            runOnUiThread(() -> requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, PERM_WRITE));
            dir = new File(getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), "My Teaching Hub");
        }
        dir.mkdirs();
        File out = new File(dir, name);
        try (InputStream in = new FileInputStream(src); OutputStream o = new FileOutputStream(out)) { copy(in, o); }
        return FileProvider.getUriForFile(this, "zm.lots.teachinghub.files", out);
    }

    static void copy(InputStream in, OutputStream o) throws IOException {
        byte[] buf = new byte[65536]; int n; while ((n = in.read(buf)) > 0) o.write(buf, 0, n);
    }

    void saved(final Uri uri, final String name, final String mime) {
        new AlertDialog.Builder(this)
                .setTitle("Saved")
                .setMessage(name + "\n\nIt is in the Download folder, under My Teaching Hub.")
                .setPositiveButton("Open", (d, w) -> {
                    Intent i = new Intent(Intent.ACTION_VIEW).setDataAndType(uri, mime).addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    try { startActivity(i); } catch (ActivityNotFoundException e) { toast("No app on this device can open this file. Use Share instead."); }
                })
                .setNeutralButton("Share", (d, w) -> {
                    Intent i = new Intent(Intent.ACTION_SEND).setType(mime).putExtra(Intent.EXTRA_STREAM, uri).addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    try { startActivity(Intent.createChooser(i, "Share " + name)); } catch (ActivityNotFoundException e) { toast("No app can share this file."); }
                })
                .setNegativeButton("Close", null)
                .show();
    }

    /* ---------- screen, back button, file picker ---------- */
    void immersive() {
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    }

    @Override
    public void onWindowFocusChanged(boolean f) { super.onWindowFocusChanged(f); if (f) immersive(); }

    @Override
    protected void onResume() { super.onResume(); web.onResume(); checkForUpdate(false); }

    @Override
    protected void onPause() { web.onPause(); super.onPause(); }

    @Override
    protected void onSaveInstanceState(Bundle o) { super.onSaveInstanceState(o); web.saveState(o); }

    @Override
    public void onBackPressed() {
        if (customView != null) { chrome.onHideCustomView(); return; }
        if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    }

    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (req == FILE_PICK && fileCb != null) {
            Uri[] r = null;
            if (res == RESULT_OK && data != null) {
                if (data.getClipData() != null) {
                    int n = data.getClipData().getItemCount(); r = new Uri[n];
                    for (int i = 0; i < n; i++) r[i] = data.getClipData().getItemAt(i).getUri();
                } else if (data.getData() != null) r = new Uri[]{data.getData()};
            }
            fileCb.onReceiveValue(r); fileCb = null;
        }
    }

    void toast(String t) { Toast.makeText(this, t, Toast.LENGTH_LONG).show(); }
}
