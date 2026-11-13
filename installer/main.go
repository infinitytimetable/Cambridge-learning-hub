package main

import (
	"archive/zip"
	"bufio"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

func pause() {
	fmt.Println()
	fmt.Print("  Press Enter to close this window...")
	bufio.NewReader(os.Stdin).ReadString('\n')
}

func fail(msg string) {
	fmt.Println()
	fmt.Println("  " + msg)
	pause()
	os.Exit(1)
}

func main() {
	fmt.Println()
	fmt.Println("  LOTS Cambridge Learning Hub - Setup 4.0")
	fmt.Println("  Preparing the installer files, please wait...")
	self, err := os.Executable()
	if err != nil {
		fail("Could not find the installer file.")
	}
	f, err := os.Open(self)
	if err != nil {
		fail("Could not open the installer file.")
	}
	defer f.Close()
	st, _ := f.Stat()
	zr, err := zip.NewReader(f, st.Size())
	if err != nil {
		fail("The installer data is missing or damaged. Please download it again.")
	}
	base := ""
	if la := os.Getenv("LOCALAPPDATA"); la != "" {
		base = filepath.Join(la, "LOTS Hub", "setup-tmp")
		os.MkdirAll(base, 0o755)
	}
	tmp, err := os.MkdirTemp(base, "run-")
	if err != nil {
		tmp, err = os.MkdirTemp("", "LOTS-Hub-Setup-")
	}
	if err != nil {
		fail("Could not create a temporary folder.")
	}
	defer os.RemoveAll(tmp)
	for _, zf := range zr.File {
		p := filepath.Join(tmp, filepath.FromSlash(zf.Name))
		if !strings.HasPrefix(p, filepath.Clean(tmp)+string(os.PathSeparator)) {
			continue
		}
		if zf.FileInfo().IsDir() {
			os.MkdirAll(p, 0o755)
			continue
		}
		os.MkdirAll(filepath.Dir(p), 0o755)
		rc, err := zf.Open()
		if err != nil {
			fail("Could not read the installer data.")
		}
		out, err := os.Create(p)
		if err != nil {
			fail("Could not write to the temporary folder (disk full?).")
		}
		_, err = io.Copy(out, rc)
		out.Close()
		rc.Close()
		if err != nil {
			fail("Could not unpack the installer files (disk full?).")
		}
	}
	if len(os.Args) > 1 && os.Args[1] == "--unpack-test" {
		fmt.Println("unpacked to", tmp)
		ents, _ := os.ReadDir(filepath.Join(tmp, "setup"))
		for _, e := range ents {
			fmt.Println(" ", e.Name())
		}
		return
	}
	ps := filepath.Join(tmp, "setup", "install.ps1")
	for i := 0; i < 5; i++ {
		if _, e := os.Stat(ps); e == nil {
			break
		}
		time.Sleep(time.Second)
	}
	if _, e := os.Stat(ps); e != nil {
		fail("Setup could not find its install script. Your antivirus (Windows Security) probably removed it.\n  Please unzip the whole download and double-click Install.bat instead,\n  or allow the file in Windows Security and run Setup again.")
	}
	cmd := exec.Command("powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", ps)
	cmd.Stdin, cmd.Stdout, cmd.Stderr = os.Stdin, os.Stdout, os.Stderr
	if err := cmd.Run(); err != nil {
		fmt.Println()
		fmt.Println("  The setup did not finish:", err)
	}
	pause()
}
