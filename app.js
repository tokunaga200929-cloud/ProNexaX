const refs = {
  home: document.getElementById('homeScreen'), setup: document.getElementById('setupScreen'), camera: document.getElementById('cameraScreen'), review: document.getElementById('reviewScreen'),
  courseName: document.getElementById('courseName'), courseSearch: document.getElementById('courseSearch'), courseSearchBtn: document.getElementById('courseSearchBtn'), courseResults: document.getElementById('courseResults'), rakutenAppId: document.getElementById('rakutenAppId'), rakutenAccessKey: document.getElementById('rakutenAccessKey'), courseSetSelect: document.getElementById('courseSetSelect'), teeSelect: document.getElementById('teeSelect'), saveCourseBtn: document.getElementById('saveCourseBtn'), courseStatus: document.getElementById('courseStatus'), sideControl: document.getElementById('sideControl'), holeLabel: document.getElementById('holeLabel'), holeMinus: document.getElementById('holeMinus'), holePlus: document.getElementById('holePlus'), parInput: document.getElementById('parInput'), yardsInput: document.getElementById('yardsInput'), remainingYardsInput: document.getElementById('remainingYardsInput'), clubInput: document.getElementById('clubInput'), playerName: document.getElementById('playerName'), totalScore: document.getElementById('totalScore'), holeScore: document.getElementById('holeScore'), quickRemain: document.getElementById('quickRemain'), remainingMinus: document.getElementById('remainingMinus'), remainingPlus: document.getElementById('remainingPlus'), quickClub: document.getElementById('quickClub'), clubPrev: document.getElementById('clubPrev'), clubNext: document.getElementById('clubNext'), showScorecard: document.getElementById('showScorecard'), recordQuality: document.getElementById('recordQuality'), recordFps: document.getElementById('recordFps'), audioEnabled: document.getElementById('audioEnabled'),
  prevPlayer: document.getElementById('prevPlayer'), prevMeta: document.getElementById('prevMeta'), prevTotal: document.getElementById('prevTotal'), prevCourse: document.getElementById('prevCourse'), prevHole: document.getElementById('prevHole'), prevCurrentShot: document.getElementById('prevCurrentShot'), prevShotDots: document.getElementById('prevShotDots'), miniScorecard: document.getElementById('miniScorecard'),
  openCameraBtn: document.getElementById('openCameraBtn'), backSetupBtn: document.getElementById('backSetupBtn'), cameraStage: document.getElementById('cameraStage'), cameraVideo: document.getElementById('cameraVideo'), cameraFallback: document.getElementById('cameraFallback'), shotInfoPill: document.getElementById('shotInfoPill'), camRemain: document.getElementById('camRemain'), camClub: document.getElementById('camClub'), tracerLayer: document.getElementById('autoTracerLayer'), tracerPath: document.getElementById('autoTracerPath'), tracerGlow: document.getElementById('autoTracerGlow'), tracerOrigin: document.getElementById('autoTracerOrigin'), tracerStatus: document.getElementById('autoTracerStatus'), tracerToggleBtn: document.getElementById('tracerToggleBtn'), tracerTestBtn: document.getElementById('tracerTestBtn'),
  camPlayer: document.getElementById('camPlayer'), camMeta: document.getElementById('camMeta'), camMetaLine: document.getElementById('camMetaLine'), camCurrentShot: document.getElementById('camCurrentShot'), camShotDots: document.getElementById('camShotDots'), camHoleDots: document.getElementById('camHoleDots'), camTotal: document.getElementById('camTotal'), scoreCourse: document.getElementById('scoreCourse'), scorecardDom: document.getElementById('scorecardDom'), scoreGrid: document.getElementById('scoreGrid'), toggleScorecardBtn: document.getElementById('toggleScorecardBtn'), reopenScorecardBtn: document.getElementById('reopenScorecardBtn'),
  prevHoleBtn: document.getElementById('prevHoleBtn'), nextHoleBtn: document.getElementById('nextHoleBtn'), prevHoleText: document.getElementById('prevHoleText'), nextHoleText: document.getElementById('nextHoleText'), recordBtn: document.getElementById('recordBtn'), recordStatus: document.getElementById('recordStatus'), recordingTime: document.getElementById('recordingTime'), quickTotal: document.getElementById('quickTotal'), quickCurrentShot: document.getElementById('quickCurrentShot'), quickShot: document.getElementById('quickShot'), totalMinus: document.getElementById('totalMinus'), totalPlus: document.getElementById('totalPlus'), currentShotMinus: document.getElementById('currentShotMinus'), currentShotPlus: document.getElementById('currentShotPlus'), currentShotMinusSetup: document.getElementById('currentShotMinusSetup'), currentShotPlusSetup: document.getElementById('currentShotPlusSetup'), currentShotLabel: document.getElementById('currentShotLabel'), shotMinus: document.getElementById('shotMinus'), shotPlus: document.getElementById('shotPlus'),
  reviewVideo: document.getElementById('reviewVideo'), downloadLink: document.getElementById('downloadLink'), shareBtn: document.getElementById('shareBtn'), shareStatus: document.getElementById('shareStatus'), retakeBtn: document.getElementById('retakeBtn'), newShotBtn: document.getElementById('newShotBtn'), canvas: document.getElementById('recordCanvas'), supportPill: document.getElementById('supportPill'),
  homeStartBtn: document.getElementById('homeStartBtn'), homeCourseBtn: document.getElementById('homeCourseBtn'), homeQuickBtn: document.getElementById('homeQuickBtn'), homePremiumBtn: document.getElementById('homePremiumBtn'), backHomeBtn: document.getElementById('backHomeBtn'),
  topBarScale: document.getElementById('topBarScale'), scorecardScale: document.getElementById('scorecardScale'), topBarScaleLabel: document.getElementById('topBarScaleLabel'), scorecardScaleLabel: document.getElementById('scorecardScaleLabel'),
  topBarScaleX: document.getElementById('topBarScaleX'), topBarScaleY: document.getElementById('topBarScaleY'), scorecardScaleX: document.getElementById('scorecardScaleX'), scorecardScaleY: document.getElementById('scorecardScaleY'),
  topBarScaleXLabel: document.getElementById('topBarScaleXLabel'), topBarScaleYLabel: document.getElementById('topBarScaleYLabel'), scorecardScaleXLabel: document.getElementById('scorecardScaleXLabel'), scorecardScaleYLabel: document.getElementById('scorecardScaleYLabel'),
  topBarDragHandle: document.getElementById('topBarDragHandle'), scorecardDragHandle: document.getElementById('scorecardDragHandle'),
  topBarDom: document.querySelector('#cameraScreen .broadcast-top'),
  dbCourseName: document.getElementById('dbCourseName'), dbCourseArea: document.getElementById('dbCourseArea'), dbSetName: document.getElementById('dbSetName'), dbTeeName: document.getElementById('dbTeeName'),
  dbOutGrid: document.getElementById('dbOutGrid'), dbInGrid: document.getElementById('dbInGrid'), dbLoadCurrentBtn: document.getElementById('dbLoadCurrentBtn'), dbClearBtn: document.getElementById('dbClearBtn'), dbSaveBtn: document.getElementById('dbSaveBtn'), dbEditorStatus: document.getElementById('dbEditorStatus')
};

const holes = {
  OUT:[
    {hole:1, par:4, yds:378, score:'4'}, {hole:2, par:3, yds:182, score:'3'}, {hole:3, par:4, yds:455, score:'4'},
    {hole:4, par:5, yds:512, score:''}, {hole:5, par:4, yds:392, score:''}, {hole:6, par:4, yds:410, score:''},
    {hole:7, par:3, yds:168, score:''}, {hole:8, par:5, yds:535, score:''}, {hole:9, par:4, yds:424, score:''}
  ],
  IN:[
    {hole:10, par:4, yds:401, score:''}, {hole:11, par:5, yds:548, score:''}, {hole:12, par:3, yds:176, score:''},
    {hole:13, par:4, yds:433, score:''}, {hole:14, par:4, yds:389, score:''}, {hole:15, par:5, yds:566, score:''},
    {hole:16, par:3, yds:198, score:''}, {hole:17, par:4, yds:417, score:''}, {hole:18, par:4, yds:442, score:''}
  ]
};

const courseStorageKey = 'pxgolf_course_cards_v1';
const rakutenCredentialKey = 'pxgolf_rakuten_gora_api_v1';
const defaultCourseDatabase = [];
function loadSavedCourses(){
  try{ return JSON.parse(localStorage.getItem(courseStorageKey) || '[]'); }catch(_){ return []; }
}
let courseDatabase = [...defaultCourseDatabase, ...loadSavedCourses()];
let firestoreDb = null;
let firestoreReady = false;
function firebaseConfigReady(){ const cfg=window.PX_FIREBASE_CONFIG||{}; return !!(cfg.apiKey && cfg.projectId && cfg.appId); }
function firestoreCollectionName(){ return window.PX_FIRESTORE_SCORECARDS_COLLECTION || 'scorecards'; }
function initFirebase(){
  try{
    if(!firebaseConfigReady() || !window.firebase) return false;
    if(!firebase.apps.length) firebase.initializeApp(window.PX_FIREBASE_CONFIG);
    firestoreDb = firebase.firestore(); firestoreReady = true; return true;
  }catch(e){ console.warn(e); firestoreReady=false; return false; }
}
function appSplitCourseNameAndSide(name){
  const raw=String(name||'').trim().replace(/　/g,' ').replace(/\s+/g,' ');
  if(/^OUT$/i.test(raw)) return {setName:'OUT / IN', side:'OUT'};
  if(/^IN$/i.test(raw)) return {setName:'OUT / IN', side:'IN'};
  if(raw==='アウト') return {setName:'OUT / IN', side:'OUT'};
  if(raw==='イン') return {setName:'OUT / IN', side:'IN'};
  const m=raw.match(/^(.+?)\s*(OUT|IN)$/i);
  if(m) return {setName:(m[1]||'OUT / IN').trim(), side:m[2].toUpperCase()};
  const jm=raw.match(/^(.+?)(アウト|イン)$/);
  if(jm) return {setName:(jm[1]||'OUT / IN').trim(), side:jm[2]==='アウト'?'OUT':'IN'};
  return {setName:raw, side:''};
}
function appBlankNine(){ return Array.from({length:9},()=>({par:4,yds:0,hdcp:''})); }
function appToNine(arr){ const out=(arr||[]).slice(0,9).map(h=>({par:Number(h.par)||4,yds:Number(h.yds)||0,hdcp:String(h.hdcp||'')})); while(out.length<9) out.push({par:4,yds:0,hdcp:''}); return out; }
function appHolesToTeeData(rawHoles, forcedSide=''){
  const clean=(rawHoles||[]).map((h,i)=>({hole:Number(h.hole||i+1),par:Number(h.par||h.PAR||4),yds:Number(h.yds||h.yards||h.YDS||0),hdcp:String(h.hdcp||h.HDCP||'')})).sort((a,b)=>a.hole-b.hole);
  if(forcedSide==='OUT') return {OUT:appToNine(clean), IN:appBlankNine()};
  if(forcedSide==='IN') return {OUT:appBlankNine(), IN:appToNine(clean)};
  const out=clean.filter(h=>h.hole<=9); const inn=clean.filter(h=>h.hole>=10);
  return {OUT:appToNine(out), IN:appToNine(inn)};
}
function appMergeTeeData(a,b){
  const out=(a?.OUT||appBlankNine()).slice(), inn=(a?.IN||appBlankNine()).slice();
  const hasRealValue=(h)=> (Number(h?.yds)||0)>0 || String(h?.hdcp||'').trim();
  // 空側（Par4/0yds）で既存OUT/INを上書きしない。これで東/西・全ティーが消えない。
  (b?.OUT||[]).forEach((h,i)=>{ if(hasRealValue(h)) out[i]=h; });
  (b?.IN||[]).forEach((h,i)=>{ if(hasRealValue(h)) inn[i]=h; });
  return {OUT:appToNine(out), IN:appToNine(inn)};
}
function normalizeFirestoreCourseDoc(doc){
  if(doc?.sets && Array.isArray(doc.sets)) return doc;
  const scorecards=Array.isArray(doc?.scorecards)?doc.scorecards:[];
  if(!scorecards.length) return doc;
  const course={
    id:doc.id || (doc.rakutenGolfCourseId?`custom-rakuten-${doc.rakutenGolfCourseId}`:`custom-${Date.now()}`),
    name:doc.golfCourseName || doc.name || '未設定ゴルフ場',
    area:doc.prefecture || doc.area || '',
    prefecture:doc.prefecture || doc.area || '',
    rakutenGolfCourseId:doc.rakutenGolfCourseId || '',
    note:doc.note || 'Firestore DB',
    status:doc.status || '公開',
    sets:[]
  };
  scorecards.forEach((sc,idx)=>{
    const split=appSplitCourseNameAndSide(sc.courseName||sc.setName||`コース${idx+1}`);
    const setName=split.setName || 'OUT / IN';
    const tee=sc.tee || sc.teeName || 'Regular';
    const teeData=appHolesToTeeData(sc.holes||[], split.side);
    let set=course.sets.find(s=>s.name===setName);
    if(!set){ set={id:'set-'+setName.toLowerCase().replace(/[^a-z0-9ぁ-んァ-ヶ一-龥ー]/gi,''), name:setName, tees:{}}; course.sets.push(set); }
    set.tees[tee]=set.tees[tee]?appMergeTeeData(set.tees[tee], teeData):teeData;
  });
  return course;
}
async function loadFirestoreCourseDatabase(){
  if(!initFirebase()) return [];
  try{
    const snap = await firestoreDb.collection(firestoreCollectionName()).get();
    const courses = snap.docs.map(d=>normalizeFirestoreCourseDoc({id:d.id, ...d.data(), note:(d.data().note||'Firestore DB')})).filter(c=>c && c.sets && c.sets.length);
    if(courses.length){
      const local = loadSavedCourses();
      const byKey = new Map();
      [...defaultCourseDatabase, ...local, ...courses].forEach(c=>byKey.set(courseIdentityKey(c), c));
      courseDatabase = [...byKey.values()];
      renderCourseResults(refs.courseSearch?.value || '', {includeApi:false});
      { const totalSets=courses.reduce((n,c)=>n+(c.sets?.length||0),0); const totalTees=courses.reduce((n,c)=>n+(c.sets||[]).reduce((m,s)=>m+Object.keys(s.tees||{}).length,0),0); setCourseStatus(`Firestoreから${courses.length}件 / ${totalSets}コース / ${totalTees}ティーを読み込みました。`); }
    }
    return courses;
  }catch(e){ console.warn(e); setCourseStatus('Firestore DB読み込みに失敗しました。端末内DBで動作します。'); return []; }
}

