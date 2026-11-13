/* al_extra.js - pairs, hangman words, jokes, extra IBL (ALX) and topic quizzes (ALQZ) for AS/A Level topics 6-19. Merged by al_extrarun.js */
const ALX={},ALQZ={};
const X=(no,pairs,words,jokes,ibl)=>{ALX[no]={pairs,words,jokes,ibl}};
const Z=(n,rows)=>{ALQZ[n]=rows.map((r,i)=>{const pos=(i*3+n)%4,w=[r[2],r[3],r[4]],o=[];let k=0;for(let p=0;p<4;p++)o.push(p===pos?r[1]:w[k++]);return M(r[0],o,pos,r[5]||"")})};
