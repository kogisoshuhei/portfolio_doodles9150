/* ════════════════════════════════════════════════════════════
   BOARDGAME DATA — ここだけ編集すれば WORKS・詳細ページに自動反映
   ════════════════════════════════════════════════════════════

   フィールド説明:
     num      : 番号 ('01' など) ★必須
     name     : 作品名（日本語） ★必須
     nameEn   : 作品名（英語）  (省略可 → name をそのまま表示)
     year     : 制作年           ★必須
     role     : 担当役割         ★必須
     category : 'GameDesign' または 'Artwork' (省略可)
     desc     : 説明文（日本語） ★必須
     tool     : 使用ツール (省略 or '' でサイドバーに表示しない)
     link     : 外部リンク URL  (省略 or '' でボタン非表示)
     img      : カードサムネイル ★省略可 → assets/boardgame/{num}/main.jpg を自動使用
     href     : 詳細ページパス  ★省略可 → ./boardgame/{num}.html を自動使用
     descEn   : 説明文（英語）  (省略時は desc を表示)
     detail   : 詳細ページ用の長い説明（段落ごとの配列・省略時は desc）
     detailEn : 詳細ページ用の長い説明（英語配列・省略時は descEn）
     pickup   : true で TOP の PICKUP にも表示

   画像ファイルについて:
     assets/boardgame/{num}/ フォルダを作って画像を置くだけで自動検出されます
       main.jpg → カードサムネイル兼ギャラリー先頭
       sub1.jpg / sub2.jpg … → ギャラリーに追加（jpg・jpeg・png・gif・webp 対応）

   新しい作品を追加するには:
     1. assets/boardgame/02/ フォルダを作り画像を置く
     2. boardgame/02.html を 01.html からコピーして data-boardgame-num="02" に変更
     3. 下の BOARDGAME 配列にエントリを追加（img・href は省略可）
*/
var BOARDGAME = [
  {
    num:      '01',
    name:     'SEENO ~セーノ~',
    nameEn:   'SEENO',
    year:     '2016',
    role:     'Game Design & Illustration',
    category: ['GameDesign', 'Artwork'],
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '02',
    name:     '6つの祭壇',
    nameEn:   'The 6 Sacret Altars',
    year:     '2019',
    role:     'Game Design , Art Direction',
    category: ['GameDesign', 'Artwork'],
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '03',
    name:     'バトルオブジパング',
    nameEn:   'Battle Of Zipangu',
    year:     '2019',
    role:     'Art Direction',
    category: 'Artwork',
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '04',
    name:     'bouquet ~花束を君に~',
    nameEn:   'bouquet',
    year:     '2020',
    role:     'Art Direction',
    category: 'Artwork',
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '05',
    name:     'ゼバオト',
    nameEn:   'ZEBAOT',
    year:     '2021',
    role:     'Art Direction',
    category: 'Artwork',
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '06',
    name:     'リトル 2 キングダム',
    nameEn:   'Little 2 Kingdom',
    year:     '2022',
    role:     'Art Direction',
    category: 'Artwork',
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '07',
    name:     'エリクシリウム',
    nameEn:   'ELIXIRIUM',
    year:     '2022',
    role:     'Game Design & Art Direction',
    category: ['GameDesign', 'Artwork'],
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '08',
    name:     'セプテム',
    nameEn:   'SEPTEM',
    year:     '2023',
    role:     'Art Direction',
    category: 'Artwork',
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '09',
    name:     'RED RAIN',
    year:     '2023',
    role:     'Art Direction',
    category: 'Artwork',
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '10',
    name:     'アイルトレイシズ',
    nameEn:   'Isle Traces',
    year:     '2024',
    role:     'Game Design & Art Direction',
    category: ['GameDesign', 'Artwork'],
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '11',
    name:     'アイルトレイシズ アイルサイド',
    nameEn:   'Isle Traces IsleSide',
    year:     '2024',
    role:     'Game Design & Art Direction',
    category: ['GameDesign', 'Artwork'],
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '12',
    name:     '雪月花',
    nameEn:   'SETSUGEKKA',
    year:     '2025',
    role:     'Art Direction',
    category: 'Artwork',
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '13',
    name:     'ねこねこみっけ',
    nameEn:   'Nekoneko Mikke',
    year:     '2025',
    role:     'Art Direction',
    category: ['GameDesign', 'Artwork'],
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '14',
    name:     'SICE&SOUL~冥界の英雄~',
    year:     '2026',
    role:     'Art Direction',
    category: ['GameDesign', 'Artwork'],
    desc:     '説明文をここに入力してください。',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
  {
    num:      '99',
    name:     'ボードゲーム制作体験記2026',
    year:     '2026',
    role:     'Graphic Design',
    category: 'Artwork',
    desc:     'ボードゲーム制作体験をつづった本',
    descEn:   'Enter description here.',
    pickup:   true, 
  },
];