let selectedCourseId = '';
let selectedSetId = 'out-in';
let selectedTee = 'Regular';
let apiCourseResults = [];
let isApiSearching = false;
let courseAutoTimer = null;
let lastAutoApiKeyword = '';
let isAutoSettingCourse = false;

const scoreOptions=['-5','-4','-3','-2','-1','E','+1','+2','+3','+4','+5'];
let state = { side:'OUT', index:2, currentShot:1, stream:null, recorder:null, chunks:[], recordTimer:null, recordStart:0, recordedUrl:null, recordedBlob:null, recordedFileName:'px-golf-camera.webm', mime:'video/webm', animationId:null, overlay:{ topX:0, topY:0, cardX:0, cardY:0, gearX:0, gearY:0, shotX:0, shotY:0 }, zoom:1, stabilization:{ enabled:true, ready:false, rawX:0, rawY:0, x:0, y:0, lastGamma:0, lastBeta:0 }, tracer:{ enabled:true, visible:false, progress:0, startTime:0, duration:1550, holdUntil:0, path:[55,88,55,62,50,42,39,24,34,17,29,19,25,29], monitorId:null, candidate:null, lastCandidate:null, impactCooldown:0, lastAutoAt:0, armed:true } };
const pxLogoImg = new Image();
pxLogoImg.src = 'assets/px-logo-badge.png';

function currentHole(){ return holes[state.side][state.index]; }
function showScreen(screen){ [refs.home, refs.setup, refs.camera, refs.review].forEach(s=>s && s.classList.remove('active')); if(screen) screen.classList.add('active'); document.body.classList.toggle('camera-active', screen===refs.camera); updateHeaderPill(screen); window.scrollTo({top:0,behavior:'auto'}); }
function updateHeaderPill(screen){ if(!refs.supportPill) return; if(screen===refs.home) refs.supportPill.textContent='HOME · Firebase'; else if(screen===refs.setup) refs.supportPill.textContent='SETUP'; else if(screen===refs.camera) refs.supportPill.textContent='LIVE'; else if(screen===refs.review) refs.supportPill.textContent='REVIEW'; }
function totalScoreText(){ return refs.totalScore.value || 'E'; }
function setTotalByDelta(delta){ let i=scoreOptions.indexOf(totalScoreText()); if(i<0)i=5; i=Math.max(0,Math.min(scoreOptions.length-1,i+delta)); refs.totalScore.value=scoreOptions[i]; updateAll(); }
function setShotByDelta(delta){ const h=currentHole(); const cur = Number(refs.holeScore.value || h.score || h.par); const next = Math.max(1, Math.min(12, cur+delta)); refs.holeScore.value=String(next); h.score=String(next); updateAll(); }
function shotMark(n){ const m=['','①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫']; return m[Number(n)] || String(n); }
function shotDotText(n){ return String(n); }
function currentShotText(){ return shotMark(state.currentShot); }
function remainingYardsText(){ const v=String(refs.remainingYardsInput?.value || '').trim(); return v ? `${v}Y` : '--Y'; }
function clubText(){ const v=String(refs.clubInput?.value || '').trim(); return v ? v.toUpperCase() : '--'; }
const clubOptions=['DR','3W','5W','UT','4I','5I','6I','7I','8I','9I','PW','AW','SW','PT'];
function setRemainingByDelta(delta){ const cur=Number(refs.remainingYardsInput?.value || 0); const next=clampValue(cur + delta, 0, 500); if(refs.remainingYardsInput) refs.remainingYardsInput.value=String(Math.round(next)); updateAll(); }
function cycleClub(delta){ const cur=clubText(); let i=clubOptions.indexOf(cur); if(i<0) i=clubOptions.indexOf('8I'); i=(i+delta+clubOptions.length)%clubOptions.length; if(refs.clubInput) refs.clubInput.value=clubOptions[i]; updateAll(); }
function setCurrentShotByDelta(delta){ state.currentShot = Math.max(1, Math.min(12, Number(state.currentShot || 1) + delta)); updateAll(); }
function setHoleByIndex(idx){
  state.index = Math.max(0, Math.min(8, idx));
  const h=currentHole(); refs.holeLabel.textContent = `${h.hole}番`; refs.parInput.value = h.par; refs.yardsInput.value = h.yds; refs.holeScore.value = h.score || ''; state.currentShot = 1;
  updateAll();
}
function updateHoleDataFromInputs(){ const h=currentHole(); h.par=Number(refs.parInput.value||h.par); h.yds=Number(refs.yardsInput.value||h.yds); h.score=refs.holeScore.value || ''; updateAll(); }
function updateAll(){
  const h=currentHole(); const name=(refs.playerName.value||'PLAYER').toUpperCase(); const course=refs.courseName.value || 'GOLF COURSE'; const meta=`HOLE ${h.hole}   PAR ${h.par}   ${h.yds} YDS`; const remain=remainingYardsText(); const club=clubText();
  if(refs.prevPlayer) refs.prevPlayer.textContent=name; if(refs.prevMeta) refs.prevMeta.textContent=meta; if(refs.prevTotal) refs.prevTotal.textContent=totalScoreText(); if(refs.prevCourse) refs.prevCourse.textContent=course; if(refs.prevHole) refs.prevHole.textContent=h.hole; if(refs.prevCurrentShot) refs.prevCurrentShot.textContent=currentShotText();
  refs.camPlayer.textContent=name; refs.camMeta.textContent=meta; if(refs.camMetaLine) refs.camMetaLine.innerHTML=`HOLE ${h.hole} <i></i> PAR ${h.par} <i></i> ${h.yds} YDS`; if(refs.camCurrentShot) refs.camCurrentShot.textContent=currentShotText(); refs.camTotal.textContent=totalScoreText(); refs.scoreCourse.textContent=course; if(refs.camRemain) refs.camRemain.textContent=remain; if(refs.camClub) refs.camClub.textContent=club; renderShotDots(); renderBroadcastHoles();
  refs.quickTotal.textContent=totalScoreText(); if(refs.quickCurrentShot) refs.quickCurrentShot.textContent=currentShotText(); if(refs.currentShotLabel) refs.currentShotLabel.textContent=currentShotText(); if(refs.quickRemain) refs.quickRemain.textContent=remain; if(refs.quickClub) refs.quickClub.textContent=club; refs.quickShot.textContent=h.score || '-';
  refs.scorecardDom.classList.toggle('hidden', !refs.showScorecard.checked); refs.reopenScorecardBtn.classList.toggle('show', !refs.showScorecard.checked);
  refs.prevHoleText.textContent = `HOLE ${holes[state.side][Math.max(0,state.index-1)].hole}`; refs.nextHoleText.textContent = `HOLE ${holes[state.side][Math.min(8,state.index+1)].hole}`;
  const topScale = Number(refs.topBarScale?.value || 100) / 100;
  const cardScale = Number(refs.scorecardScale?.value || 100) / 100;
  const topScaleX = Number(refs.topBarScaleX?.value || 100) / 100;
  const topScaleY = Number(refs.topBarScaleY?.value || 100) / 100;
  const cardScaleX = Number(refs.scorecardScaleX?.value || 100) / 100;
  const cardScaleY = Number(refs.scorecardScaleY?.value || 100) / 100;
  document.documentElement.style.setProperty('--topbar-scale-final-x', (topScale*topScaleX).toFixed(3));
  document.documentElement.style.setProperty('--topbar-scale-final-y', (topScale*topScaleY).toFixed(3));
  document.documentElement.style.setProperty('--scorecard-scale-final-x', (cardScale*cardScaleX).toFixed(3));
  document.documentElement.style.setProperty('--scorecard-scale-final-y', (cardScale*cardScaleY).toFixed(3));
  applyOverlayVars();
  applyZoom();
  if(refs.topBarScaleLabel) refs.topBarScaleLabel.textContent = `${Math.round(topScale*100)}%`;
  if(refs.scorecardScaleLabel) refs.scorecardScaleLabel.textContent = `${Math.round(cardScale*100)}%`;
  if(refs.topBarScaleXLabel) refs.topBarScaleXLabel.textContent = `${Math.round(topScaleX*100)}%`;
  if(refs.topBarScaleYLabel) refs.topBarScaleYLabel.textContent = `${Math.round(topScaleY*100)}%`;
  if(refs.scorecardScaleXLabel) refs.scorecardScaleXLabel.textContent = `${Math.round(cardScaleX*100)}%`;
  if(refs.scorecardScaleYLabel) refs.scorecardScaleYLabel.textContent = `${Math.round(cardScaleY*100)}%`;
  renderScoreGrid(); renderMiniScorecard();
}



