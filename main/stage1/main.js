ans = ["富本銭", "富本銭", "富本銭", "富本銭"];
correctFlag = new Array(4).fill(0);

function scroll_control(event) {
  event.preventDefault();
}

function goToNextStage() {
  t = localStorage.stage1Flag.split(",");
  t[0] = 1;
  localStorage.stage1Flag = t;
  location.href = "./stage3.html";
}

function goToLeft(questionIndex) {
  [].forEach.call(
    document.getElementsByClassName("questionContainer"),
    (question, qindex) => {
      if (qindex >= questionIndex) {
        question.style.left = "100vw";
      } else if (qindex === questionIndex - 1) {
        question.style.left = "0vw";
      } else {
        question.style.left = "-100vw";
      }
    }
  );
}

function goToRight(questionIndex) {
  [].forEach.call(
    document.getElementsByClassName("questionContainer"),
    (question, qindex) => {
      if (qindex <= questionIndex) {
        question.style.left = "-100vw";
      } else if (qindex === questionIndex + 1) {
        question.style.left = "0vw";
      } else {
        question.style.left = "100vw";
      }
    }
  );
}

function goToFinish() {
  [].forEach.call(
    document.getElementsByClassName("questionContainer"),
    (question) => {
      question.style.top = "-100vh";
    }
  );
  document.getElementsByClassName("container")[0].style.top = "0";
}

function playTime(t) {
  let hms = "";
  const h = (t / 3600) | 0;
  const m = ((t % 3600) / 60) | 0;
  const s = t % 60;
  const z2 = (v) => {
    const s = "00" + v;
    return s.substr(s.length - 2, 2);
  };
  if (h != 0) {
    hms = h + ":" + z2(m) + ":" + z2(s);
  } else if (m != 0) {
    hms = z2(m) + ":" + z2(s);
  } else {
    hms = "00:" + z2(s);
  }
  return hms;
}

function play(audio, play) {
  audio.play();
  play.style.backgroundImage = "url(images/pause.png)";
}

function pause(audio, play) {
  audio.pause();
  play.style.backgroundImage = "url(images/start.png)";
}

function stop(audio, play) {
  audio.pause();
  audio.currentTime = 0;
  play.style.backgroundImage = "url(images/start.png)";
}

var playButton = document.getElementById("play");
var stopButton = document.getElementById("stop");
var btn = document.getElementsByClassName("but");
let audio = document.getElementsByTagName("audio");
for (let i = 0; i < btn.length; i++) {
  audio[i].play();
  audio[i].pause();
  document.getElementById("current").innerHTML = playTime(
    Math.floor(audio[i].currentTime)
  );
  document.getElementById("duration").innerHTML = playTime(
    Math.round(audio[i].duration)
  );
  playButton.addEventListener("click", playB);
  stopButton.addEventListener("click", stopB);

  audio[i].addEventListener("timeupdate", (e) => {
    const current = Math.floor(audio[i].currentTime);
    const duration = Math.round(audio[i].duration);
    if (!isNaN(duration)) {
      document.getElementById("current").innerHTML = playTime(current);
      document.getElementById("duration").innerHTML = playTime(duration);
      const percent =
        Math.round((audio[i].currentTime / audio[i].duration) * 1000) / 10;
      document.getElementById("seekbar").style.backgroundSize = percent + "%";
    }
  });

  audio[i].addEventListener("ended", () => {
    play.style.backgroundImage = "url(images/start.png)";
    document.getElementById("seekbar").style.backgroundSize = 0;
  });

  document.getElementById("seekbar").addEventListener("click", (e) => {
    const duration = Math.round(audio[i].duration);
    if (!isNaN(duration)) {
      const mouse = e.pageX;
      const element = document.getElementById("seekbar");
      const rect = element.getBoundingClientRect();
      const position = rect.left + window.pageXOffset;
      const offset = mouse - position;
      const width = rect.right - rect.left;
      audio[i].currentTime = Math.round(duration * (offset / width));
    }
  });
}

onload = function () {
  questions = document.getElementsByClassName("questionContainer");
  answer = document.getElementsByClassName("answer");

  // PCでのマウスでのスクロール禁止
  document.addEventListener("mousewheel", scroll_control, { passive: false });
  // スマホでのタッチ操作でのスクロール禁止
  document.addEventListener("touchmove", scroll_control, { passive: false });

  document.getElementById("backHome").addEventListener("click", () => {
    location.href = "../index.html";
  });

  [].forEach.call(
    document.getElementsByClassName("submit"),
    (element, sindex) => {
      element.addEventListener("click", () => {
        if (answer[sindex].value === ans[sindex]) {
          correctFlag[sindex] = 1;

          if (correctFlag.reduce((p, c) => p + c) >= 4) {
            document.getElementById("headerRight").innerHTML = "end";
            goToFinish();
          } else {
            document.getElementById("headerRight").innerHTML =
              "question" + (sindex + 2);

            goToRight(sindex);
          }
        } else {
          alert("答えが間違っています");
        }
      });
    }
  );
};
