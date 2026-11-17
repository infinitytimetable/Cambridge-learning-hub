#!/bin/bash
# usage: bash build.sh [master|igcse|alevel|all]   (default: master -> hub.html; igcse -> hub_igcse.html; alevel -> hub_alevel.html)
cd /home/claude/hub || exit 1
ALL="core.js pastq_core.js proj.js lx0.js cov.js data1.js data2.js data3.js data4.js data5.js data6.js data7a.js data7b.js data7c.js data7d.js data7e.js data7f.js data7g.js data7h.js data8a.js data8b.js data8c.js data8d.js data8e.js data9_tq.js bio0.js bio_img.js bio_a.js bio_b.js bio_c.js bio_d.js bio_e.js bio_f.js bio_g.js bio_h.js bio_i.js bio_j.js bio9.js alevel0.js al_img.js alevel_a.js alevel_b.js alevel_c.js alevel_d.js alevel_e.js alevel_f.js al_qf1.js al_qf2.js al_qf3.js al_qf4.js alevel_q1.js alevel_q2.js alevel_q3.js alevel_q4.js alevel9.js alevel_x.js alevel_x2.js extra.js biox.js LXFILES ov0.js obj_chem.js obj_bio.js obj_alevel.js sp_c1.js sp_c2.js sp_b1.js sp_b2.js sp_a1.js sub.js ibl.js hubsubs.js lxmerge.js gapfill.js al_pack.js al_packrun.js al_extra.js al_x_a.js al_x_b.js al_x_c.js al_x_d.js al_z_a.js al_z_b.js al_z_c.js al_z_d.js al_extrarun.js desk.js PQDATA pastq_apply.js pptx.js plan_tpl.js plan.js assess_assets.js assess.js util.js prac_chem.js prac_bio.js prac_al.js pracmap.js progress.js progress_report.js prac.js prac_plan.js sims.js sim_a.js sim_b.js sim_c.js sim_d.js sim_e.js sim_f.js sim_g.js sim_h.js sim_i.js ov.js ovlearn.js spui.js help.js x4.js gl.js mob.js X4FILES app.js ui1.js teach.js settings.js x4tools.js learner.js tools.js"
grp(){ case "$1" in
  lx_c_*|lxi_c_*) echo chem;; lx_b_*|lxi_b_*) echo bio;; lx_a_*|lxi_a_*) echo alevel;;
  pastq_chem.js) echo chem;; pastq_bio.js) echo bio;; pastq_alevel.js) echo alevel;;
  data*.js|extra.js|prac_chem.js) echo chem;;
  bio*.js|prac_bio.js) echo bio;;
  alevel*.js|al_*.js|prac_al.js) echo alevel;;
  *) echo core;; esac; }
build_one(){
  MODE=$1
  case $MODE in
    master) SUBS="chem bio alevel"; OUT=hub.html; TEACHER=true; TAG="MASTER HUB"; HEAD="Choose your subject"; TITLE="LOTS Cambridge Learning Hub | Master Hub"
      BLURB="Everything in one place: all three subjects, plus the teacher tools (Learner progress, Lesson plans and Assessments). Your progress is saved separately for every subject.";;
    igcse) SUBS="chem bio"; OUT=hub_igcse.html; TEACHER=false; TAG="IGCSE"; HEAD="Choose your subject"; TITLE="LOTS Cambridge Learning Hub | IGCSE"
      BLURB="Lessons, notes, worksheets, inquiry tasks, quizzes, flashcards, topical questions and games for IGCSE Chemistry 0620 and IGCSE Biology 0610. Your progress is saved separately for every subject.";;
    alevel) SUBS="alevel"; OUT=hub_alevel.html; TEACHER=false; TAG="A LEVEL"; HEAD="AS and A Level Biology"; TITLE="LOTS Cambridge Learning Hub | A Level"
      BLURB="Lessons, notes, worksheets, inquiry tasks, quizzes, flashcards, past-paper questions and games for Cambridge AS and A Level Biology 9700. Your progress is saved in this browser.";;
  esac
  JS=$(for s in $SUBS; do printf '"%s",' $s; done); JS="[${JS%,}]"
  {
    echo "const HUB={mode:\"$MODE\",subs:$JS,teacher:$TEACHER,tag:\"$TAG\",heading:\"$HEAD\",docTitle:\"$TITLE\",blurb:\"$BLURB\"};"
    LXL=$(ls lx_*.js 2>/dev/null; if [ "$MODE" = master ]; then ls lxi_*.js 2>/dev/null; fi); LXL=$(echo $LXL)
    ALLX=${ALL/LXFILES/$LXL}; ALLX=${ALLX/PQDATA/pastq_chem.js pastq_bio.js pastq_alevel.js}; X4L=$(ls data_x4*.js bio_x4*.js al_x4*.js 2>/dev/null); X4L=$(echo $X4L); ALLX=${ALLX/X4FILES/$X4L}
    for f in $ALLX; do
      case " ov.js sims.js sim_a.js sim_b.js sim_c.js sim_d.js sim_e.js sim_f.js sim_g.js sim_h.js sim_i.js " in *" $f "*) [ "$MODE" = master ] || continue;; esac
      g=$(grp $f)
      if [ "$f" = "sub.js" ]; then
        case " $SUBS " in *" chem "*) ;; *) echo 'const MATCH={},EQ=[],FORGE=[],WORDS=[],JOKES=[];';; esac
        case " $SUBS " in *" bio "*) ;; *) echo 'const BIO_U=[],BIO_MATCH={},BIO_WORDS=[],BIO_JOKES=[];';; esac
        case " $SUBS " in *" alevel "*) ;; *) echo 'const AL_U=[],AL_MATCH={},AL_WORDS=[],AL_JOKES=[];';; esac
      fi
      if [ "$g" = core ]; then cat $f; else case " $SUBS " in *" $g "*) cat $f;; esac; fi
      echo
    done
  } > bundle_$MODE.js
  {
    echo '<meta charset="utf-8">'
    echo "<title>$TITLE</title>"
    echo '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
    echo '<meta name="claude:viewport-fit-sides" content="cover">'
    if [ "$MODE" != master ]; then K=$MODE; C='#0a6c74'; [ "$MODE" = alevel ] && C='#5b3f9e'
      echo "<link rel=\"manifest\" href=\"manifest.webmanifest\"><meta name=\"theme-color\" content=\"$C\"><link rel=\"icon\" href=\"../icons/$K-192.png\"><link rel=\"apple-touch-icon\" href=\"../icons/$K-180.png\"><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-capable\" content=\"yes\">"
      echo '<script>if((location.protocol==="https:"||location.hostname==="localhost")&&"serviceWorker" in navigator)addEventListener("load",()=>navigator.serviceWorker.register("../sw.js").catch(()=>{}));</script>'
    fi
    echo '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caladea:wght@400;700&family=Carlito:wght@400;700&family=IBM+Plex+Mono:wght@400;500;600&family=Lexend:wght@400;600;700&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600;700&display=swap">'
    echo '<style>'
    cat style.css x4.css
    echo '</style>'
    cat body.html
    echo '<script>'
    cat vendor/pptxgen.bundle.js
    echo '</script>'
    echo '<script>'
    cat bundle_$MODE.js
    echo '</script>'
  } > $OUT
  ls -l $OUT | awk '{print $9, $5}'
}
M=${1:-master}
if [ "$M" = all ]; then build_one master; build_one igcse; build_one alevel; else build_one $M; fi
