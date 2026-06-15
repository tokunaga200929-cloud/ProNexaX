const STORAGE_KEY = 'pxgolf_course_cards_v1';
const refs = Object.fromEntries(['firebaseState','firebaseBadge','dbModeText','firebaseTestBtn','firebaseSyncBtn','searchInput','courseName','prefecture','rakutenId','address','officialUrl','status','setName','teeName','totalHoles','totalPar','totalYds','aiPaste','csvPaste','csvFile','holeRows','statusText','saveState','currentSetLabel','reviewComment','pvCourse','pvTee','pvHoles','pvPars','pvYds','savedList','savedCount','bulkPreviewControls','previewSetSelect','previewTeeSelect','bulkPreviewSummary'].map(id=>[id,document.getElementById(id)]));
let holes = Array.from({length:18},(_,i)=>({hole:i+1,par:i%9===2?3:(i%9===4?5:4),yds:0,hdcp:''}));
let parsedBulkCourses = [];
let parsedBulkPreview = { courseIndex:0, setId:'', tee:'' };

function norm(s){return String(s||'').trim();}
function slug(s){return norm(s).toLowerCase().replace(/[^a-z0-9ぁ-んァ-ヶ一-龥ー]/gi,'').slice(0,64)||String(Date.now());}
function loadDb(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch(e){return []}}
function saveDb(list){localStorage.setItem(STORAGE_KEY,JSON.stringify(list));renderSaved();}

let firestoreDb = null;
let firestoreReady = false;
function firebaseConfigReady(){
  const cfg = window.PX_FIREBASE_CONFIG || {};
  return !!(cfg.apiKey && cfg.projectId && cfg.appId);
}
function firestoreCollectionName(){ return window.PX_FIRESTORE_SCORECARDS_COLLECTION || 'scorecards'; }
function setFirebaseUi(text, ready=false){
  if(refs.firebaseState) refs.firebaseState.textContent=text;
  if(refs.firebaseBadge) refs.firebaseBadge.textContent = ready ? '◉ Firestore接続済み' : '◉ Firestore未接続';
  if(refs.dbModeText) refs.dbModeText.textContent = ready ? 'Firestore共通DB + 端末内バックアップ' : '端末内DBのみ';
}
function initFirebase(){
  try{
    if(!firebaseConfigReady()){ setFirebaseUi('未設定', false); return false; }
    if(!window.firebase){ setFirebaseUi('SDK未読み込み', false); return false; }
    if(!firebase.apps.length) firebase.initializeApp(window.PX_FIREBASE_CONFIG);
    firestoreDb = firebase.firestore();
    firestoreReady = true;
    setFirebaseUi('接続済み', true);
    return true;
  }catch(e){
    console.warn(e);
    firestoreReady=false;
    setFirebaseUi('接続エラー', false);
    return false;
  }
}
function courseDocId(course){
  // 以前の版では custom-rakuten-90107、途中版では rakuten_90107 で保存していたため、
  // ユーザーがFirestoreで古い18ホール版を見てしまう問題が起きた。
  // ここではアプリ内IDを正にして、同じゴルフ場は必ず同じドキュメントへ上書きする。
  if(norm(course.id)) return norm(course.id);
  const rid = norm(course.rakutenGolfCourseId || '');
  return rid ? `custom-rakuten-${rid}` : slug(course.name || course.golfCourseName || 'course');
}
function courseLegacyDocIds(course){
  const ids = new Set([courseDocId(course)]);
  const rid = norm(course.rakutenGolfCourseId || '');
  if(rid){
    ids.add(`custom-rakuten-${rid}`);
    ids.add(`rakuten_${rid}`);
  }
  ids.add(slug(course.name || course.golfCourseName || 'course'));
  return [...ids].filter(Boolean);
}
function flattenScorecardsForFirestore(course){
  const rows = [];
  (course.sets||[]).forEach(set=>{
    Object.entries(set.tees||{}).forEach(([tee,teeData])=>{
      const out=(teeData.OUT||[]).map((h,i)=>({hole:i+1,par:Number(h.par)||4,yds:Number(h.yds)||0,hdcp:norm(h.hdcp)}));
      const inn=(teeData.IN||[]).map((h,i)=>({hole:i+10,par:Number(h.par)||4,yds:Number(h.yds)||0,hdcp:norm(h.hdcp)}));
      if(out.some(h=>h.yds||h.hdcp)) rows.push({courseName:`${set.name} OUT`, setName:set.name, side:'OUT', tee, holes:out});
      if(inn.some(h=>h.yds||h.hdcp)) rows.push({courseName:`${set.name} IN`, setName:set.name, side:'IN', tee, holes:inn});
    });
  });
  return rows;
}
function firestorePayload(course){
  const stamped = stampCourseSummary(course);
  return {
    ...stamped,
    id: courseDocId(course),
    docVersion: 51,
    scorecards: flattenScorecardsForFirestore(stamped),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    source: course.note || course.source || 'PX GolfCast CMS'
  };
}
async function saveCourseToFirestore(course){
  if(!firestoreReady && !initFirebase()) return false;
  const col = firestoreDb.collection(firestoreCollectionName());
  const canonical = courseDocId(course);
  const batch = firestoreDb.batch();
  courseLegacyDocIds(course).forEach(id=>{
    if(id !== canonical) batch.delete(col.doc(id));
  });
  batch.set(col.doc(canonical), firestorePayload(course));
  await batch.commit();
  return true;
}
async function saveCoursesToFirestore(courses){
  if(!firestoreReady && !initFirebase()) return false;
  const col = firestoreDb.collection(firestoreCollectionName());
  const batch = firestoreDb.batch();
  courses.forEach(course=>{
    const canonical = courseDocId(course);
    courseLegacyDocIds(course).forEach(id=>{
      if(id !== canonical) batch.delete(col.doc(id));
    });
    batch.set(col.doc(canonical), firestorePayload(course));
  });
  await batch.commit();
  return true;
}
async function loadFirestoreCourses(){
  if(!firestoreReady && !initFirebase()) return [];
  const snap = await firestoreDb.collection(firestoreCollectionName()).get();
  return snap.docs.map(d=>({id:d.id, ...d.data()}));
}
async function syncLocalToFirestore(){
  try{
    const db = loadDb();
    if(!db.length){ setStatus('端末内DBに同期するデータがありません。', false); return; }
    await saveCoursesToFirestore(db);
    setStatus(`${db.length}件をFirestoreへ同期しました。`);
  }catch(e){ setStatus('Firestore同期に失敗：'+e.message, false); }
}

