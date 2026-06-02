/* ════════════════════════════════════════════════════════════
   SHEETS LOADER — Google スプレッドシートからデータを取得して
                   WORKS / BOARDGAME をオーバーライドする
   ════════════════════════════════════════════════════════════ */
(function () {
  if (typeof SHEETS_CONFIG === 'undefined' ||
      (!SHEETS_CONFIG.worksUrl && !SHEETS_CONFIG.boardgameUrl &&
       !SHEETS_CONFIG.newsUrl  && !SHEETS_CONFIG.settingsUrl && !SHEETS_CONFIG.profileUrl)) {
    document.dispatchEvent(new Event('sheetsReady'));
    return;
  }

  /* Google Drive 共有URL → 直接表示URL に変換
     https://drive.google.com/file/d/FILE_ID/view  →  lh3.googleusercontent.com/d/FILE_ID */
  function driveUrl(raw) {
    const m = raw.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return m ? 'https://lh3.googleusercontent.com/d/' + m[1] : raw;
  }

  /* RFC 4180 準拠の CSV 1行パーサー */
  function parseLine(line) {
    const fields = [];
    let f = '', q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '\r') continue;
      if (q) {
        if (c === '"' && line[i + 1] === '"') { f += '"'; i++; }
        else if (c === '"') { q = false; }
        else { f += c; }
      } else {
        if (c === '"') { q = true; }
        else if (c === ',') { fields.push(f); f = ''; }
        else { f += c; }
      }
    }
    fields.push(f);
    return fields;
  }

  /* CSV テキスト → データ配列
     スプレッドシートの1行目をヘッダーとして読み込む

     WORKS 列:     num / name / nameEn / type / year / role / tool / link / img / href / desc / descEn / detail / detailEn / pickup
     BOARDGAME 列: num / name / nameEn / year / role / category / tool / link / img / href / desc / descEn / detail / detailEn / pickup

     detail / detailEn : 段落を | で区切る（例: "段落1|段落2|段落3"）
     category          : 複数カテゴリは | で区切る（例: "GameDesign|Artwork"）
     img               : Google Drive 共有URLをそのまま貼れば自動変換
     pickup            : TRUE / true / 1 のいずれかで有効
  */
  function parseCSV(text, kind) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return null;

    const headers = parseLine(lines[0]).map(h => h.trim());
    const galleryIdx = headers.indexOf('gallery');

    const rows = lines.slice(1).map(line => {
      const vals = parseLine(line);
      const obj  = {};
      headers.forEach((h, i) => { if (h) obj[h] = (vals[i] ?? '').trim(); });

      /* GOOGLETRANSLATE エラー (#VALUE!) → 空文字扱い */
      Object.keys(obj).forEach(k => { if (obj[k] === '#VALUE!') obj[k] = ''; });

      /* bool */
      obj.pickup = obj.pickup === 'TRUE' || obj.pickup === 'true' || obj.pickup === '1';

      /* 段落配列 (| 区切り) */
      ['detail', 'detailEn'].forEach(k => {
        if (obj[k]) obj[k] = obj[k].split('|').map(s => s.trim()).filter(Boolean);
        else        delete obj[k];
      });

      /* boardgame category (| 区切り) */
      if (kind === 'boardgame' && obj.category) {
        const cats = obj.category.split('|').map(s => s.trim()).filter(Boolean);
        obj.category = cats.length === 1 ? cats[0] : cats.length > 1 ? cats : undefined;
      }

      /* Google Drive URL → 直接表示URL */
      if (obj.img && obj.img.includes('drive.google.com')) {
        obj.img = driveUrl(obj.img);
      }

      /* gallery: gallery列以降の全列を収集（複数列・| 区切りどちらも対応） */
      if (galleryIdx >= 0) {
        const galleryUrls = vals.slice(galleryIdx)
          .map(s => (s ?? '').trim())
          .filter(s => s && s !== '#VALUE!')
          .flatMap(s => s.includes('|') ? s.split('|').map(u => u.trim()) : [s])
          .filter(Boolean)
          .map(s => s.includes('drive.google.com') ? driveUrl(s) : s);
        if (galleryUrls.length) obj.gallery = galleryUrls;
        else delete obj.gallery;
      } else {
        delete obj.gallery;
      }

      /* img が空なら gallery の先頭をサムネイルとして使う */
      if (!obj.img && obj.gallery && obj.gallery.length) {
        obj.img = obj.gallery[0];
      }

      return obj;
    }).filter(o => o.num || o.date);

    return rows.length ? rows : null;
  }

  /* SETTINGS シートパーサー（1行目: ヘッダー, 2行目: 値）
     profileImg : プロフィール写真の Google Drive 共有URL
     loaderImg  : ローダー画像の Google Drive 共有URL（以降の列も自動収集）
  */
  function parseSettings(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return null;

    const headers = parseLine(lines[0]).map(h => h.trim());
    const vals    = parseLine(lines[1]);

    const settings = {};

    const profileIdx = headers.indexOf('profileImg');
    if (profileIdx >= 0) {
      let v = (vals[profileIdx] ?? '').trim();
      if (v === '#VALUE!') v = '';
      if (v) settings.profileImg = v.includes('drive.google.com') ? driveUrl(v) : v;
    }

    function strField(key) {
      const i = headers.indexOf(key);
      return i >= 0 ? (vals[i] ?? '').trim().replace(/#VALUE!/g, '') : '';
    }

    const pName = strField('profileName');
    if (pName) settings.profileName = pName;

    const pRole = strField('profileRole');
    if (pRole) settings.profileRole = pRole;

    const pBio = strField('profileBio');
    if (pBio) settings.profileBio = pBio.split('|').map(s => s.trim()).filter(Boolean);

    const pBioEn = strField('profileBioEn');
    if (pBioEn) settings.profileBioEn = pBioEn.split('|').map(s => s.trim()).filter(Boolean);

    const loaderIdx = headers.indexOf('loaderImg');
    if (loaderIdx >= 0) {
      const loaderUrls = vals.slice(loaderIdx)
        .map(s => (s ?? '').trim())
        .filter(s => s && s !== '#VALUE!')
        .flatMap(s => s.includes('|') ? s.split('|').map(u => u.trim()) : [s])
        .filter(Boolean)
        .map(s => s.includes('drive.google.com') ? driveUrl(s) : s);
      if (loaderUrls.length) settings.loaderImgs = loaderUrls;
    }

    return Object.keys(settings).length ? settings : null;
  }

  /* 8秒以内にデータが取得できなければローカルデータで描画 */
  const fallbackTimer = setTimeout(() => {
    document.dispatchEvent(new Event('sheetsReady'));
  }, 8000);

  /* ブラウザキャッシュを回避するためタイムスタンプを付与 */
  function bustCache(url) {
    return url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now();
  }

  function fetchCsv(url) {
    return url
      ? fetch(bustCache(url), { cache: 'no-store' }).then(r => r.ok ? r.text() : null).catch(() => null)
      : Promise.resolve(null);
  }

  Promise.all([
    fetchCsv(SHEETS_CONFIG.worksUrl),
    fetchCsv(SHEETS_CONFIG.boardgameUrl),
    fetchCsv(SHEETS_CONFIG.newsUrl),
    fetchCsv(SHEETS_CONFIG.settingsUrl),
    fetchCsv(SHEETS_CONFIG.profileUrl),
  ]).then(function ([worksCsv, bgCsv, newsCsv, settingsCsv, profileCsv]) {
    if (worksCsv) {
      const data = parseCSV(worksCsv, 'works');
      if (data) WORKS = data;
    }
    if (bgCsv) {
      const data = parseCSV(bgCsv, 'boardgame');
      if (data) BOARDGAME = data;
    }
    if (newsCsv) {
      const data = parseCSV(newsCsv, 'news');
      if (data) NEWS = data.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    }
    if (settingsCsv) {
      const data = parseSettings(settingsCsv);
      if (data) window.SITE_SETTINGS = Object.assign(window.SITE_SETTINGS || {}, data);
    }
    if (profileCsv) {
      const data = parseSettings(profileCsv);
      if (data) window.SITE_SETTINGS = Object.assign(window.SITE_SETTINGS || {}, data);
    }
  }).catch(function () {
    /* ネットワークエラー → ローカルデータで続行 */
  }).finally(function () {
    clearTimeout(fallbackTimer);
    document.dispatchEvent(new Event('sheetsReady'));
  });
})();