function getShotView(){
  const cur=Math.max(1, Math.min(12, Number(state.currentShot || 1)));
  const count=5;
  let start = cur <= count ? 1 : cur - count + 1;
  start = Math.max(1, Math.min(start, 12-count+1));
  return Array.from({length:count}, (_,i)=>start+i);
}
function renderShotDots(){
  const view=getShotView();
  [refs.camShotDots, refs.prevShotDots].forEach((box)=>{
    if(!box) return;
    box.innerHTML='';
    view.forEach((n)=>{
      const s=document.createElement('span');
      s.textContent=shotDotText(n);
      if(n===Number(state.currentShot)) s.classList.add('active');
      box.appendChild(s);
    });
  });
}

function renderBroadcastHoles(){
  if(!refs.camHoleDots) return;
  const nums = holes[state.side].map(h=>h.hole);
  let start = Math.max(0, Math.min(state.index - 2, nums.length - 5));
  const view = nums.slice(start, start + 5);
  refs.camHoleDots.innerHTML='';
  view.forEach((n)=>{
    const s=document.createElement('span');
    s.textContent = String(n);
    if(n===currentHole().hole) s.classList.add('active');
    refs.camHoleDots.appendChild(s);
  });
}

function renderScoreGrid(){
  const rows = [ ['HOLE', ...holes[state.side].map(h=>h.hole)], ['PAR', ...holes[state.side].map(h=>h.par)], ['YDS', ...holes[state.side].map(h=>h.yds)], ['SCORE', ...holes[state.side].map(h=>h.score||'-')] ];
  refs.scoreGrid.innerHTML='';
  rows.forEach((row, r)=> row.forEach((v, c)=>{ const d=document.createElement('div'); d.textContent=v; if(c===0)d.classList.add('label'); if(c===state.index+1 && r===0)d.classList.add('active-hole'); if(c===state.index+1 && r===3)d.classList.add('score-active'); if(r===2 && c>0)d.classList.add('yds'); refs.scoreGrid.appendChild(d); }));
}
function renderMiniScorecard(){
  if(!refs.miniScorecard) return; refs.miniScorecard.innerHTML='';
  const row=['HOLE',...holes[state.side].map(h=>h.hole),'PAR',...holes[state.side].map(h=>h.par),'SCORE',...holes[state.side].map(h=>h.score||'-')];
  row.forEach((v, idx)=>{ const d=document.createElement('div'); d.textContent=v; const r=Math.floor(idx/10), c=idx%10; if(c===0)d.classList.add('lbl'); if(c===state.index+1 && r===0)d.classList.add('hi'); refs.miniScorecard.appendChild(d); });
}

function clampValue(v,min,max){ return Math.max(min, Math.min(max, v)); }
function setSlider(el, value){ if(!el) return; el.value = String(Math.round(clampValue(value, Number(el.min||0), Number(el.max||999)))); }
function applyOverlayVars(){
  applyOverlayVars();
  document.documentElement.style.setProperty('--shot-info-move-x', `${state.overlay.shotX||0}px`);
  document.documentElement.style.setProperty('--shot-info-move-y', `${state.overlay.shotY||0}px`);
}

function formatZoomLabel(z){
  const fixed = (Math.round(Number(z || 1) * 10) / 10).toFixed(1);
  return fixed.replace(/\.0$/, '') + 'x';
}
function applyZoom(){
  const z = clampValue(Number(state.zoom || 1), 1, 4);
  state.zoom = z;
  document.documentElement.style.setProperty('--camera-zoom', z.toFixed(3));
  document.documentElement.style.setProperty('--camera-stabilized-zoom', (z * stabilizationExtraZoom()).toFixed(3));
}