function groupHolesForApp(allHoles){
  const out = allHoles.filter(h=>Number(h.hole)<=9).sort((a,b)=>a.hole-b.hole).map(h=>({par:Number(h.par)||4,yds:Number(h.yds)||0,hdcp:norm(h.hdcp)}));
  const inn = allHoles.filter(h=>Number(h.hole)>=10).sort((a,b)=>a.hole-b.hole).map(h=>({par:Number(h.par)||4,yds:Number(h.yds)||0,hdcp:norm(h.hdcp)}));
  while(out.length<9) out.push({par:4,yds:0,hdcp:''});
  while(inn.length<9) inn.push({par:4,yds:0,hdcp:''});
  return {OUT:out.slice(0,9),IN:inn.slice(0,9)};
}


function parseAiJsonText(text){
  let raw = String(text || '').trim();
  if(!raw) throw new Error('貼り付け欄が空です');
  // ChatGPT/Claudeの ```json ... ``` をそのまま貼っても読めるようにする
  raw = raw.replace(/^```(?:json)?\s*/i,'').replace(/```$/,'').trim();
  try{ return JSON.parse(raw); }catch(_){
    // 前後に説明文が混ざった場合でも、最初のJSON object/arrayだけ抜き出す
    const firstObj = raw.indexOf('{');
    const firstArr = raw.indexOf('[');
    let start = -1, end = -1;
    if(firstArr !== -1 && (firstObj === -1 || firstArr < firstObj)){
      start = firstArr; end = raw.lastIndexOf(']');
    }else{
      start = firstObj; end = raw.lastIndexOf('}');
    }
    if(start >= 0 && end > start){
      const sliced = raw.slice(start, end+1);
      return JSON.parse(sliced);
    }
    throw new Error('JSON形式として読み取れません。```json の中身だけ、または { } / [ ] の形で貼ってください。');
  }
}

