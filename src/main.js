/* ════════════════════════════════════════════════════════════
   PORTFOLIO — main.js
   ════════════════════════════════════════════════════════════ */

/* ── Site config ─────────────────────────────────────────────
   ここだけ変更するとヘッダー・フッター・タイトルに全ページ反映されます
*/
const SITE = {
  name: 'doodles9150',
  year: '2026',
  /* SNS リンク — URL を入力するとアイコンが表示されます。非表示にしたい場合は '' にしてください */
  sns: {
    x:         'https://x.com/doodles_giso',
    instagram: 'https://www.instagram.com/doodles9150',
    note:  'https://note.com/doodles9150',
    booth:     'https://doodlegames.booth.pm/',
  },
};

(function applySiteConfig() {
  document.querySelectorAll('.header__logo').forEach(el => {
    el.textContent = SITE.name;
  });
  document.querySelectorAll('.footer span:first-child').forEach(el => {
    el.textContent = `© ${SITE.year} ${SITE.name}`;
  });
  if (document.title.includes('YOUR_NAME')) {
    document.title = document.title.replace(/YOUR_NAME/g, SITE.name);
  }

  const SNS_ICONS = {
    x:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    instagram:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>`,
    facebook:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>`,
    note:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v-2H8zm0-4h8v-2H8zm0-4h3v-2H8z"/></svg>`,
    booth:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9-1a2 2 0 0 1 4 0v1h-4zM5 9h14v11H5z"/></svg>`,
  };

  document.querySelectorAll('.header__lang').forEach(langBtn => {
    if (langBtn.previousElementSibling?.classList.contains('header__sns')) return;
    const sns = document.createElement('div');
    sns.className = 'header__sns';
    sns.innerHTML = Object.entries(SITE.sns)
      .filter(([, url]) => url)
      .map(([key, url]) =>
        `<a class="header__sns-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${key}">
           ${SNS_ICONS[key] || ''}
         </a>`)
      .join('');
    langBtn.parentElement.insertBefore(sns, langBtn);
  });
})();

/* ── Type badge helpers ──────────────────────────────────────── */
function workTypeBadges(type) {
  if (!type) return '';
  const types = Array.isArray(type) ? type : [type];
  return types.map(t => `<span class="work-card__type" data-type="${t}">${t}</span>`).join('');
}
function typeLabel(type) {
  if (!type) return '';
  return Array.isArray(type) ? type.join(' / ') : type;
}

/* ── Language ────────────────────────────────────────────────── */
let _lang = localStorage.getItem('lang') || 'ja';

function currentLang() { return _lang; }

function applyLang(lang) {
  _lang = lang;
  document.documentElement.lang = lang;

  /* static text: data-ja / data-en */
  document.querySelectorAll('[data-ja]').forEach(el => {
    el.textContent = lang === 'en' ? (el.dataset.en || el.dataset.ja) : el.dataset.ja;
  });

  /* placeholder: data-ja-ph / data-en-ph */
  document.querySelectorAll('[data-ja-ph]').forEach(el => {
    el.placeholder = lang === 'en' ? (el.dataset.enPh || el.dataset.jaPh) : el.dataset.jaPh;
  });

  /* innerHTML (リンク混じりのテキストなど): data-ja-html / data-en-html */
  document.querySelectorAll('[data-en-html]').forEach(el => {
    el.innerHTML = lang === 'en' ? el.dataset.enHtml : el.dataset.jaHtml;
  });

  /* lang toggle button label */
  document.querySelectorAll('.header__lang').forEach(btn => {
    btn.textContent = lang === 'ja' ? 'EN' : 'JP';
  });

  /* work / news detail の再描画 */
  renderWorkDetail();
  renderNewsDetail();

  /* dynamic content の再描画 */
  if (typeof _renderNewsPage === 'function') {
    _renderNewsPage();
  } else {
    const newsEl = document.getElementById('js-news-list');
    if (newsEl && typeof NEWS !== 'undefined') {
      const isCard = newsEl.classList.contains('news-card-grid');
      newsEl.innerHTML = NEWS.slice(0, 3).map(isCard ? newsCardHTML : newsItemHTML).join('');
    }
  }

  const worksGrid = document.querySelector('.top-works-grid');
  if (worksGrid && typeof WORKS !== 'undefined') renderWorkCards(worksGrid, w => w.type !== 'Boardgame');

  const boardgameGrid = document.querySelector('.boardgame-card-grid');
  if (boardgameGrid && typeof BOARDGAME !== 'undefined') {
    const activeFilter = document.querySelector('#js-bg-filter .type-filter__btn.is-active')?.dataset.filter;
    renderBoardgameCardGrid(boardgameGrid, activeFilter);
  }

  /* boardgame detail の再描画 */
  renderBoardgameDetail();

  /* related items の再描画 */
  renderRelatedItems();

  /* プロフィール bio の言語切替 */
  applyProfileBio(lang);
}

function applyProfileBio(lang) {
  if (!window.SITE_SETTINGS?.profileBio) return;
  const bioEl = document.querySelector('.profile-bio');
  if (!bioEl) return;
  const paras = (lang === 'en' && window.SITE_SETTINGS.profileBioEn?.length)
    ? window.SITE_SETTINGS.profileBioEn
    : window.SITE_SETTINGS.profileBio;
  bioEl.innerHTML = paras.map(p => `<p>${p}</p>`).join('');
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLang(lang);
}

/* ── Page Transition ────────────────────────────────────────── */
(function () {
  const SS_KEY = 'pt';

  function makeOverlay() {
    const ov = document.createElement('div');
    ov.id = 'js-pt-overlay';
    const bar = document.createElement('div');
    bar.id = 'js-pt-bar';
    ov.appendChild(bar);
    document.body.appendChild(ov);
    return { ov, bar };
  }

  /* 新しいページに着地したとき: 即フェードアウト（データオーバーレイが進捗を担う） */
  if (sessionStorage.getItem(SS_KEY)) {
    sessionStorage.removeItem(SS_KEY);
    const { ov } = makeOverlay();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ov.classList.add('is-out');
      setTimeout(() => ov.remove(), 300);
    }));
  }

  /* リンククリック時: 白いオーバーレイを表示 */
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    const href = a.getAttribute('href');
    if (!href || /^(https?:\/\/|mailto:|tel:|javascript:|#)/.test(href)) return;

    sessionStorage.setItem(SS_KEY, '1');
    makeOverlay();
  });
})();

