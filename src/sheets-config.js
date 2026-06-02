/* ════════════════════════════════════════════════════════════
   SHEETS CONFIG — Google スプレッドシート連携設定
   ════════════════════════════════════════════════════════════

   設定手順:
     1. Googleスプレッドシートを開く
     2. [ファイル] → [共有] → [ウェブに公開]
     3. シートを選択して「カンマ区切りの値 (.csv)」を選び「公開」
     4. 発行されたURLを下記にペーストする

   URLが空文字 '' のシートは取得せず、works-data.js / boardgame-data.js の
   ローカルデータをそのまま使用します。
*/
const SHEETS_CONFIG = {
  worksUrl:     'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyCQnzu_OMeT9LI1XzA-MGyCX5zxQnTUZP5JB7-muIFwMsjhxeV3l6AtJ1EMtltO-O6S08pv15joMy/pub?gid=0&single=true&output=csv',           /* WORKS シートの CSV 公開URL */
  boardgameUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyCQnzu_OMeT9LI1XzA-MGyCX5zxQnTUZP5JB7-muIFwMsjhxeV3l6AtJ1EMtltO-O6S08pv15joMy/pub?gid=231028081&single=true&output=csv', /* BOARDGAME シートの CSV 公開URL */
  newsUrl:      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyCQnzu_OMeT9LI1XzA-MGyCX5zxQnTUZP5JB7-muIFwMsjhxeV3l6AtJ1EMtltO-O6S08pv15joMy/pub?gid=1198400763&single=true&output=csv',  /* NEWS シートの CSV 公開URL */
  settingsUrl:  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyCQnzu_OMeT9LI1XzA-MGyCX5zxQnTUZP5JB7-muIFwMsjhxeV3l6AtJ1EMtltO-O6S08pv15joMy/pub?gid=581671513&single=true&output=csv',  /* SETTINGS シートの CSV 公開URL (プロフィール画像・ローダー画像) */
};