function normalizeHole(h, idx=0){
  const hole = Number(h?.hole ?? h?.HOLE ?? idx+1) || idx+1;
  const par = h?.par ?? h?.PAR;
  const yds = h?.yds ?? h?.yards ?? h?.YDS ?? h?.yardage;
  const hdcp = h?.hdcp ?? h?.HDCP ?? h?.handicap ?? h?.hcp ?? '';
  return { hole, par: par === null || par === '' || par === undefined ? null : Number(par), yds: yds === null || yds === '' || yds === undefined ? null : Number(yds), hdcp: hdcp === null || hdcp === undefined ? '' : String(hdcp), note:norm(h?.note||'') };
}
function splitCourseNameAndSide(name){
  const raw = norm(name).replace(/　/g,' ').replace(/\s+/g,' ').trim();
  if(/^OUT$/i.test(raw)) return { setName:'OUT / IN', side:'OUT' };
  if(/^IN$/i.test(raw)) return { setName:'OUT / IN', side:'IN' };
  if(raw === 'アウト') return { setName:'OUT / IN', side:'OUT' };
  if(raw === 'イン') return { setName:'OUT / IN', side:'IN' };
  const m = raw.match(/^(.+?)\s*(OUT|IN)$/i);
  if(m) return { setName:norm(m[1]) || 'OUT / IN', side:m[2].toUpperCase() };
  const jm = raw.match(/^(.+?)(アウト|イン)$/);
  if(jm) return { setName:norm(jm[1]) || 'OUT / IN', side:jm[2] === 'アウト' ? 'OUT' : 'IN' };
  return { setName:raw, side:'' };
}
function holesToTeeData(rawHoles, forcedSide=''){
  const clean = (rawHoles||[]).map(normalizeHole).filter(h=>Number.isFinite(Number(h.hole))).sort((a,b)=>a.hole-b.hole);
  const blankSide = () => Array.from({length:9},()=>({par:4,yds:0,hdcp:''}));
  const toNine = (arr) => {
    const a = arr.slice(0,9).map(h=>({par:Number(h.par)||4,yds:Number(h.yds)||0,hdcp:norm(h.hdcp)}));
    while(a.length<9) a.push({par:4,yds:0,hdcp:''});
    return a;
  };
  if(forcedSide === 'OUT') return { OUT:toNine(clean), IN:blankSide() };
  if(forcedSide === 'IN') return { OUT:blankSide(), IN:toNine(clean) };
  const hasTen = clean.some(h=>Number(h.hole)>=10);
  if(hasTen) return groupHolesForApp(clean);
  return { OUT:toNine(clean), IN:blankSide() };
}
function mergeTeeData(a,b){
  const out = (a?.OUT||[]).slice(); const inn=(a?.IN||[]).slice();
  const hasRealValue = (h) => (Number(h?.yds)||0) > 0 || norm(h?.hdcp) || norm(h?.note);
  // 重要：IN側を読み込む時に、空のOUT(Par4/0yds)で既存OUTを上書きしない
  (b?.OUT||[]).forEach((h,i)=>{ if(hasRealValue(h)) out[i]=h; });
  (b?.IN||[]).forEach((h,i)=>{ if(hasRealValue(h)) inn[i]=h; });
  while(out.length<9) out.push({par:4,yds:0,hdcp:''}); while(inn.length<9) inn.push({par:4,yds:0,hdcp:''});
  return {OUT:out.slice(0,9), IN:inn.slice(0,9)};
}
function makeCourseIdFromAi(obj){
  const rid = norm(obj.rakutenGolfCourseId||obj.rakutenId||obj.goraId);
  if(rid) return 'custom-rakuten-' + rid;
  return 'custom-' + slug(obj.golfCourseName||obj.name||obj.courseName||'course');
}
function cleanUrl(value){
  const v = norm(value);
  const md = v.match(/\((https?:\/\/[^)]+)\)/);
  return md ? md[1] : v;
}
function courseStats(course){
  const sets = course?.sets || [];
  let teeCount=0, holeCount=0, scorecardCount=0;
  sets.forEach(set=>{
    Object.values(set.tees||{}).forEach(teeData=>{
      teeCount++;
      const out=(teeData.OUT||[]).filter(h=>Number(h.yds)||norm(h.hdcp));
      const inn=(teeData.IN||[]).filter(h=>Number(h.yds)||norm(h.hdcp));
      if(out.length) scorecardCount++;
      if(inn.length) scorecardCount++;
      holeCount += out.length + inn.length;
    });
  });
  return { setCount:sets.length, teeCount, scorecardCount, holeCount };
}
function stampCourseSummary(course){
  const stats = courseStats(course);
  return { ...course, ...stats, updatedLocalAt:new Date().toISOString() };
}
function normalizeAiJsonToCourses(data){
  const rootItems = Array.isArray(data) ? data : [data];
  const coursesMap = new Map();
  rootItems.forEach((root)=>{
    if(!root) return;
    // すでにアプリDB形式のときはそのまま寄せる
    if(root.name && root.sets){
      const id=root.id||makeCourseIdFromAi({golfCourseName:root.name,rakutenGolfCourseId:root.rakutenGolfCourseId});
      coursesMap.set(id,{...root,id,name:root.name,area:root.area||root.prefecture||'',prefecture:root.prefecture||root.area||'',status:root.status||'公開'});
      return;
    }
    const scorecards = Array.isArray(root.scorecards) && root.scorecards.length ? root.scorecards : [root];
    const baseName = norm(root.golfCourseName||root.name||root.courseName) || norm(scorecards[0]?.golfCourseName||scorecards[0]?.name) || '未設定ゴルフ場';
    const base = {
      id: makeCourseIdFromAi({...root,golfCourseName:baseName}),
      name: baseName,
      area: norm(root.prefecture||root.area),
      prefecture: norm(root.prefecture||root.area),
      address: norm(root.address),
      officialUrl: cleanUrl(root.officialUrl||root.url),
      sourceUrl: cleanUrl(root.sourceUrl||root.officialUrl||root.url),
      rakutenGolfCourseId: norm(root.rakutenGolfCourseId||root.rakutenId||root.goraId),
      status: root.status === 'approved' ? '公開' : (root.status === 'review' ? '確認中' : (root.status || '確認中')),
      note: 'AI一括登録',
      sets: []
    };
    const course = coursesMap.get(base.id) || base;
    scorecards.forEach((sc,idx)=>{
      const rawHoles = sc?.holes || sc?.scorecard || sc?.holeData || [];
      if(!Array.isArray(rawHoles) || !rawHoles.length) return;
      const rawSetName = norm(sc.courseName||sc.setName||sc.course||root.setName||root.courseSetName) || `コース${idx+1}`;
      const split = splitCourseNameAndSide(rawSetName);
      const setName = split.setName || rawSetName;
      const forcedSide = split.side;
      const tee = norm(sc.tee||sc.teeName||root.tee||root.teeName) || 'Regular';
      const teeData = holesToTeeData(rawHoles, forcedSide);
      let set = course.sets.find(s=>norm(s.name)===setName);
      if(!set){ set={id:'set-'+slug(setName), name:setName, tees:{}}; course.sets.push(set); }
      set.tees[tee] = set.tees[tee] ? mergeTeeData(set.tees[tee], teeData) : teeData;
    });
    coursesMap.set(course.id, stampCourseSummary(course));
  });
  return [...coursesMap.values()].map(stampCourseSummary).filter(c=>c.name && c.sets && c.sets.length);
}