/* ── Loader ─────────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('js-loader');
  if (!loader) return;

  const app = document.getElementById('app');

  /* リロード時はフラグをクリアしてローダーを再表示させる */
  const isReload = performance.navigation?.type === 1 ||
                   performance.getEntriesByType?.('navigation')?.[0]?.type === 'reload';
  if (isReload) sessionStorage.removeItem('loaderShown');

  /* 同一セッション内でページ遷移して戻った場合はスキップ */
  if (sessionStorage.getItem('loaderShown')) {
    loader.remove();
    if (app) { app.style.opacity = '1'; app.style.transform = 'none'; }
    return;
  }

  const bar     = loader.querySelector('.loader__bar');
  const pctEl   = loader.querySelector('.loader__pct');
  const wrap    = loader.querySelector('.loader__circle-wrap');
  const imgEl   = loader.querySelector('.loader__img');
  const bloomEl = loader.querySelector('.loader__bloom');
  const C      = 251.33; /* stroke-dasharray: 2π × 40 */

  /* ローダー画像を自動検出 (01〜09, jpg/jpeg/png/gif/webp 対応) — srcのセットは showImg() に一本化 */
  let _localLoaderImgs = [];
  if (imgEl) {
    const LOADER_BASE = './assets/profile/loader';
    const LOADER_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const found = {};
    let pending = 9 * LOADER_EXTS.length;
    const finish = () => {
      _localLoaderImgs = Array.from({length: 9}, (_, i) => found[String(i + 1).padStart(2, '0')]).filter(Boolean);
    };
    for (let i = 1; i <= 9; i++) {
      const num = String(i).padStart(2, '0');
      for (const ext of LOADER_EXTS) {
        const probe = new Image();
        probe.onload  = () => { if (!found[num]) found[num] = `${LOADER_BASE}/${num}.${ext}`; if (!--pending) finish(); };
        probe.onerror = () => { if (!--pending) finish(); };
        probe.src = `${LOADER_BASE}/${num}.${ext}`;
      }
    }
  }
  let   pct    = 0;

  if (app) { app.style.opacity = '0'; app.style.transform = 'translateY(40px)'; }

  function noScroll() { window.scrollTo(0, 0); }
  window.addEventListener('scroll', noScroll);

  function tick() {
    pct = Math.min(100, pct + Math.max(0.6, (100 - pct) * 0.042));
    bar.style.strokeDashoffset = C * (1 - pct / 100);
    pctEl.textContent = Math.floor(pct) + '%';
    if (pct < 100) {
      setTimeout(tick, 28);
    } else {
      pctEl.textContent = '100%';
      setTimeout(() => {
        pctEl.style.transition = 'opacity 0.2s';
        pctEl.style.opacity    = '0';
        const checkSvg = loader.querySelector('.loader__check-svg');
        if (checkSvg) checkSvg.classList.add('is-drawn');
        setTimeout(showImg, 750);
      }, 400);
    }
  }

  function showImg() {
    /* シート画像を優先、なければローカル画像 — ここで1度だけ src をセット */
    const imgs = window.SITE_SETTINGS?.loaderImgs?.length
      ? window.SITE_SETTINGS.loaderImgs
      : _localLoaderImgs;
    if (imgs.length) imgEl.src = imgs[Math.floor(Math.random() * imgs.length)];
    wrap.style.opacity = '0';
    setTimeout(() => {
      wrap.style.display = 'none';
      imgEl.classList.add('is-visible');    /* spring アニメーション開始 (0.45s) */
      if (bloomEl) bloomEl.classList.add('is-visible'); /* 白円も同じ spring で発火 */

      /* spring 完了 (450ms) + 1秒表示してからフェードアウト */
      setTimeout(() => {
        /* 画像リセット */
        imgEl.style.animation  = 'none';
        imgEl.style.transform  = 'scale(1)';
        imgEl.style.opacity    = '1';
        void imgEl.offsetWidth;
        imgEl.style.transition = 'opacity 0.6s ease';
        imgEl.style.opacity    = '0';

        /* bloom も同タイミングでフェードアウト */
        if (bloomEl) {
          bloomEl.style.animation  = 'none';
          bloomEl.style.transform  = 'scale(1)';
          bloomEl.style.opacity    = '1';
          void bloomEl.offsetWidth;
          bloomEl.style.transition = 'opacity 0.6s ease';
          bloomEl.style.opacity    = '0';
        }

        setTimeout(() => {
          window.removeEventListener('scroll', noScroll);
          if (app) {
            app.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            app.style.opacity    = '1';
            app.style.transform  = 'translateY(0)';
          }
          setTimeout(() => {
            loader.style.transition = 'opacity 0.4s ease';
            loader.style.opacity    = '0';
            setTimeout(() => {
              loader.remove();
              sessionStorage.setItem('loaderShown', '1');
              document.dispatchEvent(new CustomEvent('loaderDone'));
            }, 400);
          }, 500);
        }, 600);
      }, 1500); /* spring (450ms) + 1s表示 */
    }, 400);
  }

  setTimeout(tick, 120);
})();

/* ── Data Loading Overlay ────────────────────────────────────
   - sheetsReady が 80ms 以内に来た場合はオーバーレイを表示しない
   - それ以降は表示し、sheetsProgress で実進捗をバーに反映する
   ────────────────────────────────────────────────────────── */