function stabilizationExtraZoom(){
  return state.stabilization?.enabled ? 1.08 : 1;
}
function resetStabilization(){
  if(!state.stabilization) return;
  state.stabilization.rawX=0; state.stabilization.rawY=0; state.stabilization.x=0; state.stabilization.y=0;
  document.documentElement.style.setProperty('--stab-x','0px');
  document.documentElement.style.setProperty('--stab-y','0px');
}
function updateStabilizationFromMotion(gamma=0,beta=0){
  if(!state.stabilization?.enabled) return;
  const st=state.stabilization;
  if(!st.ready){ st.lastGamma=gamma; st.lastBeta=beta; st.ready=true; return; }
  const dg = clampValue(gamma - st.lastGamma, -8, 8);
  const db = clampValue(beta - st.lastBeta, -8, 8);
  st.lastGamma = st.lastGamma * 0.94 + gamma * 0.06;
  st.lastBeta = st.lastBeta * 0.94 + beta * 0.06;
  // 画面には表示しない簡易デジタル手ぶれ補正。少し拡大して、端末の揺れと逆方向に映像だけ動かす。
  st.rawX = clampValue(-dg * 3.4, -22, 22);
  st.rawY = clampValue(-db * 2.3, -22, 22);
}
function tickStabilization(){
  const st=state.stabilization;
  if(!st?.enabled) return;
  st.x += (st.rawX - st.x) * 0.14;
  st.y += (st.rawY - st.y) * 0.14;
  document.documentElement.style.setProperty('--stab-x', `${st.x.toFixed(2)}px`);
  document.documentElement.style.setProperty('--stab-y', `${st.y.toFixed(2)}px`);
}
async function enableHiddenStabilization(){
  if(!state.stabilization?.enabled) return;
  try{
    if(typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function'){
      await DeviceMotionEvent.requestPermission().catch(()=>null);
    }
    if(typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function'){
      await DeviceOrientationEvent.requestPermission().catch(()=>null);
    }
  }catch(_){ /* hidden feature: no UI */ }
  window.removeEventListener('deviceorientation', handleStabilizationOrientation);
  window.addEventListener('deviceorientation', handleStabilizationOrientation, {passive:true});
  resetStabilization();
}
function handleStabilizationOrientation(e){
  updateStabilizationFromMotion(Number(e.gamma||0), Number(e.beta||0));
}
function setCameraZoom(value){
  state.zoom = clampValue(Number(value || 1), 1, 4);
  applyZoom();
}
function getPointerDistance(a,b){
  return Math.hypot(a.x-b.x, a.y-b.y);
}
function setupCameraPinchZoom(stage){
  if(!stage) return;
  const active = new Map();
  let startDist = 0;
  let startZoom = 1;
  const ignoreTarget = (target)=> target.closest('button,input,select,textarea,label,.broadcast-top,.scorecard,.live-top-ui,.camera-bottom-panel,.scorecard-reopen,.overlay-resize-handle');
  const end = (pointerId)=>{
    active.delete(pointerId);
    if(active.size < 2){
      startDist = 0;
      stage.classList.remove('pinch-zooming');
    }
  };
  stage.addEventListener('pointerdown', (e)=>{
    if(ignoreTarget(e.target)) return;
    active.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(active.size === 2){
      const pts=[...active.values()];
      startDist = Math.max(1, getPointerDistance(pts[0], pts[1]));
      startZoom = Number(state.zoom || 1);
      stage.classList.add('pinch-zooming');
      try{ stage.setPointerCapture?.(e.pointerId); }catch(_){ }
      e.preventDefault();
    }
  }, {passive:false});
  stage.addEventListener('pointermove', (e)=>{
    if(!active.has(e.pointerId)) return;
    active.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(active.size >= 2 && startDist){
      const pts=[...active.values()];
      const dist=Math.max(1, getPointerDistance(pts[0], pts[1]));
      setCameraZoom(startZoom * (dist / startDist));
      e.preventDefault();
    }
  }, {passive:false});
  ['pointerup','pointercancel','pointerleave'].forEach(type=>{
    stage.addEventListener(type, (e)=>end(e.pointerId), {passive:false});
  });
  // PCのトラックパッドピンチやCtrl+ホイール用。通常スクロールの邪魔はしない。
  stage.addEventListener('wheel', (e)=>{
    if(!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    const next = Number(state.zoom || 1) + (e.deltaY < 0 ? 0.12 : -0.12);
    setCameraZoom(next);
  }, {passive:false});
}

function setupOverlayMove(el, type){
  if(!el) return;
  el.addEventListener('pointerdown', (e)=>{
    if(document.body.classList.contains('is-recording')) return;
    if(e.target.closest('button, .overlay-resize-handle')) return;
    e.preventDefault();
    e.stopPropagation();
    el.classList.add('dragging');
    el.setPointerCapture?.(e.pointerId);
    const sx=e.clientX, sy=e.clientY;
    const startX = type==='top' ? state.overlay.topX : state.overlay.cardX;
    const startY = type==='top' ? state.overlay.topY : state.overlay.cardY;
    const move=(ev)=>{
      ev.preventDefault();
      const dx=ev.clientX-sx, dy=ev.clientY-sy;
      if(type==='top'){
        state.overlay.topX = clampValue(startX + dx, -260, 120);
        state.overlay.topY = clampValue(startY + dy, -80, 420);
      }else{
        state.overlay.cardX = clampValue(startX + dx, -190, 190);
        state.overlay.cardY = clampValue(startY + dy, -430, 190);
      }
      applyOverlayVars();
    };
    const up=()=>{
      el.classList.remove('dragging');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      try{ el.releasePointerCapture?.(e.pointerId); }catch(_){ }
    };
    window.addEventListener('pointermove', move, {passive:false});
    window.addEventListener('pointerup', up, {passive:false});
  });
}
function setupOverlayResize(handle, type){
  if(!handle) return;
  handle.addEventListener('pointerdown', (e)=>{
    e.preventDefault();
    e.stopPropagation();
    handle.classList.add('dragging');
    handle.setPointerCapture?.(e.pointerId);
    const sx=e.clientX, sy=e.clientY;
    const startTopX=Number(refs.topBarScaleX?.value||100);
    const startTopY=Number(refs.topBarScaleY?.value||100);
    const startCardX=Number(refs.scorecardScaleX?.value||100);
    const startCardY=Number(refs.scorecardScaleY?.value||100);
    const move=(ev)=>{
      ev.preventDefault();
      const dx=ev.clientX-sx, dy=ev.clientY-sy;
      if(type==='top'){
        // 上バーは右上基準なので、左下ハンドルを左へ/下へ動かすと大きくなる
        setSlider(refs.topBarScaleX, startTopX + (-dx*0.38));
        setSlider(refs.topBarScaleY, startTopY + (dy*0.55));
      }else{
        // 下カードは右下方向へ引っ張ると大きくなる
        setSlider(refs.scorecardScaleX, startCardX + (dx*0.38));
        setSlider(refs.scorecardScaleY, startCardY + (dy*0.45));
      }
      updateAll();
    };
    const up=(ev)=>{
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      handle.classList.remove('dragging');
      try{ handle.releasePointerCapture?.(e.pointerId); }catch(_){}
    };
    window.addEventListener('pointermove', move, {passive:false});
    window.addEventListener('pointerup', up, {passive:false});
  });
}


function setupShotInfoMove(el){
  if(!el) return;
  let didDrag=false;
  el.addEventListener('pointerdown', (e)=>{
    if(document.body.classList.contains('is-recording')) return;
    e.preventDefault();
    e.stopPropagation();
    didDrag=false;
    el.classList.add('dragging');
    el.setPointerCapture?.(e.pointerId);
    const sx=e.clientX, sy=e.clientY;
    const startX=state.overlay.shotX||0;
    const startY=state.overlay.shotY||0;
    const move=(ev)=>{
      ev.preventDefault();
      const dx=ev.clientX-sx, dy=ev.clientY-sy;
      if(Math.abs(dx)>4 || Math.abs(dy)>4) didDrag=true;
      state.overlay.shotX=clampValue(startX+dx, -260, 60);
      state.overlay.shotY=clampValue(startY+dy, -40, 520);
      applyOverlayVars();
    };
    const up=()=>{
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      el.classList.remove('dragging');
      try{ el.releasePointerCapture?.(e.pointerId); }catch(_){ }
    };
    window.addEventListener('pointermove', move, {passive:false});
    window.addEventListener('pointerup', up, {passive:false});
  });
}

function setupGearMove(el){
  if(!el) return;
  let didDrag = false;
  el.addEventListener('pointerdown', (e)=>{
    if(document.body.classList.contains('is-recording')) return;
    e.preventDefault();
    e.stopPropagation();
    didDrag = false;
    el.classList.add('dragging');
    el.setPointerCapture?.(e.pointerId);
    const sx=e.clientX, sy=e.clientY;
    const startX=state.overlay.gearX || 0;
    const startY=state.overlay.gearY || 0;
    const move=(ev)=>{
      ev.preventDefault();
      const dx=ev.clientX-sx, dy=ev.clientY-sy;
      if(Math.abs(dx)>4 || Math.abs(dy)>4) didDrag = true;
      state.overlay.gearX = clampValue(startX + dx, -320, 40);
      state.overlay.gearY = clampValue(startY + dy, -20, 620);
      applyOverlayVars();
    };
    const up=()=>{
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      el.classList.remove('dragging');
      try{ el.releasePointerCapture?.(e.pointerId); }catch(_){ }
      if(!didDrag) showScreen(refs.setup);
    };
    window.addEventListener('pointermove', move, {passive:false});
    window.addEventListener('pointerup', up, {passive:false});
  });
}


function setupDesktopOverlayMouseFallback(el, type){
  if(!el) return;
  el.addEventListener('mousedown', (e)=>{
    if(e.button !== 0) return;
    if(document.body.classList.contains('is-recording')) return;
    if(e.target.closest('button, .overlay-resize-handle')) return;
    e.preventDefault();
    e.stopPropagation();
    el.classList.add('dragging');
    const sx=e.clientX, sy=e.clientY;
    const startX = type==='top' ? state.overlay.topX : state.overlay.cardX;
    const startY = type==='top' ? state.overlay.topY : state.overlay.cardY;
    const move=(ev)=>{
      ev.preventDefault();
      const dx=ev.clientX-sx, dy=ev.clientY-sy;
      if(type==='top'){
        state.overlay.topX = clampValue(startX + dx, -260, 120);
        state.overlay.topY = clampValue(startY + dy, -80, 420);
      }else{
        state.overlay.cardX = clampValue(startX + dx, -190, 190);
        state.overlay.cardY = clampValue(startY + dy, -430, 190);
      }
      applyOverlayVars();
    };
    const up=()=>{
      el.classList.remove('dragging');
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move, {passive:false});
    document.addEventListener('mouseup', up, {passive:false});
  });
}

function setupDesktopResizeMouseFallback(handle, type){
  if(!handle) return;
  handle.addEventListener('mousedown', (e)=>{
    if(e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    handle.classList.add('dragging');
    const sx=e.clientX, sy=e.clientY;
    const startTopX=Number(refs.topBarScaleX?.value||100);
    const startTopY=Number(refs.topBarScaleY?.value||100);
    const startCardX=Number(refs.scorecardScaleX?.value||100);
    const startCardY=Number(refs.scorecardScaleY?.value||100);
    const move=(ev)=>{
      ev.preventDefault();
      const dx=ev.clientX-sx, dy=ev.clientY-sy;
      if(type==='top'){
        setSlider(refs.topBarScaleX, startTopX + (-dx*0.38));
        setSlider(refs.topBarScaleY, startTopY + (dy*0.55));
      }else{
        setSlider(refs.scorecardScaleX, startCardX + (dx*0.38));
        setSlider(refs.scorecardScaleY, startCardY + (dy*0.45));
      }
      updateAll();
    };
    const up=()=>{
      handle.classList.remove('dragging');
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move, {passive:false});
    document.addEventListener('mouseup', up, {passive:false});
  });
}

function lockCameraTouch(){
  window.addEventListener('touchmove', (e)=>{
    if(document.body.classList.contains('camera-active')) e.preventDefault();
  }, {passive:false});
}



function normalizeText(s){ return String(s||'').toLowerCase().replace(/[\s　]/g,''); }
function readRakutenCredentials(){
  try{ return JSON.parse(localStorage.getItem(rakutenCredentialKey) || '{}'); }catch(_){ return {}; }
}
function saveRakutenCredentials(){
  const data={
    appId:(refs.rakutenAppId?.value||'').trim(),
    accessKey:(refs.rakutenAccessKey?.value||'').trim()
  };
  localStorage.setItem(rakutenCredentialKey, JSON.stringify(data));
  return data;
}
function loadRakutenCredentials(){
  const data=readRakutenCredentials();
  if(refs.rakutenAppId && data.appId) refs.rakutenAppId.value=data.appId;
  if(refs.rakutenAccessKey && data.accessKey) refs.rakutenAccessKey.value=data.accessKey;
}

function findSavedCourseForApi(id, name){
  const nid=String(id||'');
  const nname=normalizeText(name||'');
  return courseDatabase.find(c=>{
    if(nid && String(c.rakutenGolfCourseId||'')===nid) return true;
    return nname && normalizeText(c.name||'')===nname;
  }) || null;
}
function courseIdentityKey(c){
  if(c?.rakutenGolfCourseId) return 'rakuten:'+String(c.rakutenGolfCourseId);
  return 'name:'+normalizeText(c?.name||c?.id||'');
}
function getSelectedCourse(){ return courseDatabase.find(c=>c.id===selectedCourseId) || courseDatabase[0] || null; }
function getSelectedSet(course=getSelectedCourse()){
  return (course?.sets||[]).find(s=>s.id===selectedSetId) || (course?.sets||[])[0];
}
function blankScores(list, startHole){
  const source = Array.isArray(list) && list.length ? list : Array.from({length:9},()=>({par:4,yds:0}));
  return source.map((h,i)=>({ hole:startHole+i, par:Number(h.par||4), yds:Number(h.yds||0), score:'' }));
}
function currentHolesAsTee(){
  return {
    OUT: holes.OUT.map(h=>({par:h.par,yds:h.yds})),
    IN: holes.IN.map(h=>({par:h.par,yds:h.yds}))
  };
}
function makeManualSetFromCurrent(name='OUT / IN（手入力）'){
  return { id:'manual-out-in', name, tees:{ Regular: currentHolesAsTee() } };
}
function hasCourseScorecard(course){
  return !!(course && course.source !== 'rakuten-api-only' && course.sets && course.sets.length);
}
function applyCourseToHoles({resetIndex=true}={}){
  const course=getSelectedCourse();
  if(!course) return;
  refs.courseName.value = course.name || '';
  const set=getSelectedSet(course);
  const teeData=(set?.tees||{})[selectedTee] || (set?.tees||{}).Regular || Object.values(set?.tees||{})[0];
  if(course.source === 'rakuten-api-only'){
    if(resetIndex){ state.side='OUT'; state.index=0; }
    refs.sideControl?.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.side===state.side));
    setHoleByIndex(state.index);
    setCourseStatus(`${course.name} を選択しました。下のPAR/YDSを必要に応じて確認してください。`);
    return;
  }
  if(!set || !teeData){
    if(resetIndex){ state.side='OUT'; state.index=0; }
    refs.sideControl?.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.side===state.side));
    setHoleByIndex(state.index);
    setCourseStatus(`${course.name} は見つかりましたが、コースデータはまだ未登録です。CMSで登録するか、下のPAR / YDSを手入力してください。`);
    return;
  }
  holes.OUT = blankScores(teeData.OUT || [], 1);
  holes.IN = blankScores(teeData.IN || [], 10);
  if(resetIndex){ state.side='OUT'; state.index=0; }
  refs.sideControl?.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.side===state.side));
  setHoleByIndex(state.index);
  setCourseStatus(`${course.name} / ${set.name} / ${selectedTee} を反映しました。撮影画面にもこの内容が表示されます。`);
}
function populateCourseControls(){
  const course=getSelectedCourse();
  if(!course) return;
  let sets=course.sets||[];
  if(course.source === 'rakuten-api-only' || !sets.length){
    sets=[makeManualSetFromCurrent('OUT / IN（手入力）')];
    course.sets=sets;
  }
  if(refs.courseSetSelect){
    refs.courseSetSelect.innerHTML=sets.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
    if(!sets.find(s=>s.id===selectedSetId)) selectedSetId=sets[0]?.id || '';
    refs.courseSetSelect.value=selectedSetId;
  }
  const set=getSelectedSet(course);
  const tees=Object.keys(set?.tees||{});
  if(refs.teeSelect){
    refs.teeSelect.innerHTML=tees.map(t=>`<option>${t}</option>`).join('');
    if(!tees.includes(selectedTee)) selectedTee=tees[0] || 'Regular';
    refs.teeSelect.value=selectedTee;
  }
}
function setCourseStatus(text){ if(refs.courseStatus) refs.courseStatus.textContent=text; }
function jsonpRequest(url, timeout=12000){
  return new Promise((resolve,reject)=>{
    const cb='__pxGoraCb_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    const script=document.createElement('script');
    const sep=url.includes('?')?'&':'?';
    let done=false;
    const cleanup=()=>{ try{ delete window[cb]; }catch(_){ window[cb]=undefined; } script.remove(); };
    const timer=setTimeout(()=>{ if(done) return; done=true; cleanup(); reject(new Error('APIの応答がありませんでした')); }, timeout);
    window[cb]=(data)=>{ if(done) return; done=true; clearTimeout(timer); cleanup(); resolve(data); };
    script.onerror=()=>{ if(done) return; done=true; clearTimeout(timer); cleanup(); reject(new Error('API通信に失敗しました')); };
    script.src=url+sep+'callback='+encodeURIComponent(cb);
    document.head.appendChild(script);
  });
}
function makeApiCourse(raw){
  const item=raw?.item || raw || {};
  const id=String(item.golfCourseId || item.golfCourseIdStr || item.id || Math.random().toString(36).slice(2));
  const name=item.golfCourseName || item.golfCourseAbbr || '名称未取得のゴルフ場';
  const area=item.address || item.prefecture || item.highway || '地域未取得';
  const saved=findSavedCourseForApi(id, name);
  if(saved){
    return {
      ...saved,
      id:saved.id,
      rakutenGolfCourseId:id,
      name:saved.name || name,
      area:saved.area || area,
      note:'ProNexa DB登録済み',
      source:'pronexa-db',
      detailUrl:item.golfCourseDetailUrl || saved.detailUrl || '',
      imageUrl:item.golfCourseImageUrl || saved.imageUrl || '',
      evaluation:item.evaluation || saved.evaluation || ''
    };
  }
  return {
    id:'rakuten-'+id,
    rakutenGolfCourseId:id,
    name,
    area,
    note:'楽天GORA API',
    source:'rakuten-api-only',
    detailUrl:item.golfCourseDetailUrl || '',
    imageUrl:item.golfCourseImageUrl || '',
    evaluation:item.evaluation || '',
    sets:[makeManualSetFromCurrent('OUT / IN（手入力）')]
  };
}
function uniqueCourses(list){
  const seen=new Set();
  return list.filter(c=>{ const k=courseIdentityKey(c); if(seen.has(k)) return false; seen.add(k); return true; });
}
function localResults(query=''){
  const q=normalizeText(query || refs.courseSearch?.value || '');
  return courseDatabase.filter(c=>{
    const blob=normalizeText(`${c.name} ${c.area} ${c.note||''}`);
    return !q || blob.includes(q);
  }).slice(0,8);
}
function selectCourse(courseId, {resetIndex=true, syncSearch=true, rerender=true}={}){
  selectedCourseId=courseId;
  const c=getSelectedCourse();
  if(!c) return;
  selectedSetId=(c.sets||[])[0]?.id || '';
  selectedTee=Object.keys(((c.sets||[])[0]?.tees)||{})[0] || 'Regular';
  if(syncSearch && refs.courseSearch) refs.courseSearch.value=c.name || refs.courseSearch.value;
  populateCourseControls();
  applyCourseToHoles({resetIndex});
  if(rerender) renderCourseResults(refs.courseSearch?.value||'');
  fillDbEditorFromCurrent();
}
function bestCourseMatch(list, keyword){
  const q=normalizeText(keyword);
  if(!list.length) return null;
  const ranked=[...list].sort((a,b)=>{
    const aDb=hasCourseScorecard(a)?1:0, bDb=hasCourseScorecard(b)?1:0;
    if(aDb!==bDb) return bDb-aDb;
    return 0;
  });
  return ranked.find(c=>normalizeText(c.name)===q) ||
         ranked.find(c=>normalizeText(c.name).includes(q)) ||
         ranked.find(c=>q.includes(normalizeText(c.name))) ||
         ranked[0];
}
function renderCourseResults(query='', {includeApi=true}={}){
  if(!refs.courseResults) return;
  const locals=localResults(query);
  const api = includeApi ? apiCourseResults : [];
  const results=uniqueCourses([...api, ...locals]).slice(0,12);
  if(!results.length){
    const guide = query ? `「${query}」に一致するゴルフ場はまだ見つかりません。<br>CMSでそのゴルフ場を登録すると、ここに表示されます。` : 'ゴルフ場名を入力して「検索する」を押してください。保存済みDB / Firestore から候補を表示します。';
    refs.courseResults.innerHTML=`<div class="course-empty">${guide}</div>`;
    return;
  }
  refs.courseResults.innerHTML=results.map(c=>{
    const source = c.note || 'ProNexa DB';
    const hasCard = hasCourseScorecard(c);
    const scoreText = hasCard ? `スコアカード登録済み・${(c.sets||[]).length}コース` : 'コースデータ未登録'; 
    return `
    <button class="course-result ${c.id===selectedCourseId?'active':''}" type="button" data-course-id="${c.id}">
      <strong>${c.name}</strong>
      <span>${c.area||'地域未設定'} ・ ${source} ・ ${scoreText}</span>
    </button>`;
  }).join('');
  refs.courseResults.querySelectorAll('button[data-course-id]').forEach(btn=>btn.addEventListener('click',()=>{
    selectCourse(btn.dataset.courseId);
  }));
}
async function searchRakutenGora({autoSelect=false}={}){
  const keyword=(refs.courseSearch?.value||'').trim();
  if(!keyword){ setCourseStatus('ゴルフ場名を入力してください。'); return []; }
  const cred=saveRakutenCredentials();
  if(!cred.appId || !cred.accessKey){
    setCourseStatus('外部API設定がないため、現在は保存済みDB / Firestore に登録されているゴルフ場だけ検索できます。');
    refs.courseResults.innerHTML=`<div class="course-empty">現在は保存済みDB / Firestore に登録されているゴルフ場のみ検索できます。見つからない場合はCMSでゴルフ場を追加してください。</div>`;
    return [];
  }
  isApiSearching=true;
  setCourseStatus('ゴルフ場を検索中...');
  refs.courseResults.innerHTML=`<div class="course-empty">ゴルフ場を検索中...</div>`;
  const params=new URLSearchParams({
    format:'json', formatVersion:'2', applicationId:cred.appId, accessKey:cred.accessKey,
    keyword, hits:'12', page:'1', sort:'50on', reservation:'0', carrier:'0'
  });
  const url='https://openapi.rakuten.co.jp/engine/api/Gora/GoraGolfCourseSearch/20170623?'+params.toString();
  try{
    const data=await jsonpRequest(url);
    if(data?.error){ throw new Error(data.error_description || data.error); }
    const items=data.items || data.Items || [];
    apiCourseResults=items.map(makeApiCourse);
    const best=bestCourseMatch(apiCourseResults, keyword);
    if(autoSelect && best){
      selectCourse(best.id, {syncSearch:true, rerender:false});
      renderCourseResults(best.name || keyword);
      const cardNote = best.source==='rakuten-api-only' ? 'スコアカードは未登録なのでPAR/YDSを入力して保存してください。' : '保存済みスコアカードを反映しました。';
      setCourseStatus(`${best.name} を自動設定しました。${cardNote}`);
    }else{
      renderCourseResults(keyword);
      setCourseStatus(apiCourseResults.length ? `${apiCourseResults.length}件見つかりました。コースを選択してください。` : '検索結果がありませんでした。');
    }
    return apiCourseResults;
  }catch(err){
    apiCourseResults=[];
    renderCourseResults(keyword, {includeApi:false});
    setCourseStatus(`検索エラー：${err.message || err}`);
    return [];
  }finally{
    isApiSearching=false;
  }
}
async function autoSetCourseByName(){
  if(isAutoSettingCourse) return;
  const keyword=(refs.courseSearch?.value||'').trim();
  if(!keyword){
    setCourseStatus('ゴルフ場名を入力してから検索してください。');
    renderCourseResults('', {includeApi:false});
    return;
  }
  isAutoSettingCourse=true;
  try{
    const locals=localResults(keyword);
    const bestLocal=bestCourseMatch(locals, keyword);
    const q=normalizeText(keyword);
    const localIsStrong = bestLocal && (locals.length===1 || normalizeText(bestLocal.name)===q || normalizeText(bestLocal.name).includes(q));
    renderCourseResults(keyword, {includeApi:false});
    if(localIsStrong){
      selectCourse(bestLocal.id, {syncSearch:true});
      setCourseStatus(`${bestLocal.name} を見つけました。コース / ティーを確認すると、すぐ撮影に進めます。`);
      return;
    }
    if(locals.length){
      setCourseStatus(`${locals.length}件見つかりました。下の候補からゴルフ場を選んでください。`);
    }else{
      setCourseStatus('このゴルフ場はまだ未登録です。CMSで追加すると、この画面から選べるようになります。');
      if(refs.courseResults){
        refs.courseResults.innerHTML='<div class="course-empty"><strong style="color:#baff81;display:block;margin-bottom:6px;">未登録のゴルフ場です</strong>このゴルフ場は現在のDBに入っていません。<br>CMSで追加 → 公開後、もう一度ここで検索してください。</div>';
      }
    }
  }finally{
    isAutoSettingCourse=false;
  }
}
function saveCurrentCourseCard(){
  const name=(refs.courseName.value||'未登録コース').trim();
  const selected=getSelectedCourse();
  const safeId= selected?.rakutenGolfCourseId ? 'custom-rakuten-'+selected.rakutenGolfCourseId : 'custom-'+Date.now();
  const current={
    id:safeId,
    name,
    area:selected?.area || 'ユーザー登録',
    note:'自分で保存',
    rakutenGolfCourseId:selected?.rakutenGolfCourseId || '',
    sets:[{ id:'out-in', name:'OUT / IN', tees:{ Regular:{
      OUT:holes.OUT.map(h=>({par:h.par,yds:h.yds})),
      IN:holes.IN.map(h=>({par:h.par,yds:h.yds}))
    }}}]
  };
  const saved=loadSavedCourses().filter(c=>c.name!==name && c.id!==safeId);
  saved.push(current);
  localStorage.setItem(courseStorageKey, JSON.stringify(saved));
  courseDatabase=[...defaultCourseDatabase, ...saved];
  lastAutoApiKeyword='';
  selectedCourseId=safeId; selectedSetId='out-in'; selectedTee='Regular';
  if(refs.courseSearch) refs.courseSearch.value=name;
  apiCourseResults=[];
  populateCourseControls();
  renderCourseResults(name, {includeApi:false});
  setCourseStatus(`${name} のスコアカードを保存しました。次回から名前検索で自動反映できます。`);
}

