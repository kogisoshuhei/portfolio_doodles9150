/* ════════════════════════════════════════════════════════════
   WORKS DATA — ここだけ編集すれば TOP・WORKS・詳細ページに自動反映
   ════════════════════════════════════════════════════════════

   必須フィールド:
     num      : 番号 ('01' など)
     name     : 作品名（日本語）
     nameEn   : 作品名（英語）省略可 → name をそのまま表示
     type     : Illust / Animation / 3DModeling / Boardgame / Other
     year     : 制作年
     role     : 担当役割
     tool     : 使用ツール (空文字 '' でサイドバーに表示しない)
     link     : 外部リンク URL (空文字 '' で「OPEN PROJECT」ボタンを非表示)
     img      : サムネイル画像パス
     href     : 詳細ページパス
     desc     : カード・詳細ページの説明文（日本語）
     descEn   : カード・詳細ページの説明文（英語）
     pickup   : true で TOP の PICKUP にも表示

   任意フィールド:
     detail   : 詳細ページ用の長い説明文（日本語・段落ごとの配列）
                例: detail: ['段落1', '段落2', '段落3']
                省略時は desc を使用
     detailEn : 詳細ページ用の長い説明文（英語・配列）
                省略時は descEn を使用
*/
var WORKS = [
  {
    num:      '01',
    name:     'YETIくんとTAKIBIちゃん',
    type:     'Illust',
    year:     '2025',
    role:     'Illustration',
    tool:     'Procreate , Adobe Photoshop',
    link:     '',
    img:      './assets/works/01/main.jpg',
    href:     './works/01.html',
    desc:     '',
    descEn:   '',
    detail:   [
      '',
    ],
    detailEn: [
      '',
    ],
    pickup:   true,
  },
  {
    num:      '02',
    name:     'ももれんげ',
    type:     'Illust',
    year:     '2025',
    role:     'Illustration , Graphic Design',
    tool:     'Procreate , Adobe Photoshop',
    link:     '',
    img:      './assets/works/02/main.jpg',
    href:     './works/02.html',
    desc:     '',
    descEn:   '',
    detail:   [
      '',
    ],
    detailEn: [
      '',
    ],
    pickup:   true,
  },
  {
    num:      '03',
    name:     'COORDONNER(コルドネ)',
    type:     'Illust',
    year:     '2020',
    role:     'Illustration , Graphic Design',
    tool:     'Procreate , Adobe Photoshop',
    link:     '',
    img:      './assets/works/03/main.png',
    href:     './works/03.html',
    desc:     '',
    descEn:   '',
    detail:   [
      '',
    ],
    detailEn: [
      '',
    ],
    pickup:   true,
  },
  {
    num:      '04',
    name:     'Illustrations',
    type:     'Illust',
    year:     '2024',
    role:     'Illustration , Graphic Design',
    tool:     'Procreate , Adobe Photoshop',
    link:     '',
    img:      './assets/works/04/main.jpg',
    href:     './works/04.html',
    desc:     '',
    descEn:   '',
    detail:   [
      '',
    ],
    detailEn: [
      '',
    ],
    pickup:   true,
  },
  {
    num:      '05',
    name:     'Character Animations',
    type:     'Animation',
    year:     '2025-2026',
    role:     'Directing & Designing',
    tool:     '',
    link:     '',
    img:      './assets/works/05/main.gif',
    href:     './works/05.html',
    desc:     '',
    descEn:   '',
    detail:   [
      '',
    ],
    detailEn: [
      '',
    ],
    pickup:   true,
  },
    {
    num:      '06',
    name:     '3Dモデリング',
    type:     '3DModeling',
    year:     '2020-2026',
    role:     '3DModering',
    tool:     'Blender4.3',
    link:     '',
    img:      './assets/works/06/main.png',
    href:     './works/06.html',
    desc:     '',
    descEn:   '',
    detail:   [
      '',
    ],
    detailEn: [
      '',
    ],
    pickup:   true,
  },
];