(function () {
  if (document.getElementById('js-loader')) return;

  if (!document.querySelector(
    '.top-works-grid, .boardgame-card-grid, .news-card-grid, .news-list, [data-work-num], [data-boardgame-num]'
  )) return;

  let ov = null, bar = null, done = false, pct = 0;

  function showOverlay() {
    if (done || ov) return;
    ov  = document.createElement('div');
    ov.id = 'js-data-overlay';
    bar = document.createElement('div');
    bar.id = 'js-data-bar';
    ov.appendChild(bar);
    document.body.appendChild(ov);
    requestAnimationFrame(function () {
      bar.style.transition = 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      bar.style.width = pct + '%';
    });
  }

  function hideOverlay() {
    done = true;
    if (!ov) return;
    bar.style.transition = 'width 0.15s ease';
    bar.style.width = '100%';
    setTimeout(function () {
      ov.classList.add('is-out');
      setTimeout(function () { ov.remove(); }, 420);
    }, 100);
  }

  /* キャッシュヒット時は sheetsReady が ~0ms で来るのでオーバーレイを作らない */
  const showTimer = setTimeout(showOverlay, 80);

  document.addEventListener('sheetsProgress', function (e) {
    pct = Math.round((e.detail.loaded / e.detail.total) * 100);
    if (bar) {
      bar.style.transition = 'width 0.35s ease';
      bar.style.width = pct + '%';
    }
  });

  document.addEventListener('sheetsReady', function () {
    clearTimeout(showTimer);
    hideOverlay();
  }, { once: true });
})();

/* ── Clock ──────────────────────────────────────────────────── */
const clockEl = document.getElementById('js-clock');

function tickClock() {
  if (!clockEl) return;
  const d = new Date();
  clockEl.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map(n => String(n).padStart(2, '0')).join(':');
}
tickClock();
setInterval(tickClock, 1000);

/* Build date */
const buildEl = document.getElementById('js-build-date');
if (buildEl) buildEl.textContent = new Date().toISOString().slice(0, 10);

/* ── Slideshow ──────────────────────────────────────────────── */
class Slideshow {
  #el;
  #track;
  #slides;
  #counterEl;
  #progressEl;
  #numEl;
  #nameEl;
  #typeEl;

  #total;
  #current = 0;
  #interval;
  #timer = null;
  #cloneEl = null;
  #isAnimating = false;

  static #REEL_MS = 180;
  static #SLIDE_MS = 850;

  constructor(el, interval = 4000) {
    this.#el           = el;
    this.#track        = el.querySelector('.slideshow__track');
    this.#slides       = el.querySelectorAll('.slideshow__slide:not([data-clone])');
    this.#cloneEl      = el.querySelector('[data-clone]');
    this.#counterEl    = el.querySelector('.slideshow__counter');
    this.#progressEl   = el.querySelector('.slideshow__progress');
    this.#numEl        = el.querySelector('#js-slide-num');
    this.#nameEl       = el.querySelector('#js-slide-name');
    this.#typeEl       = el.querySelector('#js-slide-type');
    this.#total        = this.#slides.length;
    this.#interval     = interval;

    if (this.#progressEl) {
      this.#progressEl.style.setProperty('--slide-interval', `${interval}ms`);
    }

    el.querySelector('.slideshow__prev')
      ?.addEventListener('click', () => this.prev());
    el.querySelector('.slideshow__next')
      ?.addEventListener('click', () => this.next());

    el.addEventListener('mouseenter', () => this.#stopTimer());
    el.addEventListener('mouseleave', () => this.#startTimer());

    this.#slides.forEach(slide => {
      const fig = slide.querySelector('.slideshow__fig');
      if (!fig) return;

      const overlay = document.createElement('div');
      overlay.className = 'slideshow__fig-overlay';
      overlay.innerHTML =
        `<span class="slideshow__fig-overlay__title">${slide.dataset.name ?? ''}</span>` +
        `<span class="slideshow__fig-overlay__cta">VIEW →</span>`;
      fig.appendChild(overlay);

      fig.addEventListener('click', () => {
        if (!slide.classList.contains('is-active')) return;
        const href = slide.dataset.href;
        if (href) window.location.href = href;
      });
    });

    this.#renderTrack();
    this.#setCaption(this.#slides[0]?.dataset ?? {});
    this.#startTimer();
  }

  go(i) {
    this.#current = ((i % this.#total) + this.#total) % this.#total;
    this.#renderTrack();
    this.#reelCaption();
  }