function setDbEditorStatus(text){ if(refs.dbEditorStatus) refs.dbEditorStatus.textContent=text; }
function makeDbHoleRow(side, idx){
  const holeNo = side === 'OUT' ? idx + 1 : idx + 10;
  return `<div class="db-hole-row" data-db-side="${side}" data-db-idx="${idx}">
    <b>${holeNo}</b>
    <label><span>PAR</span><input type="number" min="3" max="6" inputmode="numeric" data-field="par" value="4"></label>
    <label><span>YDS</span><input type="number" min="50" max="750" inputmode="numeric" data-field="yds" value="0"></label>
  </div>`;
}
function renderDbEditor(){
  if(refs.dbOutGrid) refs.dbOutGrid.innerHTML = Array.from({length:9},(_,i)=>makeDbHoleRow('OUT',i)).join('');
  if(refs.dbInGrid) refs.dbInGrid.innerHTML = Array.from({length:9},(_,i)=>makeDbHoleRow('IN',i)).join('');
}
function dbInput(side, idx, field){
  const grid = side === 'OUT' ? refs.dbOutGrid : refs.dbInGrid;
  return grid?.querySelector(`.db-hole-row[data-db-idx="${idx}"] input[data-field="${field}"]`);
}
function setDbSide(side, arr){
  for(let i=0;i<9;i++){
    const src = arr?.[i] || {par:4,yds:0};
    const parEl = dbInput(side,i,'par');
    const ydsEl = dbInput(side,i,'yds');
    if(parEl) parEl.value = Number(src.par || 4);
    if(ydsEl) ydsEl.value = Number(src.yds || 0);
  }
}
function readDbSide(side){
  return Array.from({length:9},(_,i)=>({
    par: Number(dbInput(side,i,'par')?.value || 4),
    yds: Number(dbInput(side,i,'yds')?.value || 0)
  }));
}
function fillDbEditorFromCurrent(){
  if(!refs.dbCourseName) return;
  const selected = getSelectedCourse();
  const set = getSelectedSet(selected);
  refs.dbCourseName.value = refs.courseName?.value || selected?.name || '';
  refs.dbCourseArea.value = selected?.area || '';
  refs.dbSetName.value = set?.name || 'OUT / IN';
  refs.dbTeeName.value = selectedTee || 'Regular';
  setDbSide('OUT', holes.OUT);
  setDbSide('IN', holes.IN);
  setDbEditorStatus('現在画面のPAR/YDSをDB登録エリアに読み込みました。');
}
function clearDbEditor(){
  if(refs.dbCourseName) refs.dbCourseName.value = refs.courseName?.value || '';
  if(refs.dbCourseArea) refs.dbCourseArea.value = getSelectedCourse()?.area || '';
  if(refs.dbSetName) refs.dbSetName.value = 'OUT / IN';
  if(refs.dbTeeName) refs.dbTeeName.value = 'Regular';
  setDbSide('OUT', Array.from({length:9},()=>({par:4,yds:0})));
  setDbSide('IN', Array.from({length:9},()=>({par:4,yds:0})));
  setDbEditorStatus('空のスコアカードを作りました。公式情報を見ながら入力してください。');
}
function slugForCourse(name){
  const base = normalizeText(name).replace(/[^a-z0-9ぁ-んァ-ヶ一-龥ー]/gi,'').slice(0,60);
  return base || String(Date.now());
}
function saveDbCourseFromEditor(){
  const name = (refs.dbCourseName?.value || refs.courseName?.value || '未登録コース').trim();
  if(!name){ setDbEditorStatus('ゴルフ場名を入力してください。'); return; }
  const area = (refs.dbCourseArea?.value || getSelectedCourse()?.area || 'ユーザー登録').trim();
  const setName = (refs.dbSetName?.value || 'OUT / IN').trim();
  const teeName = (refs.dbTeeName?.value || 'Regular').trim();
  const selected = getSelectedCourse();
  const setId = 'set-' + slugForCourse(setName);
  const teeData = { OUT: readDbSide('OUT'), IN: readDbSide('IN') };
  const safeId = selected?.rakutenGolfCourseId ? 'custom-rakuten-' + selected.rakutenGolfCourseId : 'custom-' + slugForCourse(name);
  const course = {
    id: safeId,
    name,
    area,
    note:'手入力DB',
    rakutenGolfCourseId: selected?.rakutenGolfCourseId || '',
    sets: [{ id:setId, name:setName, tees:{ [teeName]: teeData } }]
  };
  const saved = loadSavedCourses().filter(c=>{
    if(c.id === safeId) return false;
    if(normalizeText(c.name) === normalizeText(name)) return false;
    return true;
  });
  saved.push(course);
  localStorage.setItem(courseStorageKey, JSON.stringify(saved));
  courseDatabase = [...defaultCourseDatabase, ...saved];
  lastAutoApiKeyword='';
  apiCourseResults = [];
  selectedCourseId = safeId;
  selectedSetId = setId;
  selectedTee = teeName;
  if(refs.courseName) refs.courseName.value = name;
  if(refs.courseSearch) refs.courseSearch.value = name;
  populateCourseControls();
  applyCourseToHoles({resetIndex:true});
  renderCourseResults(name, {includeApi:false});
  setDbEditorStatus(`${name} / ${setName} / ${teeName} をDBに保存して反映しました。次回から名前検索で自動設定できます。`);
}

