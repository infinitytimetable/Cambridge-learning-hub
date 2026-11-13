#!/bin/bash
# usage: buildx.sh OUT.html data7x.js   -> private build with only your own data7 file (others excluded)
OUT=$1; MINE=$2
cd /home/claude/hub || exit 1
cat core.js cov.js data1.js data2.js data3.js data4.js data5.js data6.js $MINE extra.js app.js > "${OUT%.html}.bundle.js"
{
  echo '<title>IGCSE Chemistry 0620 Hub</title>'
  echo '<meta name="claude:viewport-fit-sides" content="cover">'
  echo '<style>'; cat style.css; echo '</style>'
  cat body.html
  echo '<script>'; cat "${OUT%.html}.bundle.js"; echo '</script>'
} > "$OUT"
