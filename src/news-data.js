/* ════════════════════════════════════════════════════════════
   NEWS DATA — ここに追記するだけで TOP・NEWS ページに反映されます
   ════════════════════════════════════════════════════════════
   date    : ISO 形式 (YYYY-MM-DD)
   title   : 見出し（日本語）
   titleEn : 見出し（英語）
   body    : 本文（日本語）。段落を | で区切る（例: "段落1|段落2"）
   bodyEn  : 本文（英語）。同様に | で段落区切り
   img     : サムネイル画像パス（省略可。gallery 指定時は1枚目を自動使用）
             例: './assets/news/2026-05-29.jpg'
   gallery : 画像パスの配列（省略可。複数枚表示したい場合に指定）
             例: ['./assets/news/2026-05-29.jpg', './assets/news/sub1.jpg']
   新しい記事を先頭に追加してください
*/
var NEWS = [
  {
    date:    '2026-06-01',
    title:   'ポートフォリオサイトを公開しました',
    titleEn: 'Portfolio site launched',
    img:     './assets/news/20260529.jpg',
    /* 複数画像を使う場合は gallery 配列を追加:
    gallery: ['./assets/news/20260529.jpg', './assets/news/sub1.jpg'], */
    body:    '制作実績をまとめたポートフォリオサイトをリニューアル公開しました。今後も随時作品を追加していきます。',
    bodyEn:  'Relaunched the portfolio site with a collection of works. New projects will be added regularly.',
  },
];