function bindCourseSearch(){
  renderDbEditor();
  if(!selectedCourseId && courseDatabase[0]?.id){
    selectedCourseId = courseDatabase[0].id;
    selectedSetId = (courseDatabase[0].sets||[])[0]?.id || '';
    selectedTee = Object.keys((((courseDatabase[0].sets||[])[0]?.tees)||{}))[0] || 'Regular';
    if(refs.courseName && !refs.courseName.value) refs.courseName.value = courseDatabase[0].name || '';
  }
  populateCourseControls();
  renderCourseResults(refs.courseSearch?.value || '', {includeApi:false});
  refs.courseSearchBtn?.addEventListener('click',()=>autoSetCourseByName());
  refs.courseSearch?.addEventListener('keydown',(e)=>{ if(e.key==='Enter'){ e.preventDefault(); autoSetCourseByName(); } });
  refs.courseSearch?.addEventListener('input',()=>{
    renderCourseResults(refs.courseSearch.value, {includeApi:false});
    clearTimeout(courseAutoTimer);
    courseAutoTimer=setTimeout(()=>autoSetCourseByName(), 900);
  });
  refs.courseSearch?.addEventListener('blur',()=>autoSetCourseByName());
  refs.courseSetSelect?.addEventListener('change',()=>{ selectedSetId=refs.courseSetSelect.value; populateCourseControls(); applyCourseToHoles({resetIndex:true}); });
  refs.teeSelect?.addEventListener('change',()=>{ selectedTee=refs.teeSelect.value; applyCourseToHoles({resetIndex:false}); });
  refs.saveCourseBtn?.addEventListener('click',saveCurrentCourseCard);
  refs.dbLoadCurrentBtn?.addEventListener('click',fillDbEditorFromCurrent);
  refs.dbClearBtn?.addEventListener('click',clearDbEditor);
  refs.dbSaveBtn?.addEventListener('click',saveDbCourseFromEditor);
  fillDbEditorFromCurrent();
}

function bind(){
  bindCourseSearch();
  refs.homeStartBtn && (refs.homeStartBtn.onclick=()=>showScreen(refs.setup));
  refs.homeCourseBtn && (refs.homeCourseBtn.onclick=()=>{ showScreen(refs.setup); setTimeout(()=>refs.courseSearch?.focus(),80); });
  refs.homeQuickBtn && (refs.homeQuickBtn.onclick=()=>openCamera());
  refs.homePremiumBtn && (refs.homePremiumBtn.onclick=()=>alert('Premiumテーマは次のステップで追加予定です。'));
  refs.backHomeBtn && (refs.backHomeBtn.onclick=()=>showScreen(refs.home));
  refs.sideControl.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{ refs.sideControl.querySelectorAll('button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); state.side=btn.dataset.side; state.index=state.side==='OUT'?2:0; setHoleByIndex(state.index); }));
  refs.holeMinus.onclick=()=>setHoleByIndex(state.index-1); refs.holePlus.onclick=()=>setHoleByIndex(state.index+1);
  refs.prevHoleBtn.onclick=()=>setHoleByIndex(state.index-1); refs.nextHoleBtn.onclick=()=>setHoleByIndex(state.index+1);
  [refs.courseName, refs.playerName, refs.totalScore, refs.holeScore, refs.parInput, refs.yardsInput, refs.remainingYardsInput, refs.clubInput, refs.showScorecard].forEach(el=>el.addEventListener('input', updateHoleDataFromInputs));
  [refs.recordQuality, refs.recordFps, refs.audioEnabled].forEach(el=>el && el.addEventListener('input', updateAll));
  [refs.topBarScale, refs.scorecardScale, refs.topBarScaleX, refs.topBarScaleY, refs.scorecardScaleX, refs.scorecardScaleY].forEach(el=> el && el.addEventListener('input', updateAll));
  refs.openCameraBtn.onclick=openCamera;
  setupGearMove(refs.backSetupBtn);
  setupShotInfoMove(refs.shotInfoPill);
  refs.toggleScorecardBtn.onclick=()=>{ refs.showScorecard.checked=false; updateAll(); };
  refs.reopenScorecardBtn.onclick=()=>{ refs.showScorecard.checked=true; updateAll(); };
  refs.totalMinus.onclick=()=>setTotalByDelta(-1); refs.totalPlus.onclick=()=>setTotalByDelta(1); refs.currentShotMinus.onclick=()=>setCurrentShotByDelta(-1); refs.currentShotPlus.onclick=()=>setCurrentShotByDelta(1); refs.currentShotMinusSetup.onclick=()=>setCurrentShotByDelta(-1); refs.currentShotPlusSetup.onclick=()=>setCurrentShotByDelta(1); refs.shotMinus.onclick=()=>setShotByDelta(-1); refs.shotPlus.onclick=()=>setShotByDelta(1); refs.remainingMinus && (refs.remainingMinus.onclick=()=>setRemainingByDelta(-5)); refs.remainingPlus && (refs.remainingPlus.onclick=()=>setRemainingByDelta(5)); refs.clubPrev && (refs.clubPrev.onclick=()=>cycleClub(-1)); refs.clubNext && (refs.clubNext.onclick=()=>cycleClub(1));
  refs.recordBtn.onclick=()=> state.recorder && state.recorder.state==='recording' ? stopRecording() : startRecording();
  refs.tracerToggleBtn && (refs.tracerToggleBtn.onclick=()=>toggleAutoTracer());
  refs.tracerTestBtn && (refs.tracerTestBtn.onclick=()=>triggerTracerLine({manual:true}));
  setupOverlayMove(refs.topBarDom, 'top');
  setupOverlayMove(refs.scorecardDom, 'card');
  setupOverlayResize(refs.topBarDragHandle, 'top');
  setupOverlayResize(refs.scorecardDragHandle, 'card');
  setupDesktopOverlayMouseFallback(refs.topBarDom, 'top');
  setupDesktopOverlayMouseFallback(refs.scorecardDom, 'card');
  setupDesktopResizeMouseFallback(refs.topBarDragHandle, 'top');
  setupDesktopResizeMouseFallback(refs.scorecardDragHandle, 'card');
  setupCameraPinchZoom(refs.cameraStage);
  lockCameraTouch();
  if(refs.shareBtn) refs.shareBtn.onclick=shareRecordedVideo;
  refs.retakeBtn.onclick=()=>showScreen(refs.camera);
  refs.newShotBtn.onclick=()=>{ setHoleByIndex(state.index+1); showScreen(refs.camera); };
}


function toggleAutoTracer(){
  state.tracer.enabled = !state.tracer.enabled;
  refs.tracerToggleBtn?.classList.toggle('active', state.tracer.enabled);
  if(refs.tracerToggleBtn) refs.tracerToggleBtn.innerHTML = `<span></span>自動トレーサー ${state.tracer.enabled ? 'ON' : 'OFF'}`;
  if(refs.tracerStatus) refs.tracerStatus.textContent = state.tracer.enabled ? 'AUTO TRACER β' : 'TRACER OFF';
  if(!state.tracer.enabled) hideTracerLine();
}

function setTracerPath(points){
  state.tracer.path = points;
  const d = `M ${points[0]} ${points[1]} C ${points[2]} ${points[3]}, ${points[4]} ${points[5]}, ${points[6]} ${points[7]} C ${points[8]} ${points[9]}, ${points[10]} ${points[11]}, ${points[12]} ${points[13]}`;
  refs.tracerPath?.setAttribute('d', d);
  refs.tracerGlow?.setAttribute('d', d);
  refs.tracerOrigin?.setAttribute('cx', points[0]);
  refs.tracerOrigin?.setAttribute('cy', points[1]);
}

function triggerTracerLine(opts={}){
  if(!state.tracer.enabled) return;
  const now = performance.now();
  if(now - (state.tracer.lastAutoAt||0) < 2200 && !opts.manual) return;
  state.tracer.lastAutoAt = now;
  const c = state.tracer.candidate || {x:.55,y:.86};
  const startX = Math.max(24, Math.min(76, c.x*100));
  const startY = Math.max(72, Math.min(92, c.y*100));
  const drift = (Math.random()-.35) * 17;
  const apexX = Math.max(18, Math.min(82, startX - 18 + drift));
  const apexY = 19 + Math.random()*9;
  const finishX = Math.max(10, Math.min(92, apexX - 12 + Math.random()*16));
  const finishY = Math.max(13, Math.min(44, apexY + 5 + Math.random()*10));
  setTracerPath([
    startX,startY,
    startX-2,startY-23,
    apexX+10,apexY+25,
    apexX,apexY,
    apexX-6,apexY-6,
    finishX,finishY-3,
    finishX,finishY
  ]);
  state.tracer.visible = true;
  state.tracer.progress = 0;
  state.tracer.startTime = now;
  state.tracer.holdUntil = now + state.tracer.duration + 2400;
  refs.tracerLayer?.classList.add('active','drawing');
  if(refs.tracerStatus) refs.tracerStatus.textContent = opts.manual ? 'LINE TEST' : 'BALL DETECTED';
}

function hideTracerLine(){
  state.tracer.visible = false;
  state.tracer.progress = 0;
  refs.tracerLayer?.classList.remove('active','drawing','fading');
}

function updateVisibleTracer(){
  if(!state.tracer.visible) return;
  const now = performance.now();
  const p = Math.min(1, (now - state.tracer.startTime) / state.tracer.duration);
  state.tracer.progress = p;
  refs.tracerLayer?.style.setProperty('--tracer-progress', String(p));
  if(p >= 1) refs.tracerLayer?.classList.remove('drawing');
  if(now > state.tracer.holdUntil){
    refs.tracerLayer?.classList.add('fading');
    setTimeout(hideTracerLine, 520);
  }
}

function startAutoTracerMonitor(){
  if(state.tracer.monitorId) clearInterval(state.tracer.monitorId);
  state.tracer.monitorId = setInterval(scanBallCandidate, 140);
}

function scanBallCandidate(){
  if(!state.tracer.enabled || !refs.cameraVideo || refs.cameraVideo.readyState < 2) return;
  const video = refs.cameraVideo;
  const W = 120, H = 210;
  const c = scanBallCandidate.canvas || (scanBallCandidate.canvas = document.createElement('canvas'));
  c.width = W; c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently:true });
  try{ ctx.drawImage(video,0,0,W,H); }catch(_){ return; }
  let data;
  try{ data = ctx.getImageData(0,0,W,H).data; }catch(_){ return; }
  let sx=0, sy=0, count=0;
  const y0 = Math.floor(H*.42);
  for(let y=y0; y<H-5; y+=2){
    for(let x=6; x<W-6; x+=2){
      const i=(y*W+x)*4;
      const r=data[i], g=data[i+1], b=data[i+2];
      const max=Math.max(r,g,b), min=Math.min(r,g,b);
      if(max>188 && (max-min)<42 && r>170 && g>170 && b>170){ sx+=x; sy+=y; count++; }
    }
  }
  if(count>8){
    const cand = {x:(sx/count)/W, y:(sy/count)/H, count};
    const prev = state.tracer.lastCandidate;
    state.tracer.candidate = cand;
    if(refs.tracerStatus && !state.tracer.visible) refs.tracerStatus.textContent = 'BALL SCAN';
    if(prev && state.recorder && state.recorder.state==='recording'){
      const dx = cand.x-prev.x, dy = cand.y-prev.y;
      const dist = Math.hypot(dx,dy);
      if(dist > .055 && performance.now() > (state.tracer.impactCooldown||0)){
        state.tracer.impactCooldown = performance.now()+2500;
        triggerTracerLine({auto:true});
      }
    }
    state.tracer.lastCandidate = cand;
  }else if(state.tracer.lastCandidate && state.recorder && state.recorder.state==='recording' && performance.now() > (state.tracer.impactCooldown||0)){
    state.tracer.candidate = state.tracer.lastCandidate;
    state.tracer.impactCooldown = performance.now()+2500;
    triggerTracerLine({auto:true});
    state.tracer.lastCandidate = null;
  }
}