function getSelectedBulkCourse(){
  return parsedBulkCourses[parsedBulkPreview.courseIndex] || parsedBulkCourses[0] || null;
}
function applyBulkPreview(){
  const course = getSelectedBulkCourse();
  if(!course) return;
  const setId = refs.previewSetSelect?.value || parsedBulkPreview.setId;
  const set = (course.sets||[]).find(s=>s.id===setId) || (course.sets||[])[0];
  const tee = refs.previewTeeSelect?.value || parsedBulkPreview.tee || Object.keys(set?.tees||{})[0] || 'Regular';
  parsedBulkPreview.setId = set?.id || '';
  parsedBulkPreview.tee = tee;
  const data = set?.tees?.[tee] || {};
  const hs=[...(data.OUT||[]).map((h,i)=>({hole:i+1,...h})),...(data.IN||[]).map((h,i)=>({hole:i+10,...h}))];
  applyCourseLike({...course,golfCourseName:course.name,prefecture:course.area,setName:set?.name,tee,holes:hs});
  if(refs.currentSetLabel) refs.currentSetLabel.textContent = `${set?.name || '-'} - ${tee}`;
}
function renderBulkPreviewControls(courses){
  parsedBulkCourses = courses || [];
  const course = getSelectedBulkCourse();
  if(!refs.bulkPreviewControls) return;
  if(!course || !(course.sets||[]).length){
    refs.bulkPreviewControls.hidden = true;
    return;
  }
  refs.bulkPreviewControls.hidden = false;
  const stats = courseStats(course);
  if(refs.bulkPreviewSummary) refs.bulkPreviewSummary.textContent = `${course.name}：${stats.setCount}コース・${stats.teeCount}ティー・${stats.scorecardCount}枚・${stats.holeCount}ホールを読み込み済み`;
  if(refs.previewSetSelect){
    refs.previewSetSelect.innerHTML = (course.sets||[]).map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
    parsedBulkPreview.setId = parsedBulkPreview.setId || course.sets[0]?.id || '';
    if(!(course.sets||[]).find(s=>s.id===parsedBulkPreview.setId)) parsedBulkPreview.setId = course.sets[0]?.id || '';
    refs.previewSetSelect.value = parsedBulkPreview.setId;
  }
  const set=(course.sets||[]).find(s=>s.id===parsedBulkPreview.setId) || course.sets[0];
  const tees = Object.keys(set?.tees||{});
  if(refs.previewTeeSelect){
    refs.previewTeeSelect.innerHTML = tees.map(t=>`<option value="${t}">${t}</option>`).join('');
    parsedBulkPreview.tee = tees.includes(parsedBulkPreview.tee) ? parsedBulkPreview.tee : (tees[0] || 'Regular');
    refs.previewTeeSelect.value = parsedBulkPreview.tee;
  }
  applyBulkPreview();
}
async function saveBulkCourses(courses){
  if(!courses || !courses.length) throw new Error('保存する一括JSONがありません。');
  let db=loadDb();
  courses.forEach(course=>{
    db=db.filter(c=>!(c.id===course.id || (c.rakutenGolfCourseId&&course.rakutenGolfCourseId&&c.rakutenGolfCourseId===course.rakutenGolfCourseId) || norm(c.name)===norm(course.name)));
    db.push(stampCourseSummary(course));
  });
  saveDb(db.map(stampCourseSummary));
  let firestoreSaved=false;
  try{ if(firestoreReady || initFirebase()){ await saveCoursesToFirestore(courses); firestoreSaved=true; } }catch(e){ console.warn(e); setStatus('端末内DBには保存しましたが、Firestore保存に失敗：'+e.message, false); }
  refs.saveState.textContent='一括保存済み';
  const totalSets=courses.reduce((n,c)=>n+courseStats(c).setCount,0);
  const totalTees=courses.reduce((n,c)=>n+courseStats(c).teeCount,0);
  const totalScorecards=courses.reduce((n,c)=>n+courseStats(c).scorecardCount,0);
  const totalHoles=courses.reduce((n,c)=>n+courseStats(c).holeCount,0);
  setStatus(`${courses.length}件のゴルフ場 / ${totalSets}コース / ${totalTees}ティー / ${totalScorecards}枚 / ${totalHoles}ホールを保存しました。${firestoreSaved?'Firestoreにも保存済みです。Firestoreでは scorecards が20枚、holeCount が180になれば成功です。':'端末内DB保存のみです。'}`);
}