  next() {
    if (this.#isAnimating) return;
    if (this.#current === this.#total - 1) {
      this.#animateToClone();
    } else {
      this.go(this.#current + 1);
    }
    this.#resetTimer();
  }
  prev() { this.go(this.#current - 1); this.#resetTimer(); }

  #animateToClone() {
    this.#isAnimating = true;
    this.#track.style.transform = `translateX(-${this.#total * 100}%)`;
    if (this.#counterEl) {
      this.#counterEl.textContent = `01 / ${String(this.#total).padStart(2, '0')}`;
    }
    this.#slides.forEach(s => s.classList.remove('is-active'));
    this.#cloneEl?.classList.add('is-active');
    const data0 = this.#slides[0]?.dataset ?? {};
    this.#numEl?.classList.add('is-reel-out');
    this.#nameEl?.classList.add('is-reel-out');
    this.#typeEl?.classList.add('is-fade-out');
    setTimeout(() => {
      this.#setCaption(data0);
      this.#numEl?.classList.remove('is-reel-out');
      this.#nameEl?.classList.remove('is-reel-out');
      this.#typeEl?.classList.remove('is-fade-out');
      this.#numEl?.classList.add('is-reel-in');
      this.#nameEl?.classList.add('is-reel-in');
      this.#typeEl?.classList.add('is-fade-in');
      setTimeout(() => {
        this.#numEl?.classList.remove('is-reel-in');
        this.#nameEl?.classList.remove('is-reel-in');
        this.#typeEl?.classList.remove('is-fade-in');
      }, Slideshow.#REEL_MS + 30);
    }, Slideshow.#REEL_MS + 10);
    setTimeout(() => {
      const slide0 = this.#slides[0];
      if (slide0) {
        slide0.style.transition = 'none';
        slide0.classList.add('is-active');
        void slide0.offsetWidth;
        slide0.style.transition = '';
      }
      this.#track.classList.add('no-transition');
      this.#track.style.transform = 'translateX(0)';
      void this.#track.offsetWidth;
      this.#track.classList.remove('no-transition');
      this.#current = 0;
      this.#cloneEl?.classList.remove('is-active');
      this.#isAnimating = false;
    }, Slideshow.#SLIDE_MS + 60);
  }

  #renderTrack() {
    this.#track.style.transform = `translateX(-${this.#current * 100}%)`;

    this.#slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === this.#current);
    });

    if (this.#counterEl) {
      const cur = String(this.#current + 1).padStart(2, '0');
      const tot = String(this.#total).padStart(2, '0');
      this.#counterEl.textContent = `${cur} / ${tot}`;
    }
  }

  #reelCaption() {
    this.#numEl?.classList.add('is-reel-out');
    this.#nameEl?.classList.add('is-reel-out');
    this.#typeEl?.classList.add('is-fade-out');

    setTimeout(() => {
      this.#setCaption(this.#slides[this.#current]?.dataset ?? {});
      this.#numEl?.classList.remove('is-reel-out');
      this.#nameEl?.classList.remove('is-reel-out');
      this.#typeEl?.classList.remove('is-fade-out');
      this.#numEl?.classList.add('is-reel-in');
      this.#nameEl?.classList.add('is-reel-in');
      this.#typeEl?.classList.add('is-fade-in');

      setTimeout(() => {
        this.#numEl?.classList.remove('is-reel-in');
        this.#nameEl?.classList.remove('is-reel-in');
        this.#typeEl?.classList.remove('is-fade-in');
      }, Slideshow.#REEL_MS + 30);
    }, Slideshow.#REEL_MS + 10);
  }

  #setCaption({ num = '', name = '', type = '' } = {}) {
    if (this.#numEl)  this.#numEl.textContent  = num;
    if (this.#nameEl) this.#nameEl.textContent = name;
    if (this.#typeEl) {
      this.#typeEl.textContent  = type;
      this.#typeEl.dataset.type = type;
    }
  }

  #startTimer() {
    clearInterval(this.#timer);
    if (this.#progressEl) {
      this.#progressEl.classList.remove('is-running');
      void this.#progressEl.offsetWidth;
      this.#progressEl.classList.add('is-running');
    }
    this.#timer = setInterval(() => this.next(), this.#interval);
  }

  #stopTimer() {
    clearInterval(this.#timer);
    this.#timer = null;
    this.#progressEl?.classList.remove('is-running');
  }

  #resetTimer() {
    this.#stopTimer();
    this.#startTimer();
  }

  pause()  { this.#stopTimer(); }
  resume() { this.#resetTimer(); }
}

/* ── Works rendering ────────────────────────────────────────── */
function renderSlides(el) {
  if (typeof WORKS === 'undefined') return;
  const track = el.querySelector('.slideshow__track');
  if (!track) return;

  const worksPickup = WORKS.filter(w => w.pickup !== false);
  const bgPickup = (typeof BOARDGAME !== 'undefined'
    ? BOARDGAME.filter(w => w.pickup).map(w => ({
        ...w,
        type: 'Boardgame',
        img:  w.img  || `./assets/boardgame/${w.num}/main.jpg`,
        href: w.href || `./works/boardgame-${w.num}.html`,
      }))
    : []).slice(0, 2);
  const pickup = [...worksPickup, ...bgPickup];
  const items  = pickup
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  track.innerHTML = items.map((w, i) => {
    const t0   = Array.isArray(w.type) ? w.type[0] : (w.type || '');
    const href = w.href || (t0 === 'Boardgame'
      ? `./works/boardgame-${w.num}.html`
      : `./works/${w.num}.html`);
    return `<div class="slideshow__slide"
          data-num="${w.num}" data-name="${w.name}"
          data-type="${t0}" data-href="${href}">
       <figure class="slideshow__fig">
         <img src="${w.img}" alt="${w.name}" loading="${i === 0 ? 'eager' : 'lazy'}" />
       </figure>
     </div>`;
  }).join('');

  const firstSlide = track.firstElementChild;
  if (firstSlide) {
    const clone = firstSlide.cloneNode(true);
    clone.setAttribute('data-clone', 'true');
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  }

  const counter = el.querySelector('.slideshow__counter');
  if (counter) counter.textContent = `01 / ${String(items.length).padStart(2, '0')}`;

  const numEl  = el.querySelector('#js-slide-num');
  const nameEl = el.querySelector('#js-slide-name');
  const typeEl = el.querySelector('#js-slide-type');
  if (numEl)  numEl.textContent      = items[0]?.num  ?? '';
  if (nameEl) nameEl.textContent     = items[0]?.name ?? '';
  if (typeEl) {
    const t0 = Array.isArray(items[0]?.type) ? items[0].type[0] : (items[0]?.type ?? '');
    typeEl.textContent  = t0;
    typeEl.dataset.type = t0;
  }
}

/* img 未設定時に jpg→jpeg→png→gif→webp の順で自動検出してセット */
function resolveThumbImg(imgEl) {
  const base = imgEl.dataset.autoBase;
  if (!base) return;
  const EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  let i = 0;
  (function tryNext() {
    if (i >= EXTS.length) return;
    const probe = new Image();
    probe.onload  = () => { imgEl.src = probe.src; };
    probe.onerror = tryNext;
    probe.src = `${base}.${EXTS[i++]}`;
  })();
}

function renderWorkCards(gridEl, itemsOrFilter) {
  const lang  = currentLang();
  let items;
  if (Array.isArray(itemsOrFilter)) {
    items = itemsOrFilter;
  } else if (typeof itemsOrFilter === 'function') {
    if (typeof WORKS === 'undefined') return;
    items = WORKS.filter(itemsOrFilter);
  } else {
    if (typeof WORKS === 'undefined') return;
    items = WORKS;
  }

  gridEl.innerHTML = items.map(w => {
    const folder   = w.folder || (w.href?.includes('/boardgame/') ? 'boardgame' : 'works');
    const imgAttr  = w.img
      ? `src="${w.img}"`
      : `data-auto-base="./assets/${folder}/${w.num}/main"`;
    const hrefSrc  = w.href || `./${folder}/${w.num}.html`;
    return `<article class="window work-card">
       <div class="window__titlebar">
         <span class="work-card__num">${w.num}</span>
         <span class="work-card__name">${lang === 'en' && w.nameEn ? w.nameEn : w.name}</span>
         <span class="work-card__types">${workTypeBadges(w.type || 'Boardgame')}</span>
       </div>
       <figure class="work-card__thumb">
         <img ${imgAttr} alt="${w.name}" loading="lazy" />
       </figure>
       <div class="work-card__info">
         <p class="work-card__desc">${lang === 'en' && w.descEn ? w.descEn : w.desc}</p>
         <a href="${hrefSrc}" class="work-card__cta">VIEW →</a>
       </div>
     </article>`;
  }).join('');
  gridEl.querySelectorAll('img[data-auto-base]').forEach(resolveThumbImg);

  const section = gridEl.closest('.works-section');
  const countEl = section?.querySelector('.section-header span:last-child');
  if (countEl) countEl.textContent = `${items.length} items`;
  if (section) section.style.display = items.length ? '' : 'none';
}

function renderBoardgameCardGrid(gridEl, categoryFilter) {
  if (typeof BOARDGAME === 'undefined') return;
  const lang  = currentLang();
  const items = (categoryFilter && categoryFilter !== 'all')
    ? BOARDGAME.filter(w => {
        if (!w.category) return false;
        return Array.isArray(w.category)
          ? w.category.includes(categoryFilter)
          : w.category === categoryFilter;
      })
    : BOARDGAME;
  gridEl.innerHTML = items.map(w => {
    const displayName = lang === 'en' && w.nameEn ? w.nameEn : w.name;
    const imgAttr  = w.img
      ? `src="${w.img}"`
      : `data-auto-base="./assets/boardgame/${w.num}/main"`;
    const hrefSrc = w.href || `./works/boardgame-${w.num}.html`;
    const cats = w.category
      ? (Array.isArray(w.category) ? w.category : [w.category])
          .map(c => `<span class="boardgame-card__cat" data-cat="${c}">${c}</span>`)
          .join('')
      : '';
    const catRow = cats ? `<span class="boardgame-card__cats">${cats}</span>` : '';
    return `<a class="boardgame-card" href="${hrefSrc}">
      <figure class="boardgame-card__thumb">
        <img class="boardgame-card__img" ${imgAttr} alt="${w.name}" loading="lazy" />
        <div class="boardgame-card__overlay">
          <span class="boardgame-card__overlay-name">${displayName}</span>
          <span class="boardgame-card__overlay-meta">${w.role} / ${w.year}</span>
        </div>
      </figure>
      <span class="boardgame-card__label">
        <span class="boardgame-card__label-row">
          <span class="boardgame-card__num">${w.num}</span>
          <span class="boardgame-card__name">${displayName}</span>
        </span>
        ${catRow}
      </span>
    </a>`;
  }).join('');
  gridEl.querySelectorAll('img[data-auto-base]').forEach(resolveThumbImg);

  const section = gridEl.closest('.works-section');
  const countEl = section?.querySelector('.section-header span:last-child');
  if (countEl) countEl.textContent = `${items.length} items`;
  if (section) section.style.display = items.length ? '' : 'none';
}

/* ── News rendering ─────────────────────────────────────────── */

/* 記事詳細ページのURL（root レベルページ → news/detail.html） */
function newsDetailHref(n) {
  const key = n.num ? `num=${encodeURIComponent(n.num)}` : `date=${encodeURIComponent(n.date)}`;
  return `./news/detail.html?${key}`;
}

/* body / bodyEn が配列（| 区切り）の場合は先頭段落のみ返す（カード用） */
function newsBodyText(n) {
  const lang = currentLang();
  const raw  = lang === 'en' && n.bodyEn ? n.bodyEn : n.body;
  if (Array.isArray(raw)) return raw[0] || '';
  return (raw || '').split(/[|｜]/)[0].trim();
}

function newsItemHTML(n) {
  const lang    = currentLang();
  const display = n.date.replace(/-/g, '.');
  const title   = lang === 'en' && n.titleEn ? n.titleEn : n.title;
  return `<a class="news-item" href="${newsDetailHref(n)}">
    <time class="news-item__date" datetime="${n.date}">${display}</time>
    <div class="news-item__content">
      <p class="news-item__title">${title}</p>
      <p class="news-item__body">${newsBodyText(n)}</p>
    </div>
  </a>`;
}

function newsCardHTML(n) {
  const lang    = currentLang();
  const display = n.date.replace(/-/g, '.');
  const title   = lang === 'en' && n.titleEn ? n.titleEn : n.title;
  const thumb   = n.img
    ? `<figure class="news-card__thumb"><img src="${n.img}" alt="${title}" loading="lazy" /></figure>`
    : '';
  return `<a class="news-card" href="${newsDetailHref(n)}">
    ${thumb}
    <div class="news-card__body">
      <time class="news-card__date" datetime="${n.date}">${display}</time>
      <p class="news-card__title">${title}</p>
      <p class="news-card__desc">${newsBodyText(n)}</p>
    </div>
  </a>`;
}

const newsListEl  = document.getElementById('js-news-list');
const newsPaginEl = document.getElementById('js-news-pagination');
let _renderNewsPage = null;

/* ── WorkGallery ─────────────────────────────────────────────── */
class WorkGallery {
  #mainImg;
  #thumbs;
  #current = 0;

  constructor(el) {
    this.#mainImg = el.querySelector('.work-gallery__main img');
    this.#thumbs  = el.querySelectorAll('.work-gallery__thumb');

    if (this.#thumbs.length <= 1) {
      el.querySelector('.work-gallery__prev').style.display = 'none';
      el.querySelector('.work-gallery__next').style.display = 'none';
      el.querySelector('.work-gallery__thumbs').style.display = 'none';
      return;
    }

    el.querySelector('.work-gallery__prev')
      ?.addEventListener('click', () => this.#go(this.#current - 1));
    el.querySelector('.work-gallery__next')
      ?.addEventListener('click', () => this.#go(this.#current + 1));

    this.#thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => this.#go(i));
    });
  }

  #go(i) {
    const total = this.#thumbs.length;
    this.#current = ((i % total) + total) % total;
    const src = this.#thumbs[this.#current].querySelector('img')?.src;
    const alt = this.#thumbs[this.#current].querySelector('img')?.alt;

    this.#thumbs.forEach((t, idx) =>
      t.classList.toggle('is-active', idx === this.#current));

    if (this.#mainImg && src) {
      this.#mainImg.classList.add('is-fade-out');
      setTimeout(() => {
        this.#mainImg.src = src;
        this.#mainImg.alt = alt ?? '';
        this.#mainImg.classList.remove('is-fade-out');
      }, 250);
    }
  }
}

/* ── Work detail rendering ───────────────────────────────────── */

/* ギャラリーHTMLを組み立てて WorkGallery を初期化する */
function buildGallery(galleryEl, name, imgs) {
  if (!imgs.length) return;
  galleryEl.innerHTML =
    `<div class="work-gallery__stage">
       <button class="work-gallery__btn work-gallery__prev" aria-label="前の画像">←</button>
       <figure class="work-gallery__main">
         <img src="${imgs[0]}" alt="${name}" />
       </figure>
       <button class="work-gallery__btn work-gallery__next" aria-label="次の画像">→</button>
     </div>
     <div class="work-gallery__thumbs">
       ${imgs.map((src, i) =>
         `<button class="work-gallery__thumb${i === 0 ? ' is-active' : ''}">
            <img src="${src}" alt="${i + 1}" />
          </button>`).join('')}
     </div>`;
  new WorkGallery(galleryEl);
}

/* フォルダ内の画像を自動検出する
   命名規則: main.jpg / sub1.jpg / sub2.jpg … (jpg,jpeg,png,gif,webp 対応)
   ファイルを置くだけで自動的にギャラリーに追加される */
function discoverGalleryImages(basePath, callback) {
  const EXTS  = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const NAMES = ['main', ...Array.from({length: 9}, (_, i) => `sub${i + 1}`)];
  const found = {};
  let pending = NAMES.length * EXTS.length;

  function finish() {
    callback(NAMES.map(n => found[n]).filter(Boolean));
  }

  NAMES.forEach(name => {
    EXTS.forEach(ext => {
      const src = `${basePath}/${name}.${ext}`;
      const img = new Image();
      img.onload  = () => { if (!found[name]) found[name] = src; if (!--pending) finish(); };
      img.onerror = () => { if (!--pending) finish(); };
      img.src = src;
    });
  });
}

function renderWorkDetail() {
  const articleEl = document.querySelector('.work-detail[data-work-num]');
  if (!articleEl || typeof WORKS === 'undefined') return;

  const w = WORKS.find(item => item.num === articleEl.dataset.workNum);
  if (!w) return;

  const isEn = currentLang() === 'en';
  const displayName = isEn && w.nameEn ? w.nameEn : w.name;

  document.title = `${displayName} — ${SITE.name}`;

  const titlebarEl = document.getElementById('js-detail-titlebar');
  if (titlebarEl) titlebarEl.textContent = `WORKS / ${w.num} — ${displayName}`;

  const nameEl = document.getElementById('js-detail-name');
  if (nameEl) {
    let catsEl = document.getElementById('js-detail-cats');
    if (!catsEl) {
      catsEl = document.createElement('div');
      catsEl.id = 'js-detail-cats';
      catsEl.className = 'work-detail__cats';
      nameEl.parentNode.insertBefore(catsEl, nameEl);
    }
    catsEl.innerHTML = workTypeBadges(w.type);
    nameEl.textContent = displayName;
  }

  const subEl = document.getElementById('js-detail-subtitle');
  if (subEl) subEl.textContent = `${typeLabel(w.type)} — ${w.year} — ${w.role}`;

  const descEl = document.getElementById('js-detail-desc');
  if (descEl) {
    const paras = isEn
      ? (w.detailEn || (w.descEn ? [w.descEn] : null) || w.detail || [w.desc])
      : (w.detail   || [w.desc]);
    descEl.innerHTML = paras.map(p => `<p>${p}</p>`).join('');
  }

  const linkEl = document.getElementById('js-detail-link');
  if (linkEl) {
    if (w.link) { linkEl.href = w.link; linkEl.style.display = ''; }
    else        { linkEl.style.display = 'none'; }
  }

  const sidebarEl = document.getElementById('js-detail-sidebar');
  if (sidebarEl) {
    sidebarEl.innerHTML = [
      ['YEAR', w.year],
      w.tool ? ['TOOL', w.tool] : null,
      ['ROLE', w.role],
    ].filter(Boolean).map(([dt, dd]) =>
      `<div class="work-detail__dl-row"><dt>${dt}</dt><dd>${dd}</dd></div>`
    ).join('');
  }

  /* ギャラリーは初回のみ構築（画像は言語切替で変わらない） */
  const galleryEl = document.getElementById('js-gallery');
  if (galleryEl && !galleryEl.dataset.built) {
    galleryEl.dataset.built = '1';
    if (w.gallery && w.gallery.length) {
      /* スプレッドシートの gallery 列を優先 */
      buildGallery(galleryEl, w.name, w.gallery);
    } else {
      /* ローカルファイルを自動検出（フォールバック） */
      discoverGalleryImages(`../assets/works/${w.num}`, imgs => buildGallery(galleryEl, w.name, imgs));
    }
  }
}

/* ── Lightbox ────────────────────────────────────────────────── */
function openLightbox(src) {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    `<img class="lightbox__img" src="${src}" alt="" />` +
    `<button class="lightbox__close" aria-label="閉じる">CLOSE ×</button>`;
  document.body.appendChild(lb);
  requestAnimationFrame(() => lb.classList.add('is-open'));

  function close() {
    lb.classList.remove('is-open');
    lb.addEventListener('transitionend', () => lb.remove(), { once: true });
  }
  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }, { once: true });
}

/* ── Boardgame detail rendering ──────────────────────────────── */
function renderBoardgameDetail() {
  const articleEl = document.querySelector('.boardgame-detail[data-boardgame-num]');
  if (!articleEl || typeof BOARDGAME === 'undefined') return;

  const w = BOARDGAME.find(item => item.num === articleEl.dataset.boardgameNum);
  if (!w) return;

  const isEn = currentLang() === 'en';
  const displayName = isEn && w.nameEn ? w.nameEn : w.name;

  document.title = `${displayName} — ${SITE.name}`;

  const titlebarEl = document.getElementById('js-detail-titlebar');
  if (titlebarEl) titlebarEl.textContent = `BOARDGAME / ${w.num} — ${displayName}`;

  const nameEl = document.getElementById('js-detail-name');
  if (nameEl) {
    let catsEl = document.getElementById('js-detail-cats');
    if (!catsEl) {
      catsEl = document.createElement('div');
      catsEl.id = 'js-detail-cats';
      catsEl.className = 'work-detail__cats';
      nameEl.parentNode.insertBefore(catsEl, nameEl);
    }
    const cats = w.category
      ? (Array.isArray(w.category) ? w.category : [w.category]) : [];
    catsEl.innerHTML = cats
      .map(c => `<span class="boardgame-card__cat" data-cat="${c}">${c}</span>`).join('');
    nameEl.textContent = displayName;
  }

  const subEl = document.getElementById('js-detail-subtitle');
  if (subEl) subEl.textContent = `${w.year} — ${w.role}`;

  const descEl = document.getElementById('js-detail-desc');
  if (descEl) {
    const paras = isEn
      ? (w.detailEn || (w.descEn ? [w.descEn] : null) || w.detail || [w.desc])
      : (w.detail   || [w.desc]);
    descEl.innerHTML = paras.map(p => `<p>${p}</p>`).join('');
  }

  const linkEl = document.getElementById('js-detail-link');
  if (linkEl) {
    if (w.link) { linkEl.href = w.link; linkEl.style.display = ''; }
    else        { linkEl.style.display = 'none'; }
  }

  const sidebarEl = document.getElementById('js-detail-sidebar');
  if (sidebarEl) {
    sidebarEl.innerHTML = [
      ['YEAR', w.year],
      w.tool ? ['TOOL', w.tool] : null,
      ['ROLE', w.role],
    ].filter(Boolean).map(([dt, dd]) =>
      `<div class="work-detail__dl-row"><dt>${dt}</dt><dd>${dd}</dd></div>`
    ).join('');
  }

  /* ギャラリーは初回のみ構築 */
  const galleryEl = document.getElementById('js-gallery');
  if (galleryEl && !galleryEl.dataset.built) {
    galleryEl.dataset.built = '1';
    if (w.gallery && w.gallery.length) {
      /* スプレッドシートの gallery 列を優先 */
      buildGallery(galleryEl, w.name, w.gallery);
    } else {
      /* ローカルファイルを自動検出（フォールバック） */
      discoverGalleryImages(`../assets/boardgame/${w.num}`, imgs => buildGallery(galleryEl, w.name, imgs));
    }
  }
}

/* ── Related items ───────────────────────────────────────────── */
function renderRelatedItems() {
  const relEl  = document.getElementById('js-related');
  if (!relEl) return;

  const lang   = currentLang();
  const workEl = document.querySelector('.work-detail[data-work-num]');
  const bgEl   = document.querySelector('.boardgame-detail[data-boardgame-num]');

  let allItems, currentNum, hrefFn, imgBaseFn;

  if (workEl && typeof WORKS !== 'undefined' && WORKS.length > 1) {
    currentNum = workEl.dataset.workNum;
    allItems   = WORKS;
    hrefFn     = w => `./${w.num}.html`;
    imgBaseFn  = w => `../assets/works/${w.num}/main`;
  } else if (bgEl && typeof BOARDGAME !== 'undefined' && BOARDGAME.length > 1) {
    currentNum = bgEl.dataset.boardgameNum;
    allItems   = BOARDGAME;
    hrefFn     = w => `./boardgame-${w.num}.html`;
    imgBaseFn  = w => `../assets/boardgame/${w.num}/main`;
  } else {
    relEl.innerHTML = '';
    return;
  }

  const idx   = allItems.findIndex(w => w.num === currentNum);
  const items = [...allItems.slice(idx + 1), ...allItems.slice(0, idx)].slice(0, 3);

  if (!items.length) { relEl.innerHTML = ''; return; }

  const heading = lang === 'en'
    ? (workEl ? 'OTHER WORKS' : 'OTHER BOARDGAMES')
    : (workEl ? 'OTHER WORKS' : 'OTHER BOARDGAMES');

  relEl.innerHTML = `
    <p class="related__heading">${heading}</p>
    <div class="related__grid">
      ${items.map(w => {
        const name    = lang === 'en' && w.nameEn ? w.nameEn : w.name;
        const imgAttr = w.img
          ? `src="${w.img}"`
          : `data-auto-base="${imgBaseFn(w)}"`;
        const catBadges = workEl
          ? workTypeBadges(w.type)
          : (w.category
              ? (Array.isArray(w.category) ? w.category : [w.category])
                  .map(c => `<span class="boardgame-card__cat" data-cat="${c}">${c}</span>`).join('')
              : '');
        return `<a class="related__card" href="${hrefFn(w)}">
          <figure class="related__thumb">
            <img class="related__thumb-img" ${imgAttr} alt="${name}" loading="lazy" />
            <div class="related__overlay">
              <span class="related__overlay-name">${name}</span>
            </div>
          </figure>
          <span class="related__label">
            <span class="related__label-row">
              <span class="related__num">${w.num}</span>
              <span class="related__name">${name}</span>
            </span>
            ${catBadges ? `<span class="related__cats">${catBadges}</span>` : ''}
          </span>
        </a>`;
      }).join('')}
    </div>`;

  relEl.querySelectorAll('img[data-auto-base]').forEach(resolveThumbImg);
}

/* ── News detail page rendering ─────────────────────────────── */
function renderNewsDetail() {
  const articleEl = document.querySelector('.news-detail');
  if (!articleEl || typeof NEWS === 'undefined') return;

  const params = new URLSearchParams(location.search);
  const num    = params.get('num');
  const date   = params.get('date');
  const n = num
    ? NEWS.find(item => item.num === num)
    : NEWS.find(item => item.date === date);
  if (!n) return;

  const isEn  = currentLang() === 'en';
  const title = isEn && n.titleEn ? n.titleEn : n.title;
  const body  = isEn && n.bodyEn  ? n.bodyEn  : n.body;

  document.title = `${title} — ${SITE.name}`;

  const titlebarEl = document.getElementById('js-detail-titlebar');
  if (titlebarEl) titlebarEl.textContent = `NEWS — ${n.date.replace(/-/g, '.')}`;

  const dateEl = document.getElementById('js-detail-date');
  if (dateEl) {
    dateEl.textContent = n.date.replace(/-/g, '.');
    dateEl.setAttribute('datetime', n.date);
  }

  const nameEl = document.getElementById('js-detail-name');
  if (nameEl) nameEl.textContent = title;

  const descEl = document.getElementById('js-detail-desc');
  if (descEl) {
    let paras;
    if (Array.isArray(body)) {
      paras = body;
    } else if (body) {
      paras = body.split(/[|｜]/).map(s => s.trim()).filter(Boolean);
    } else {
      paras = [];
    }
    descEl.innerHTML = paras.map(p => `<p>${p}</p>`).join('');
  }

  /* ギャラリー（初回のみ構築） */
  const galleryEl = document.getElementById('js-gallery');
  if (galleryEl && !galleryEl.dataset.built) {
    const imgs = n.gallery || (n.img ? [n.img] : []);
    if (imgs.length) {
      buildGallery(galleryEl, title, imgs);
      galleryEl.dataset.built = 'true';
    }
  }
}

/* ── Language init ───────────────────────────────────────────── */
document.querySelectorAll('.header__lang').forEach(btn => {
  btn.addEventListener('click', () => setLang(_lang === 'ja' ? 'en' : 'ja'));
});

function initRender() {
  /* Works / Boardgame グリッド */
  const worksGridEl = document.querySelector('.top-works-grid');
  if (worksGridEl) renderWorkCards(worksGridEl, w => w.type !== 'Boardgame');

  const boardgameGridEl = document.querySelector('.boardgame-card-grid');
  if (boardgameGridEl && typeof BOARDGAME !== 'undefined') renderBoardgameCardGrid(boardgameGridEl);

  const bgFilterEl = document.getElementById('js-bg-filter');
  if (bgFilterEl && boardgameGridEl) {
    bgFilterEl.addEventListener('click', e => {
      const btn = e.target.closest('.type-filter__btn');
      if (!btn) return;
      bgFilterEl.querySelectorAll('.type-filter__btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderBoardgameCardGrid(boardgameGridEl, btn.dataset.filter);
    });
  }

  /* News */
  if (newsListEl && typeof NEWS !== 'undefined') {
    if (newsPaginEl) {
      const PER   = 10;
      const total = Math.ceil(NEWS.length / PER);
      function getPage() {
        const m = location.hash.match(/page=(\d+)/);
        return Math.min(total, Math.max(1, m ? parseInt(m[1]) : 1));
      }
      function renderNewsPage() {
        const page  = getPage();
        const start = (page - 1) * PER;
        newsListEl.innerHTML = NEWS.slice(start, start + PER).map(newsCardHTML).join('');
        if (total <= 1) { newsPaginEl.innerHTML = ''; return; }
        newsPaginEl.innerHTML = Array.from({ length: total }, (_, i) => {
          const p = i + 1;
          return `<a class="news-pagination__btn${p === page ? ' is-current' : ''}"
                     href="#page=${p}">${p}</a>`;
        }).join('');
      }
      _renderNewsPage = renderNewsPage;
      renderNewsPage();
      window.addEventListener('hashchange', renderNewsPage);
    } else {
      newsListEl.innerHTML = NEWS.slice(0, 3).map(newsCardHTML).join('');
    }
  }

  /* プロフィール情報をスプレッドシートから適用 */
  if (window.SITE_SETTINGS?.profileImg) {
    document.querySelectorAll('#js-profile-photo').forEach(el => {
      el.src = window.SITE_SETTINGS.profileImg;
    });
  }
  if (window.SITE_SETTINGS?.profileName) {
    document.querySelectorAll('.profile-name, .profile-brief__name').forEach(el => {
      el.textContent = window.SITE_SETTINGS.profileName;
    });
  }
  if (window.SITE_SETTINGS?.profileRole) {
    document.querySelectorAll('.profile-role, .profile-brief__role').forEach(el => {
      el.textContent = window.SITE_SETTINGS.profileRole;
    });
  }
  applyProfileBio(currentLang());

  /* 詳細ページ・言語適用 */
  renderWorkDetail();
  renderBoardgameDetail();
  renderNewsDetail();
  renderRelatedItems();
  applyPageIntro();
  applyLang(_lang);
}

function applyPageIntro() {
  const introEl = document.querySelector('.page-intro__text');
  if (!introEl || !window.SITE_SETTINGS) return;
  const isWorks = !!document.querySelector('.works-section[aria-label="Works"]');
  const isBG    = !!document.querySelector('.works-section[aria-label="Boardgame Artwork"]');
  let jaText, enText;
  if (isWorks) {
    jaText = window.SITE_SETTINGS.worksPageIntro;
    enText = window.SITE_SETTINGS.worksPageIntroEn;
  } else if (isBG) {
    jaText = window.SITE_SETTINGS.boardgamePageIntro;
    enText = window.SITE_SETTINGS.boardgamePageIntroEn;
  }
  if (!jaText && !enText) return;
  function toHtml(t) {
    return (t || '').split(/[|｜]/).map(function (s) { return s.trim(); }).filter(Boolean).join('<br>');
  }
  introEl.removeAttribute('data-ja');
  introEl.removeAttribute('data-en');
  introEl.dataset.jaHtml = toHtml(jaText);
  introEl.dataset.enHtml = toHtml(enText || jaText);
}

/* スライドショーはローカルデータで即座に描画 — sheets 待ちでローディング後に空白にならないよう */
(function () {
  const slideshowEl = document.getElementById('js-slideshow');
  if (!slideshowEl) return;
  renderSlides(slideshowEl);
  const ss = new Slideshow(slideshowEl, 6000);
  if (document.getElementById('js-loader')) {
    ss.pause();
    document.addEventListener('loaderDone', () => ss.resume(), { once: true });
  }
})();

/* sheets-config.js が読み込まれていれば sheetsReady を待つ、なければ即描画 */
if (typeof SHEETS_CONFIG !== 'undefined') {
  document.addEventListener('sheetsReady', initRender, { once: true });
} else {
  initRender();
}