function bezierPoint(p0,p1,p2,p3,t){
  const u=1-t;
  return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
}
function drawTracerCanvas(ctx,W,H){
  if(!state.tracer.visible) return;
  updateVisibleTracer();
  const pts = state.tracer.path;
  const prog = Math.max(.001, Math.min(1, state.tracer.progress || 0));
  const scaleX = W/100, scaleY = H/100;
  const samples = 90;
  const path=[];
  for(let i=0;i<=Math.floor(samples*prog);i++){
    const t = i/samples;
    let x,y;
    if(t <= .72){
      const k=t/.72;
      x=bezierPoint(pts[0],pts[2],pts[4],pts[6],k);
      y=bezierPoint(pts[1],pts[3],pts[5],pts[7],k);
    }else{
      const k=(t-.72)/.28;
      x=bezierPoint(pts[6],pts[8],pts[10],pts[12],k);
      y=bezierPoint(pts[7],pts[9],pts[11],pts[13],k);
    }
    path.push([x*scaleX,y*scaleY]);
  }
  if(path.length<2) return;
  ctx.save();
  ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.globalAlpha = refs.tracerLayer?.classList.contains('fading') ? .48 : 1;
  ctx.beginPath(); path.forEach(([x,y],i)=> i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle='rgba(255,255,255,.16)'; ctx.lineWidth=24; ctx.shadowColor='rgba(255,255,255,.55)'; ctx.shadowBlur=34; ctx.stroke();
  ctx.beginPath(); path.forEach(([x,y],i)=> i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle='rgba(255,255,255,.88)'; ctx.lineWidth=9; ctx.shadowColor='rgba(255,255,255,.90)'; ctx.shadowBlur=18; ctx.stroke();
  ctx.beginPath(); path.forEach(([x,y],i)=> i?ctx.lineTo(x,y):ctx.moveTo(x,y));
  ctx.strokeStyle='rgba(255,255,255,1)'; ctx.lineWidth=3.2; ctx.shadowBlur=0; ctx.stroke();
  const origin = path[0];
  if(origin){
    ctx.beginPath(); ctx.arc(origin[0], origin[1], 8, 0, Math.PI*2); ctx.fillStyle='rgba(255,255,255,.95)'; ctx.shadowColor='rgba(255,255,255,.9)'; ctx.shadowBlur=20; ctx.fill();
  }
  ctx.restore();
}

function getRecordingFps(){ return Number(refs.recordFps?.value || 30); }
function getVideoConstraints(){
  const high = (refs.recordQuality?.value || 'high') === 'high';
  const fps = getRecordingFps();
  return {
    facingMode:{ ideal:'environment' },
    width:{ ideal: high ? 1080 : 720 },
    height:{ ideal: high ? 1920 : 1280 },
    frameRate:{ ideal: fps, max: fps }
  };
}
function getAudioConstraint(){ return !!refs.audioEnabled?.checked; }

function isLandscapeRecording(){
  return window.matchMedia('(orientation: landscape)').matches && window.innerWidth > window.innerHeight;
}
function prepareRecordCanvas(){
  const c = refs.canvas;
  if(!c) return;
  if(isLandscapeRecording()){
    c.width = 1920;
    c.height = 1080;
  }else{
    c.width = 1080;
    c.height = 1920;
  }
}

async function openCamera(){
  showScreen(refs.camera); refs.cameraFallback.style.display='grid'; refs.cameraFallback.textContent='カメラ起動中...'; await enableHiddenStabilization(); applyZoom();
  try{
    if(state.stream) state.stream.getTracks().forEach(t=>t.stop());
    try{ state.stream = await navigator.mediaDevices.getUserMedia({ video:getVideoConstraints(), audio:getAudioConstraint() }); }
    catch(_){ state.stream = await navigator.mediaDevices.getUserMedia({ video:true, audio:getAudioConstraint() }); }
    refs.cameraVideo.srcObject=state.stream; refs.cameraFallback.style.display='none'; await refs.cameraVideo.play().catch(()=>{}); startAutoTracerMonitor();
  }catch(err){ console.error(err); refs.cameraFallback.textContent='カメラを起動できませんでした。HTTPSかlocalhostで開いてください。'; alert('カメラを起動できませんでした。ブラウザのカメラ許可を確認してね。'); }
}
function bestMime(){ const list=['video/mp4;codecs="avc1.42E01E,mp4a.40.2"','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm']; if(!window.MediaRecorder) return ''; return list.find(t=>MediaRecorder.isTypeSupported(t)) || ''; }
function setupSupport(){ const mime=bestMime(); state.mime=mime||'video/webm'; refs.supportPill.textContent = window.MediaRecorder ? 'HOME v41' : '録画非対応'; }
async function startRecording(){
  if(!window.MediaRecorder){ alert('このブラウザは録画に対応していません。Chrome / Safariの新しい版で試してね。'); return; }
  if(!state.stream){ await openCamera(); if(!state.stream) return; }
  state.chunks=[]; prepareRecordCanvas(); const canvas=refs.canvas; const canvasStream=canvas.captureStream(getRecordingFps()); if(getAudioConstraint()) state.stream.getAudioTracks().forEach(t=>canvasStream.addTrack(t));
  try{ state.recorder = new MediaRecorder(canvasStream, state.mime ? {mimeType:state.mime} : undefined); } catch(e){ state.recorder = new MediaRecorder(canvasStream); }
  state.recorder.ondataavailable=e=>{ if(e.data && e.data.size) state.chunks.push(e.data); };
  state.recorder.onstop=onRecordingStop; state.recordStart=Date.now(); refs.recordBtn.classList.add('recording'); refs.recordStatus.textContent='録画中 00:00'; document.body.classList.add('is-recording');
  state.recordTimer=setInterval(()=>{ const s=Math.floor((Date.now()-state.recordStart)/1000); const label=`録画中 00:${String(s).padStart(2,'0')}`; refs.recordStatus.textContent=label; refs.recordingTime.textContent=`REC 00:${String(s).padStart(2,'0')}`; },250);
  drawLoop(); state.recorder.start(250);
  if(state.tracer.enabled){
    setTimeout(()=>{ if(state.recorder && state.recorder.state==='recording') triggerTracerLine({auto:true}); }, 950);
  }
}
function stopRecording(){ if(state.recorder && state.recorder.state==='recording') state.recorder.stop(); }
function onRecordingStop(){
  clearInterval(state.recordTimer); cancelAnimationFrame(state.animationId); refs.recordBtn.classList.remove('recording'); refs.recordStatus.textContent='撮影完了'; document.body.classList.remove('is-recording'); refs.recordingTime.textContent='REC 00:00';
  const type = state.recorder.mimeType || state.mime || 'video/webm';
  const ext = type.includes('mp4') ? 'mp4' : 'webm';
  const blob = new Blob(state.chunks,{type});
  const fileName = `px-golf-camera-hole-${currentHole().hole}-${Date.now()}.${ext}`;
  if(state.recordedUrl) URL.revokeObjectURL(state.recordedUrl);
  state.recordedBlob = blob;
  state.recordedFileName = fileName;
  state.recordedUrl = URL.createObjectURL(blob);
  refs.reviewVideo.src = state.recordedUrl;
  refs.downloadLink.href = state.recordedUrl;
  refs.downloadLink.download = fileName;
  if(refs.shareStatus){
    refs.shareStatus.textContent = navigator.share ? '共有ボタンから保存先を選べます。iPhoneは「ビデオを保存」を選んでください。' : 'このブラウザは共有に非対応です。ファイル保存を使ってください。';
  }
  showScreen(refs.review);
}

async function shareRecordedVideo(){
  if(!state.recordedBlob){
    alert('共有できる動画がまだありません。先に録画してください。');
    return;
  }
  const type = state.recordedBlob.type || state.mime || 'video/webm';
  const fileName = state.recordedFileName || `px-golf-camera-${Date.now()}.${type.includes('mp4')?'mp4':'webm'}`;
  const file = new File([state.recordedBlob], fileName, { type });
  if(refs.shareStatus) refs.shareStatus.textContent = '共有画面を開いています...';
  try{
    if(navigator.canShare && navigator.canShare({ files:[file] })){
      await navigator.share({ files:[file], title:'Px Golf Camera', text:'Px Golf Cameraで撮影した動画' });
      if(refs.shareStatus) refs.shareStatus.textContent = '共有しました。iPhoneは「ビデオを保存」を選ぶと写真アプリに入ります。';
      return;
    }
    if(navigator.share){
      // ファイル共有に非対応でも、URL共有だけは試せる端末がある。
      await navigator.share({ title:'Px Golf Camera', text:'動画を保存する場合はファイル保存も試してください。', url:state.recordedUrl });
      if(refs.shareStatus) refs.shareStatus.textContent = 'URL共有を開きました。動画本体が出ない場合はファイル保存を使ってください。';
      return;
    }
    throw new Error('share unsupported');
  }catch(err){
    if(err && err.name === 'AbortError'){
      if(refs.shareStatus) refs.shareStatus.textContent = '共有をキャンセルしました。';
      return;
    }
    console.warn(err);
    if(refs.shareStatus) refs.shareStatus.textContent = 'この端末では共有保存できません。ファイル保存を使ってください。';
    refs.downloadLink?.click();
  }
}
function drawLoop(){ if(!state.recorder || state.recorder.state!=='recording') return; tickStabilization(); updateVisibleTracer(); const c=refs.canvas, ctx=c.getContext('2d'); const W=c.width,H=c.height; ctx.clearRect(0,0,W,H); drawVideoCover(ctx, refs.cameraVideo, W, H); drawTracerCanvas(ctx,W,H); drawCanvasOverlay(ctx,W,H); state.animationId=requestAnimationFrame(drawLoop); }
function drawVideoCover(ctx, video, W, H){ if(video.videoWidth && video.videoHeight){ const vw=video.videoWidth, vh=video.videoHeight; tickStabilization(); const zoom=Math.max(1, Number(state.zoom||1)) * stabilizationExtraZoom(); const s=Math.max(W/vw,H/vh)*zoom; const dw=vw*s, dh=vh*s; const st=state.stabilization||{x:0,y:0}; const ratio=W/Math.max(320,(document.documentElement.clientWidth||window.innerWidth||430)); ctx.drawImage(video,(W-dw)/2 + (st.x||0)*ratio,(H-dh)/2 + (st.y||0)*ratio,dw,dh); }else{ const g=ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,'#20452f'); g.addColorStop(1,'#07100c'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H); } }
function roundRect(ctx,x,y,w,h,r){ const rr=Math.min(r,w/2,h/2); ctx.beginPath(); ctx.moveTo(x+rr,y); ctx.arcTo(x+w,y,x+w,y+h,rr); ctx.arcTo(x+w,y+h,x,y+h,rr); ctx.arcTo(x,y+h,x,y,rr); ctx.arcTo(x,y,x+w,y,rr); ctx.closePath(); }
function text(ctx,t,x,y,size,color='#fff',weight='800',align='left'){ ctx.font=`${weight} ${size}px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif`; ctx.fillStyle=color; ctx.textAlign=align; ctx.textBaseline='middle'; ctx.fillText(String(t),x,y); }
function fitText(ctx,t,x,y,maxWidth,size,color='#fff',weight='900'){ let s=size; do{ ctx.font=`${weight} ${s}px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif`; if(ctx.measureText(String(t)).width<=maxWidth) break; s-=2; }while(s>18); text(ctx,t,x,y,s,color,weight); }
function drawCanvasOverlay(ctx,W,H){
  const h=currentHole(), nameRaw=(refs.playerName.value||'PLAYER'), name=nameRaw.toLowerCase().replace(/\b\w/g, c=>c.toUpperCase()), score=totalScoreText();
  const topScale = Number(refs.topBarScale?.value || 100) / 100;
  const cardScale = Number(refs.scorecardScale?.value || 100) / 100;
  const topScaleX = Number(refs.topBarScaleX?.value || 100) / 100;
  const topScaleY = Number(refs.topBarScaleY?.value || 100) / 100;
  const cardScaleX = Number(refs.scorecardScaleX?.value || 100) / 100;
  const cardScaleY = Number(refs.scorecardScaleY?.value || 100) / 100;
  const cssW = Math.max(320, document.documentElement.clientWidth || window.innerWidth || 430);
  const cssToCanvas = W / cssW;
  const topMoveX = state.overlay.topX * cssToCanvas;
  const topMoveY = state.overlay.topY * cssToCanvas;
  const cardMoveX = state.overlay.cardX * cssToCanvas;
  const cardMoveY = state.overlay.cardY * cssToCanvas;
  const shotMoveX = (state.overlay.shotX||0) * cssToCanvas;
  const shotMoveY = (state.overlay.shotY||0) * cssToCanvas;

  // compact broadcast bar, reference style
  const baseW = Math.min(700, W - 250);
  const logoW = 96;
  const topH = 58;
  const lowerH = 34;
  const scoreW = 62;
  const x = W - 34 - baseW + topMoveX;
  const y = 36 + topMoveY;
  ctx.save();
  ctx.translate(x + baseW, y);
  ctx.scale(topScale*topScaleX, topScale*topScaleY);
  ctx.translate(-baseW, 0);
  ctx.shadowColor='rgba(0,0,0,.30)'; ctx.shadowBlur=18; ctx.shadowOffsetY=8;

  // logo block
  roundRect(ctx,0,0,logoW,topH,8);
  ctx.fillStyle='rgba(0,0,0,.92)'; ctx.fill();
  ctx.shadowColor='transparent';
  if(pxLogoImg.complete && pxLogoImg.naturalWidth){
    ctx.save();
    roundRect(ctx,0,0,logoW,topH,8); ctx.clip();
    ctx.drawImage(pxLogoImg,0,0,logoW,topH);
    ctx.restore();
  }else{
    text(ctx,'Px',logoW/2,topH/2,32,'#fff','1000','center');
  }

  // name bar
  const nameX = logoW;
  const nameW = baseW - logoW;
  roundRect(ctx,nameX,0,nameW,topH,0);
  const ng = ctx.createLinearGradient(nameX,0,nameX+nameW,0);
  ng.addColorStop(0,'rgba(58,58,58,.82)');
  ng.addColorStop(.55,'rgba(48,48,48,.72)');
  ng.addColorStop(1,'rgba(28,28,28,.62)');
  ctx.fillStyle=ng; ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.09)'; ctx.fillRect(nameX,0,nameW,1);
  fitText(ctx,name,nameX+22,topH/2,nameW-scoreW-48,34,'#fff','900');

  // score box
  const sx = baseW - scoreW + 10;
  const sy = 10;
  roundRect(ctx,sx,sy,42,36,7);
  ctx.fillStyle='rgba(0,0,0,.92)'; ctx.fill();
  text(ctx,score,sx+21,sy+18,27,'#fff','1000','center');

  // lower strip: under the name bar only
  const lowerX = logoW;
  const lowerW = nameW;
  roundRect(ctx,lowerX,topH,lowerW,lowerH,0);
  ctx.fillStyle='rgba(24,24,24,.48)'; ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(lowerX,topH); ctx.lineTo(lowerX+lowerW,topH); ctx.stroke();
  const metaY = topH + lowerH/2;
  text(ctx,`HOLE ${h.hole}`,lowerX+22,metaY,17,'rgba(255,255,255,.96)','700');
  text(ctx,`PAR ${h.par}`,lowerX+105,metaY,17,'rgba(255,255,255,.96)','700');
  text(ctx,`${h.yds} YDS`,lowerX+178,metaY,17,'rgba(255,255,255,.96)','700');
  const shotView = getShotView();
  const shotStart = lowerX + 282;
  shotView.forEach((n,i)=>{
    const cx = shotStart + i*26;
    const active = n===Number(state.currentShot);
    ctx.beginPath(); ctx.arc(cx, metaY, active?12:10.5, 0, Math.PI*2);
    if(active){
      ctx.fillStyle='rgba(134,255,95,.94)'; ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.80)'; ctx.lineWidth=1.2; ctx.stroke();
      text(ctx,shotDotText(n),cx,metaY,15,'rgba(0,0,0,.92)','1000','center');
    }else{
      ctx.strokeStyle='rgba(255,255,255,.48)'; ctx.lineWidth=1.4; ctx.stroke();
      text(ctx,shotDotText(n),cx,metaY,13,'rgba(255,255,255,.90)','900','center');
    }
  });
  // v19: old hole-number indicator removed from the top overlay. Only the shot dots remain.
  ctx.restore();

  // compact remaining distance / club pill
  const pillText1 = `残り ${remainingYardsText()}`;
  const pillText2 = `番手 ${clubText()}`;
  ctx.save();
  const pillW = 190, pillH = 44;
  const pillX = W - 32 - pillW + shotMoveX;
  const pillY = 108 + shotMoveY;
  roundRect(ctx,pillX,pillY,pillW,pillH,22);
  ctx.fillStyle='rgba(5,10,9,.58)'; ctx.fill();
  ctx.strokeStyle='rgba(196,255,118,.22)'; ctx.lineWidth=1.2; ctx.stroke();
  text(ctx,'残り',pillX+22,pillY+pillH/2,14,'rgba(255,255,255,.62)','800');
  text(ctx,remainingYardsText(),pillX+68,pillY+pillH/2,23,'#fff','1000');
  ctx.strokeStyle='rgba(196,255,118,.24)'; ctx.beginPath(); ctx.moveTo(pillX+118,pillY+12); ctx.lineTo(pillX+118,pillY+pillH-12); ctx.stroke();
  text(ctx,'番手',pillX+134,pillY+pillH/2,14,'rgba(255,255,255,.62)','800');
  text(ctx,clubText(),pillX+176,pillY+pillH/2,23,'#fff','1000','center');
  ctx.restore();
  if(!refs.showScorecard.checked) return;
  const cardX=30 + cardMoveX, cardY=H-490 + cardMoveY, cardW=W-60, headH=68, rowH=46;
  const cardH = headH+rowH*4+8;
  ctx.save();
  ctx.translate(cardX, cardY + cardH);
  ctx.scale(cardScale*cardScaleX, cardScale*cardScaleY);
  ctx.translate(0, -cardH);
  roundRect(ctx,0,0,cardW,headH+rowH*4+8,30);
  const cg=ctx.createLinearGradient(0,0,0,headH+rowH*4); cg.addColorStop(0,'rgba(62,77,77,.40)'); cg.addColorStop(1,'rgba(14,22,21,.34)'); ctx.fillStyle=cg; ctx.fill(); ctx.clip();
  ctx.fillStyle='rgba(31,43,43,.42)'; ctx.fillRect(0,0,cardW,headH);
  fitText(ctx,refs.courseName.value||'GOLF COURSE',28,headH/2,cardW-180,24,'#fff','900');
  text(ctx,'スコアカード',cardW-30,headH/2,18,'rgba(255,255,255,.88)','900','right');
  const labels=['HOLE','PAR','YDS','SCORE']; const data=[holes[state.side].map(x=>x.hole), holes[state.side].map(x=>x.par), holes[state.side].map(x=>x.yds), holes[state.side].map(x=>x.score||'-')]; const labelW=106, cw=(cardW-labelW)/9;
  for(let r=0;r<4;r++){
    const yy=headH+r*rowH;
    ctx.fillStyle='rgba(255,255,255,.09)'; ctx.fillRect(0,yy,cardW,1);
    text(ctx,labels[r],22,yy+rowH/2,19,'rgba(255,255,255,.90)','1000','left');
    for(let i=0;i<9;i++){
      const xx=labelW+i*cw;
      if(r===0 && i===state.index){ ctx.fillStyle='rgba(255,255,255,.86)'; roundRect(ctx,xx+5,yy+5,cw-10,rowH-10,8); ctx.fill(); text(ctx,data[r][i],xx+cw/2,yy+rowH/2,20,'#111','1000','center'); }
      else { text(ctx,data[r][i],xx+cw/2,yy+rowH/2,r===2?16:21,'rgba(255,255,255,.94)','900','center'); if(r===3 && i===state.index){ ctx.strokeStyle='#86ff5f'; ctx.lineWidth=3; roundRect(ctx,xx+7,yy+6,cw-14,rowH-12,7); ctx.stroke(); } }
    }
  }
  ctx.restore();
}


/* ===== v21 device mode flag ===== */
function syncDesktopCameraMode(){
  const isDesktop = window.matchMedia('(min-width: 761px)').matches;
  document.body.classList.toggle('desktop-camera', isDesktop);
}
syncDesktopCameraMode();
window.addEventListener('resize', syncDesktopCameraMode);
window.addEventListener('orientationchange', syncDesktopCameraMode);

function visibleTracerLoop(){ updateVisibleTracer(); requestAnimationFrame(visibleTracerLoop); }
visibleTracerLoop();

bind(); setupSupport(); applyCourseToHoles({resetIndex:true}); state.index=2; setHoleByIndex(2); updateAll(); loadFirestoreCourseDatabase(); showScreen(refs.home);