function applyNormalizedCourse(course){
  const set=course.sets?.[0]; const tee=set?Object.keys(set.tees||{})[0]:'Regular'; const data=set?.tees?.[tee]||{};
  const hs=[...(data.OUT||[]).map((h,i)=>({hole:i+1,...h})),...(data.IN||[]).map((h,i)=>({hole:i+10,...h}))];
  applyCourseLike({...course,golfCourseName:course.name,prefecture:course.area,setName:set?.name,tee,holes:hs});
}
async function upsertCourses(courses){
  if(!courses.length) throw new Error('登録できるスコアカードがありません。scorecards配列またはholes配列を確認してください。');
  let db=loadDb();
  courses.forEach(course=>{
    db=db.filter(c=>!(c.id===course.id || (c.rakutenGolfCourseId&&course.rakutenGolfCourseId&&String(c.rakutenGolfCourseId)===String(course.rakutenGolfCourseId)) || norm(c.name)===norm(course.name)));
    db.push(course);
  });
  saveDb(db.map(stampCourseSummary));
  let firestoreSaved=false;
  try{ if(firestoreReady || initFirebase()){ await saveCoursesToFirestore(courses); firestoreSaved=true; } }catch(e){ console.warn(e); setStatus('端末内DBには保存しましたが、Firestore保存に失敗：'+e.message, false); }
  applyNormalizedCourse(courses[0]);
  refs.saveState.textContent='一括保存済み';
  const totalSets=courses.reduce((n,c)=>n+courseStats(c).setCount,0);
  const totalTees=courses.reduce((n,c)=>n+courseStats(c).teeCount,0);
  const totalScorecards=courses.reduce((n,c)=>n+courseStats(c).scorecardCount,0);
  const totalHoles=courses.reduce((n,c)=>n+courseStats(c).holeCount,0);
  setStatus(`${courses.length}件のゴルフ場 / ${totalSets}コース / ${totalTees}ティー / ${totalScorecards}枚 / ${totalHoles}ホールを保存しました。${firestoreSaved?'Firestoreにも保存済みです。Firestoreでは scorecards が20枚、holeCount が180になれば成功です。':'端末内DB保存のみです。'}`);
}
function renderTable(){
  refs.holeRows.innerHTML = holes.map((h,i)=>`<tr><td>${h.hole}</td><td><input data-i="${i}" data-k="par" type="number" min="3" max="6" value="${h.par||''}"></td><td><input data-i="${i}" data-k="yds" type="number" min="0" max="800" value="${h.yds||''}"></td><td><input data-i="${i}" data-k="hdcp" value="${h.hdcp||''}"></td><td><input data-i="${i}" data-k="note" value="${h.note||''}" placeholder="任意"></td></tr>`).join('');
  refs.holeRows.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',e=>{const i=+e.target.dataset.i,k=e.target.dataset.k;holes[i][k]=k==='par'||k==='yds'?Number(e.target.value||0):e.target.value;updateStats();}));
  updateStats();
}
function updateStats(){
  const totalPar=holes.reduce((a,h)=>a+(Number(h.par)||0),0);
  const totalYds=holes.reduce((a,h)=>a+(Number(h.yds)||0),0);
  refs.totalHoles.textContent=holes.length; refs.totalPar.textContent=totalPar||0; refs.totalYds.textContent=totalYds.toLocaleString();
  refs.currentSetLabel.textContent=`${refs.setName.value||'OUT / IN'} - ${refs.teeName.value||'Regular'}`;
  renderPreview();
}
function renderPreview(){
  refs.pvCourse.textContent=refs.courseName.value||'ゴルフ場名'; refs.pvTee.textContent=`${refs.setName.value||'OUT / IN'}  ${refs.teeName.value||'Regular'}`;
  const first9=holes.slice(0,9);
  const row=(label,vals)=>`<span class="label">${label}</span>${vals.map(v=>`<span>${v||'-'}</span>`).join('')}`;
  refs.pvHoles.innerHTML=row('HOLE',first9.map(h=>h.hole)); refs.pvPars.innerHTML=row('PAR',first9.map(h=>h.par)); refs.pvYds.innerHTML=row('YDS',first9.map(h=>h.yds));
}
function setStatus(text,good=true){refs.statusText.textContent=text;refs.statusText.style.borderColor=good?'rgba(156,255,33,.18)':'rgba(255,90,90,.35)';refs.statusText.style.background=good?'rgba(156,255,33,.07)':'rgba(255,90,90,.09)';}
function courseFromCurrent(){
  const name=norm(refs.courseName.value); if(!name) throw new Error('ゴルフ場名が必要です');
  const setName=norm(refs.setName.value)||'OUT / IN'; const tee=norm(refs.teeName.value)||'Regular'; const id=refs.rakutenId.value?`custom-rakuten-${refs.rakutenId.value}`:`custom-${slug(name)}`;
  return {id,name,area:norm(refs.prefecture.value),prefecture:norm(refs.prefecture.value),address:norm(refs.address.value),officialUrl:norm(refs.officialUrl.value),rakutenGolfCourseId:norm(refs.rakutenId.value),status:refs.status.value,note:'CMS一括登録',reviewComment:norm(refs.reviewComment.value),sets:[{id:'set-'+slug(setName),name:setName,tees:{[tee]:groupHolesForApp(holes)}}]};
}
function applyCourseLike(obj){
  refs.courseName.value = norm(obj.golfCourseName||obj.courseName||obj.name||refs.courseName.value);
  refs.prefecture.value = norm(obj.prefecture||obj.area||refs.prefecture.value);
  refs.rakutenId.value = norm(obj.rakutenGolfCourseId||obj.rakutenId||obj.goraId||refs.rakutenId.value);
  refs.address.value = norm(obj.address||refs.address.value);
  refs.officialUrl.value = norm(obj.officialUrl||obj.url||refs.officialUrl.value);
  refs.setName.value = norm(obj.setName||obj.courseSetName||obj.courseNameDetail||obj.courseName2||obj.courseName||obj.set||refs.setName.value||'OUT / IN');
  refs.teeName.value = norm(obj.tee||obj.teeName||refs.teeName.value||'Regular');
  const rawHoles = (obj.holes||obj.scorecard||[]).map((h,idx)=>({hole:Number(h.hole||idx+1),par:Number(h.par||h.PAR||4),yds:Number(h.yds||h.yards||h.YDS||0),hdcp:norm(h.hdcp||h.handicap||h.HDCP||''),note:norm(h.note||'')}));
  if(rawHoles.length){ holes = Array.from({length:18},(_,i)=> rawHoles.find(h=>h.hole===i+1) || {hole:i+1,par:i%9===2?3:(i%9===4?5:4),yds:0,hdcp:''}); }
  renderTable(); setStatus(`${refs.courseName.value} のデータを読み込みました。確認して保存してください。`);
}
function parseJson(){
  try{
    const data=parseAiJsonText(refs.aiPaste.value);
    const courses=normalizeAiJsonToCourses(data);
    if(!courses.length) throw new Error('登録できるスコアカードがありません。scorecards配列またはholes配列を確認してください。');
    parsedBulkPreview = { courseIndex:0, setId:'', tee:'' };
    renderBulkPreviewControls(courses);
    refs.saveState.textContent='確認中';
    { const totalScorecards=courses.reduce((n,c)=>n+courseStats(c).scorecardCount,0); const totalHoles=courses.reduce((n,c)=>n+courseStats(c).holeCount,0); setStatus(`${courses.length}件のゴルフ場 / ${totalScorecards}枚 / ${totalHoles}ホールを確認しました。問題なければ「JSONをDBに一括保存」を押してください。`); }
  }catch(e){setStatus('JSONを読み込めません：'+e.message,false)}
}
async function bulkSaveJson(){
  try{
    const data=parseAiJsonText(refs.aiPaste.value);
    const courses=normalizeAiJsonToCourses(data);
    await upsertCourses(courses);
  }catch(e){setStatus('一括保存できません：'+e.message,false)}
}
function splitCsvLine(line){const out=[];let cur='',q=false;for(let i=0;i<line.length;i++){const c=line[i]; if(c==='"'){ if(q&&line[i+1]==='"'){cur+='"';i++;} else q=!q; } else if(c===','&&!q){out.push(cur);cur='';} else cur+=c;} out.push(cur); return out.map(s=>s.trim());}
function parseCsvText(txt){
  const lines=txt.replace(/^\ufeff/,'').split(/\r?\n/).filter(l=>l.trim()); if(lines.length<2) throw new Error('CSVが空です');
  const headers=splitCsvLine(lines[0]).map(h=>h.trim());
  const rows=lines.slice(1).map(l=>{const vals=splitCsvLine(l); return Object.fromEntries(headers.map((h,i)=>[h,vals[i]||'']));});
  const first=rows[0];
  const obj={golfCourseName:first.courseName||first.golfCourseName||first.name,prefecture:first.prefecture||first.area,rakutenGolfCourseId:first.rakutenGolfCourseId||first.rakutenId,setName:first.setName||first.courseSetName||'OUT / IN',tee:first.tee||first.teeName||'Regular',holes:rows.map(r=>({hole:+(r.hole||r.HOLE),par:+(r.par||r.PAR),yds:+(r.yds||r.YDS||r.yards),hdcp:r.hdcp||r.HDCP||''}))};
  applyCourseLike(obj);
}
async function saveCurrent(){
  try{
    if(parsedBulkCourses && parsedBulkCourses.length){ await saveBulkCourses(parsedBulkCourses); return; }
    // 画面のスコアカード入力欄は確認用なので18ホールしか表示しない。
    // JSON貼り付け欄に一括データが残っている場合は、表示中の18ホールではなくJSON全部を保存する。
    if(norm(refs.aiPaste?.value)){
      try{
        const data=parseAiJsonText(refs.aiPaste.value);
        const courses=normalizeAiJsonToCourses(data);
        if(courses.length){ await saveBulkCourses(courses); return; }
      }catch(_){ /* 通常の手入力保存へ進む */ }
    }
    const course=courseFromCurrent(); let db=loadDb().filter(c=>!(c.id===course.id || (c.rakutenGolfCourseId&&course.rakutenGolfCourseId&&c.rakutenGolfCourseId===course.rakutenGolfCourseId) || norm(c.name)===norm(course.name))); db.push(course); saveDb(db); try{ if(firestoreReady || initFirebase()) await saveCourseToFirestore(course); }catch(e){ console.warn(e); setStatus('端末内DBには保存しましたが、Firestore保存に失敗：'+e.message, false); return; } refs.saveState.textContent='保存済み'; setStatus(`${course.name} / ${course.sets[0].name} / ${Object.keys(course.sets[0].tees)[0]} をPX GolfCast DBに保存しました。Firestore接続済みなら共通DBにも保存されています。`);}
  catch(e){setStatus(e.message,false)}
}
function renderSaved(){
  const db=loadDb();
  refs.savedCount.textContent=`${db.length}件`;
  refs.savedList.innerHTML=db.length?db.map((c,i)=>{
    const stats=courseStats(c);
    const setNames=(c.sets||[]).map(s=>s.name).join(' / ') || '-';
    const teeNames=[...new Set((c.sets||[]).flatMap(s=>Object.keys(s.tees||{})))].join(', ') || '-';
    return `<div class="saved-item"><b>${c.name||'名称なし'}</b><span>${c.area||c.prefecture||'-'} / GORA: ${c.rakutenGolfCourseId||'-'}</span><span>${setNames} / ${teeNames}</span><span>${stats.setCount}コース・${stats.teeCount}ティー・${stats.scorecardCount}枚・${stats.holeCount}ホール</span><button data-i="${i}">読み込む</button></div>`;
  }).join(''):'<div class="muted">まだ保存済みDBはありません。</div>';
  refs.savedList.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{const c=loadDb()[+btn.dataset.i]; const set=c.sets?.[0], tee=set?Object.keys(set.tees||{})[0]:'Regular', data=set?.tees?.[tee]||{}; const hs=[...(data.OUT||[]).map((h,i)=>({hole:i+1,...h})),...(data.IN||[]).map((h,i)=>({hole:i+10,...h}))]; applyCourseLike({...c,golfCourseName:c.name,prefecture:c.area,setName:set?.name,tee,holes:hs});}));
}
function exportJson(){const blob=new Blob([JSON.stringify(loadDb(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='pronexa-scorecards-db.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
function sampleJson(){refs.aiPaste.value=JSON.stringify({golfCourseName:'PXカントリークラブ',prefecture:'千葉県',rakutenGolfCourseId:'123456',sourceUrl:'https://example.com/scorecard',status:'review',scorecards:[{courseName:'OUT',tee:'Regular',holes:[{hole:1,par:5,yds:534,hdcp:9},{hole:2,par:4,yds:390,hdcp:11},{hole:3,par:3,yds:175,hdcp:17},{hole:4,par:4,yds:405,hdcp:7},{hole:5,par:4,yds:424,hdcp:1},{hole:6,par:5,yds:555,hdcp:3},{hole:7,par:3,yds:200,hdcp:15},{hole:8,par:4,yds:410,hdcp:13},{hole:9,par:4,yds:425,hdcp:5}]},{courseName:'IN',tee:'Regular',holes:[{hole:10,par:4,yds:402,hdcp:10},{hole:11,par:5,yds:545,hdcp:4},{hole:12,par:3,yds:188,hdcp:16},{hole:13,par:4,yds:421,hdcp:2},{hole:14,par:4,yds:398,hdcp:8},{hole:15,par:5,yds:552,hdcp:6},{hole:16,par:3,yds:176,hdcp:18},{hole:17,par:4,yds:432,hdcp:12},{hole:18,par:4,yds:446,hdcp:14}]}]},null,2)}
function sampleCsv(){refs.csvPaste.value='courseName,prefecture,rakutenGolfCourseId,setName,tee,hole,par,yds,hdcp\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,1,5,534,9\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,2,4,390,11\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,3,3,175,17\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,4,4,405,7\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,5,4,424,1\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,6,5,555,3\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,7,3,200,15\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,8,4,410,13\nPXカントリークラブ,千葉県,123456,OUT / IN,Regular,9,4,425,5';}
initFirebase();
refs.firebaseTestBtn?.addEventListener('click', async()=>{ try{ if(!initFirebase()){ setStatus('Firebase未設定です。firebase-config.js に設定を入れてください。', false); return; } const list=await loadFirestoreCourses(); setStatus(`Firebase接続OK。Firestoreに${list.length}件あります。`); }catch(e){ setStatus('Firebase接続エラー：'+e.message, false); } });
refs.firebaseSyncBtn?.addEventListener('click', syncLocalToFirestore);
refs.previewSetSelect?.addEventListener('change',()=>{ parsedBulkPreview.setId=refs.previewSetSelect.value; parsedBulkPreview.tee=''; renderBulkPreviewControls(parsedBulkCourses); });
refs.previewTeeSelect?.addEventListener('change',()=>{ parsedBulkPreview.tee=refs.previewTeeSelect.value; applyBulkPreview(); });
document.getElementById('parseJsonBtn').addEventListener('click',parseJson);document.getElementById('bulkSaveJsonBtn').addEventListener('click',bulkSaveJson);document.getElementById('sampleJsonBtn').addEventListener('click',sampleJson);document.getElementById('sampleCsvBtn').addEventListener('click',sampleCsv);document.getElementById('parseCsvBtn').addEventListener('click',()=>{try{parseCsvText(refs.csvPaste.value)}catch(e){setStatus('CSVを読み込めません：'+e.message,false)}});document.getElementById('csvFile').addEventListener('change',async e=>{const f=e.target.files?.[0]; if(!f)return; refs.csvPaste.value=await f.text(); try{parseCsvText(refs.csvPaste.value)}catch(err){setStatus('CSVを読み込めません：'+err.message,false)}});document.getElementById('saveBtn').addEventListener('click',saveCurrent);document.getElementById('approveBtn').addEventListener('click',()=>{refs.status.value='公開';saveCurrent();});document.getElementById('exportBtn').addEventListener('click',exportJson);document.getElementById('clearDraftBtn').addEventListener('click',()=>{refs.aiPaste.value='';refs.csvPaste.value='';holes=Array.from({length:18},(_,i)=>({hole:i+1,par:i%9===2?3:(i%9===4?5:4),yds:0,hdcp:''}));renderTable();setStatus('入力をクリアしました。');});document.getElementById('fillParBtn').addEventListener('click',()=>{holes=holes.map((h,i)=>({...h,par:i%9===2?3:(i%9===4?5:4)}));renderTable();});document.querySelectorAll('#setChips button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#setChips button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');refs.setName.value=btn.dataset.set;updateStats();}));['courseName','prefecture','rakutenId','address','officialUrl','setName','teeName'].forEach(id=>document.getElementById(id).addEventListener('input',updateStats));refs.searchInput.addEventListener('input',()=>{const q=norm(refs.searchInput.value).toLowerCase();document.querySelectorAll('.saved-item').forEach(el=>el.style.display=el.innerText.toLowerCase().includes(q)?'block':'none')});renderTable();renderSaved();
