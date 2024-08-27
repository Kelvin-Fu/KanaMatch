//0-45 Basic, 46-70 dakuon , 71-103 Yoon
const questionBank = [
  {
    Hiragana: "あ",
    Katakana: "ア",
    Romanji: "a",
  },
  {
    Hiragana: "い",
    Katakana: "イ",
    Romanji: "i",
  },
  {
    Hiragana: "う",
    Katakana: "ウ",
    Romanji: "u",
  },
  {
    Hiragana: "え",
    Katakana: "エ",
    Romanji: "e",
  },
  {
    Hiragana: "お",
    Katakana: "オ",
    Romanji: "o",
  },
  {
    Hiragana: "か",
    Katakana: "カ",
    Romanji: "ka",
  },
  {
    Hiragana: "き",
    Katakana: "キ",
    Romanji: "ki",
  },
  {
    Hiragana: "く",
    Katakana: "ク",
    Romanji: "ku",
  },
  {
    Hiragana: "け",
    Katakana: "ケ",
    Romanji: "ke",
  },
  {
    Hiragana: "こ",
    Katakana: "コ",
    Romanji: "ko",
  },
  {
    Hiragana: "さ",
    Katakana: "サ",
    Romanji: "sa",
  },
  {
    Hiragana: "し",
    Katakana: "シ",
    Romanji: "shi",
  },
  {
    Hiragana: "す",
    Katakana: "ス",
    Romanji: "su",
  },
  {
    Hiragana: "せ",
    Katakana: "セ",
    Romanji: "se",
  },
  {
    Hiragana: "そ",
    Katakana: "ソ",
    Romanji: "so",
  },
  {
    Hiragana: "た",
    Katakana: "タ",
    Romanji: "ta",
  },
  {
    Hiragana: "ち",
    Katakana: "チ",
    Romanji: "chi",
  },
  {
    Hiragana: "つ",
    Katakana: "ツ",
    Romanji: "tsu",
  },
  {
    Hiragana: "て",
    Katakana: "テ",
    Romanji: "te",
  },
  {
    Hiragana: "と",
    Katakana: "ト",
    Romanji: "to",
  },
  {
    Hiragana: "な",
    Katakana: "ナ",
    Romanji: "na",
  },
  {
    Hiragana: "に",
    Katakana: "ニ",
    Romanji: "ni",
  },
  {
    Hiragana: "ぬ",
    Katakana: "ヌ",
    Romanji: "nu",
  },
  {
    Hiragana: "ね",
    Katakana: "ネ",
    Romanji: "ne",
  },
  {
    Hiragana: "の",
    Katakana: "ノ",
    Romanji: "no",
  },
  {
    Hiragana: "ん",
    Katakana: "ン",
    Romanji: "n",
  },
  {
    Hiragana: "は",
    Katakana: "ハ",
    Romanji: "ha",
  },
  {
    Hiragana: "ひ",
    Katakana: "ヒ",
    Romanji: "hi",
  },
  {
    Hiragana: "ふ",
    Katakana: "フ",
    Romanji: "fu",
  },
  {
    Hiragana: "へ",
    Katakana: "ヘ",
    Romanji: "he",
  },
  {
    Hiragana: "ほ",
    Katakana: "ホ",
    Romanji: "ho",
  },
  {
    Hiragana: "ま",
    Katakana: "マ",
    Romanji: "ma",
  },
  {
    Hiragana: "み",
    Katakana: "ミ",
    Romanji: "mi",
  },
  {
    Hiragana: "む",
    Katakana: "ム",
    Romanji: "mu",
  },
  {
    Hiragana: "め",
    Katakana: "メ",
    Romanji: "me",
  },
  {
    Hiragana: "も",
    Katakana: "モ",
    Romanji: "mo",
  },
  {
    Hiragana: "や",
    Katakana: "ヤ",
    Romanji: "ya",
  },
  {
    Hiragana: "ゆ",
    Katakana: "ユ",
    Romanji: "yu",
  },
  {
    Hiragana: "よ",
    Katakana: "ヨ",
    Romanji: "yo",
  },
  {
    Hiragana: "ら",
    Katakana: "ラ",
    Romanji: "ra",
  },
  {
    Hiragana: "り",
    Katakana: "リ",
    Romanji: "ri",
  },
  {
    Hiragana: "る",
    Katakana: "ル",
    Romanji: "ru",
  },
  {
    Hiragana: "れ",
    Katakana: "レ",
    Romanji: "re",
  },
  {
    Hiragana: "ろ",
    Katakana: "ロ",
    Romanji: "ro",
  },
  {
    Hiragana: "わ",
    Katakana: "ワ",
    Romanji: "wa",
  },
  {
    Hiragana: "を",
    Katakana: "ヲ",
    Romanji: "wo",
  },
  {
    Hiragana: "が",
    Katakana: "ガ",
    Romanji: "ga",
  },
  {
    Hiragana: "ぎ",
    Katakana: "ギ",
    Romanji: "gi",
  },
  {
    Hiragana: "ぐ",
    Katakana: "グ",
    Romanji: "gu",
  },
  {
    Hiragana: "げ",
    Katakana: "ゲ",
    Romanji: "ge",
  },
  {
    Hiragana: "ご",
    Katakana: "ゴ",
    Romanji: "go",
  },
  {
    Hiragana: "ざ",
    Katakana: "ザ",
    Romanji: "za",
  },
  {
    Hiragana: "じ",
    Katakana: "ジ",
    Romanji: "ji",
  },
  {
    Hiragana: "ず",
    Katakana: "ズ",
    Romanji: "zu",
  },
  {
    Hiragana: "ぜ",
    Katakana: "ゼ",
    Romanji: "ze",
  },
  {
    Hiragana: "ぞ",
    Katakana: "ゾ",
    Romanji: "zo",
  },
  {
    Hiragana: "だ",
    Katakana: "ダ",
    Romanji: "da",
  },
  {
    Hiragana: "ぢ",
    Katakana: "ヂ",
    Romanji: "ji",
  },
  {
    Hiragana: "づ",
    Katakana: "ヅ",
    Romanji: "zu",
  },
  {
    Hiragana: "で",
    Katakana: "デ",
    Romanji: "de",
  },
  {
    Hiragana: "ど",
    Katakana: "ド",
    Romanji: "do",
  },
  {
    Hiragana: "ば",
    Katakana: "バ",
    Romanji: "ba",
  },
  {
    Hiragana: "び",
    Katakana: "ビ",
    Romanji: "bi",
  },
  {
    Hiragana: "ぶ",
    Katakana: "ブ",
    Romanji: "bu",
  },
  {
    Hiragana: "べ",
    Katakana: "ベ",
    Romanji: "be",
  },
  {
    Hiragana: "ぼ",
    Katakana: "ボ",
    Romanji: "bo",
  },
  {
    Hiragana: "ぱ",
    Katakana: "パ",
    Romanji: "pa",
  },
  {
    Hiragana: "ぴ",
    Katakana: "ピ",
    Romanji: "pi",
  },
  {
    Hiragana: "ぷ",
    Katakana: "プ",
    Romanji: "pu",
  },
  {
    Hiragana: "ぺ",
    Katakana: "ペ",
    Romanji: "pe",
  },
  {
    Hiragana: "ぽ",
    Katakana: "ポ",
    Romanji: "po",
  },
  {
    Hiragana: "きゃ",
    Katakana: "キャ",
    Romanji: "kya",
  },
  {
    Hiragana: "きゅ",
    Katakana: "キュ",
    Romanji: "kyu",
  },
  {
    Hiragana: "きょ",
    Katakana: "キョ",
    Romanji: "kyo",
  },
  {
    Hiragana: "しゃ",
    Katakana: "シャ",
    Romanji: "sha",
  },
  {
    Hiragana: "しゅ",
    Katakana: "シュ",
    Romanji: "shu",
  },
  {
    Hiragana: "しょ",
    Katakana: "ショ",
    Romanji: "sho",
  },
  {
    Hiragana: "ちゃ",
    Katakana: "チャ",
    Romanji: "cha",
  },
  {
    Hiragana: "ちゅ",
    Katakana: "チュ",
    Romanji: "chu",
  },
  {
    Hiragana: "ちょ",
    Katakana: "チョ",
    Romanji: "cho",
  },
  {
    Hiragana: "にゃ",
    Katakana: "ニャ",
    Romanji: "nya",
  },
  {
    Hiragana: "にゅ",
    Katakana: "ニュ",
    Romanji: "nyu",
  },
  {
    Hiragana: "にょ",
    Katakana: "ニョ",
    Romanji: "nyo",
  },
  {
    Hiragana: "ひゃ",
    Katakana: "ヒャ",
    Romanji: "hya",
  },
  {
    Hiragana: "ひゅ",
    Katakana: "ヒュ",
    Romanji: "hyu",
  },
  {
    Hiragana: "ひょ",
    Katakana: "ヒョ",
    Romanji: "hyo",
  },
  {
    Hiragana: "みゃ",
    Katakana: "ミャ",
    Romanji: "mya",
  },
  {
    Hiragana: "みゅ",
    Katakana: "ミュ",
    Romanji: "myu",
  },
  {
    Hiragana: "みょ",
    Katakana: "ミョ",
    Romanji: "myo",
  },
  {
    Hiragana: "りゃ",
    Katakana: "リャ",
    Romanji: "rya",
  },
  {
    Hiragana: "りゅ",
    Katakana: "リュ",
    Romanji: "ryu",
  },
  {
    Hiragana: "りょ",
    Katakana: "リョ",
    Romanji: "ryo",
  },
  {
    Hiragana: "ぎゃ",
    Katakana: "ギャ",
    Romanji: "gya",
  },
  {
    Hiragana: "ぎゅ",
    Katakana: "ギュ",
    Romanji: "gyu",
  },
  {
    Hiragana: "ぎょ",
    Katakana: "ギョ",
    Romanji: "gyo",
  },
  {
    Hiragana: "じゃ",
    Katakana: "ジャ",
    Romanji: "ja",
  },
  {
    Hiragana: "じゅ",
    Katakana: "ジュ",
    Romanji: "ju",
  },
  {
    Hiragana: "じょ",
    Katakana: "ジョ",
    Romanji: "jo",
  },
  {
    Hiragana: "びゃ",
    Katakana: "ビャ",
    Romanji: "bya",
  },
  {
    Hiragana: "びゅ",
    Katakana: "ビュ",
    Romanji: "byu",
  },
  {
    Hiragana: "びょ",
    Katakana: "ビョ",
    Romanji: "byo",
  },
  {
    Hiragana: "ぴゃ",
    Katakana: "ピャ",
    Romanji: "pya",
  },
  {
    Hiragana: "ぴゅ",
    Katakana: "ピュ",
    Romanji: "pyu",
  },
  {
    Hiragana: "ぴょ",
    Katakana: "ピョ",
    Romanji: "pyo",
  },
];

export default questionBank;
