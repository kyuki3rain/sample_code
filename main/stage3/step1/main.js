const prefecturesName = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const prefecturesKana = [
  "ほっかいどう",
  "あおもり",
  "いわて",
  "みやぎ",
  "あきた",
  "やまがた",
  "ふくしま",
  "いばらき",
  "とちぎ",
  "ぐんま",
  " さいたま",
  "ちば",
  "とうきょう",
  "かながわ",
  "にいがた",
  "とやま",
  "いしかわ",
  "ふくい",
  "やまなし",
  "ながの",
  "ぎふ",
  "しずおか",
  "あいち",
  "みえ",
  "しが",
  "きょうと",
  "おおさか",
  "ひょうご",
  "なら",
  "わやかま",
  "とっとり",
  "しまね",
  "おかやま",
  "ひろしま",
  "やまぐち",
  "とくしま",
  "かがわ",
  "えひめ",
  "こうち",
  "ふくおか",
  "さが",
  "ながさき",
  "くまもと",
  "おおいた",
  "みやざき",
  "かごしま",
  "おきなわ",
];

onload = function () {
  document.getElementById("backHome").addEventListener("click", () => {
    location.href = "../";
  });

  let prefectures = document.getElementById("prefectures").children;
  for (let i = 0; i < prefectures.length; i++) {
    prefectures[i].addEventListener("mouseover", () => {
      prefectures[i].style.fill = "cornflowerblue";
    });
    prefectures[i].addEventListener("mouseout", () => {
      prefectures[i].style.fill = "#bbee66";
    });
    var query_string = window.location.search;
    let parameter_key = "pref";
    var match_condition = new RegExp(parameter_key + "=[A-Za-z0-9-_%]+");
    if ((parameter = query_string.match(match_condition))) {
      parameter_value = parameter[0].split("=")[1];
      console.log(query_string, parameter_value);
    }

    prefectures[i].addEventListener("click", () => {
      query_string = query_string.replace(
        match_condition,
        parameter_key + "=" + prefecturesKana[i]
      );
      location.href = "../index.html" + query_string;
    });
  }
};
