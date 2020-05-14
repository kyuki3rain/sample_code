const answerType = [1, 0, 1, 1, 1, 0, 0, 0];
const answerType2 = [1, 0, 1, 0, 1, 0, 0, 1];
const answerRotate = [1, 1, 3, 1, 0, 3, 3, 0];
const answerRotate2 = [1, 1, 3, 0, 0, 3, 3, 0];

// https://q-az.net/elements-drag-and-drop/

//要素内のクリックされた位置を取得するグローバル（のような）変数
var x;
var y;
let isStatic = 0;

let prevx, prevy;

let rotates = [0, 0, 0, 0, 0, 0, 0, 0];
let nowPlace = new Array(8).fill(-1);

//マウスが押された際の関数
function mdown(e) {
  //クラス名に .drag を追加
  this.classList.add("drag");

  isStatic = 1;

  //タッチデイベントとマウスのイベントの差異を吸収
  if (e.type === "mousedown") {
    var event = e;
  } else {
    var event = e.changedTouches[0];
  }

  let rect = this.parentNode.getBoundingClientRect();
  prevy = window.pageYOffset + rect.top;
  prevx = window.pageXOffset + rect.left;
  console.log(window.pageYOffset + rect.top, window.pageXOffset + rect.left);

  //要素内の相対座標を取得
  x = event.pageX - this.offsetLeft;
  y = event.pageY - this.offsetTop;

  this.addEventListener("mouseup", mclick, false);
  this.addEventListener("touchend", mclick, false);

  //ムーブイベントにコールバック
  document.body.addEventListener("mousemove", mmove, false);
  document.body.addEventListener("touchmove", mmove, false);
}

function mclick(e) {
  console.log(this.id);
  if (isStatic === 1) {
    rotates[this.id] += 90;
    this.style.transform = "rotate(" + rotates[this.id] + "deg)";

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    document.body.removeEventListener("touchmove", mmove, false);
    this.removeEventListener("mouseup", mclick, false);
    this.removeEventListener("touchend", mclick, false);
    //クラス名 .drag も消す
    this.classList.remove("drag");
  }
}

//マウスカーソルが動いたときに発火
function mmove(e) {
  //ドラッグしている要素を取得
  var drag = document.getElementsByClassName("drag")[0];

  isStatic = 0;

  //同様にマウスとタッチの差異を吸収
  if (e.type === "mousemove") {
    var event = e;
  } else {
    var event = e.changedTouches[0];
  }

  //フリックしたときに画面を動かさないようにデフォルト動作を抑制
  e.preventDefault();

  //マウスが動いた場所に要素を動かす
  drag.style.top = event.pageY - y + "px";
  drag.style.left = event.pageX - x + "px";

  //マウスボタンが離されたとき、またはカーソルが外れたとき発火
  drag.addEventListener("mouseup", mup, false);
  document.body.addEventListener("mouseleave", mup, false);
  drag.addEventListener("touchend", mup, false);
  document.body.addEventListener("touchleave", mup, false);
}

//マウスボタンが上がったら発火
function mup(e) {
  var drag = document.getElementsByClassName("drag")[0];

  if (e.type === "mouseup" || e.type === "mouseleave") {
    var event = e;
  } else {
    var event = e.changedTouches[0];
  }

  let flag = 0;
  let answerBox = document.getElementsByClassName("ansBox");
  let filled = new Array(8).fill(0);

  for (let i = 0; i < 8; i++) {
    if (nowPlace[i] >= 0) filled[nowPlace[i]]++;
  }

  for (let i = 0; i < 8; i++) {
    let answerBoxRect = answerBox[i].getBoundingClientRect();
    if (
      filled[i] === 0 &&
      event.pageX > window.pageXOffset + answerBoxRect.left &&
      event.pageX < window.pageXOffset + answerBoxRect.right &&
      event.pageY > window.pageYOffset + answerBoxRect.top &&
      event.pageY < window.pageYOffset + answerBoxRect.bottom
    ) {
      drag.style.top = window.pageYOffset + answerBoxRect.top - prevy + "px";
      drag.style.left = window.pageXOffset + answerBoxRect.left - prevx + "px";
      flag = 1;
      nowPlace[drag.id] = i;
      clearCheck();
      clearCheck2();
      break;
    }
  }

  if (flag === 0) {
    drag.style.top = -1 + "px";
    drag.style.left = -1 + "px";
    nowPlace[drag.id] = -1;
  }

  //ムーブベントハンドラの消去
  document.body.removeEventListener("mousemove", mmove, false);
  drag.removeEventListener("mouseup", mup, false);
  document.body.removeEventListener("touchmove", mmove, false);
  drag.removeEventListener("touchend", mup, false);
  this.removeEventListener("mouseup", mclick, false);
  this.removeEventListener("touchend", mclick, false);

  //クラス名 .drag も消す
  drag.classList.remove("drag");
}

function clearCheck() {
  let flag = 0;
  for (let i = 0; i < 8; i++) {
    if (
      answerType[nowPlace[i]] !== (i % 4 >= 2 ? 1 : 0) &&
      answerRotate[nowPlace[i]] !== (rotates[i] / 90) % 4
    ) {
      flag = 1;
    }
  }
  if (flag === 0) {
    t = localStorage.stage2Flag.split(",");
    t[2] = 1;
    localStorage.stage2Flag = t;
    setTimeout(() => {
      alert("正解です。次の問題にすすみます。");
      location.href = "../step4/index.html";
    }, 200);
  }
}
function clearCheck2() {
  let flag = 0;
  for (let i = 0; i < 8; i++) {
    console.log();
    if (
      answerType2[nowPlace[i]] !== (i % 4 >= 2 ? 1 : 0) ||
      answerRotate2[nowPlace[i]] !== (rotates[i] / 90) % 4
    ) {
      flag = 1;
    }
  }
  if (flag === 0) {
    t = localStorage.stage2Flag.split(",");
    t[2] = 1;
    localStorage.stage2Flag = t;
    setTimeout(() => {
      alert("正解です。次の問題にすすみます。");
      location.href = "../step4/index.html";
    }, 200);
  }
}

onload = function () {
  document.getElementById("backHome").addEventListener("click", () => {
    location.href = "../";
  });

  //要素の取得
  var elements = document.getElementsByClassName("pieces");
  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for (var i = 0; i < elements.length; i++) {
    elements[i].id = i;
    elements[i].addEventListener("mousedown", mdown, false);
    elements[i].addEventListener("touchstart", mdown, false);
  }

  document.getElementById("reset").addEventListener("click", () => {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.top = -1 + "px";
      elements[i].style.left = -1 + "px";
      nowPlace[i] = -1;
    }
  });
};
