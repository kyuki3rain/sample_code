ans = ["", "", "富本銭", "富本銭"];
correctFlag = new Array(4).fill(0);

function scroll_control(event) {
  event.preventDefault();
}

function goToNextStage() {
  t = localStorage.stageFlag.split(",");
  t[0] = 1;
  localStorage.stageFlag = t;
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

const play = () => {
  document.getElementsByTagName("video")[0].play();
  document.getElementById("play").style.display = "none";
  document.getElementById("pause").style.display = "flex";
};

const pause = () => {
  document.getElementsByTagName("video")[0].pause();
  document.getElementById("pause").style.display = "none";
  document.getElementById("play").style.display = "flex";
};

const stop = () => {
  document.getElementsByTagName("video")[0].pause();
  document.getElementsByTagName("video")[0].currentTime = 0;
  document.getElementById("pause").style.display = "none";
  document.getElementById("play").style.display = "flex";
};

function movieFunc() {
  let video = document.getElementsByTagName("video");

  document.getElementById("pause").addEventListener("click", pause);

  document.getElementById("play").addEventListener("click", play);

  document.getElementById("current").innerHTML = playTime(
    Math.floor(video[0].currentTime)
  );
  document.getElementById("duration").innerHTML = playTime(
    Math.round(video[0].duration)
  );

  document.getElementById("seekbar").addEventListener("click", (e) => {
    const duration = Math.round(video[0].duration);
    if (!isNaN(duration)) {
      const mouse = e.pageX;
      const element = document.getElementById("seekbar");
      const rect = element.getBoundingClientRect();
      const position = rect.left + window.pageXOffset;
      const offset = mouse - position;
      const width = rect.right - rect.left;
      video[0].currentTime = Math.round(duration * (offset / width));
      const percent =
        Math.round((video[0].currentTime / video[0].duration) * 1000) / 10;
      document.getElementById("seekbar").style.backgroundSize = percent + "%";
    }
  });

  video[0].addEventListener("timeupdate", (e) => {
    const current = Math.floor(video[0].currentTime);
    const duration = Math.round(video[0].duration);
    if (!isNaN(duration)) {
      document.getElementById("current").innerHTML = playTime(current);
      document.getElementById("duration").innerHTML = playTime(duration);
      const percent =
        Math.round((video[0].currentTime / video[0].duration) * 1000) / 10;
      document.getElementById("seekbar").style.backgroundSize = percent + "%";
    }
  });

  video[0].addEventListener("ended", () => stop(video[0]));
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

  movieFunc();

  [].forEach.call(
    document.getElementsByClassName("submit"),
    (element, sindex) => {
      element.addEventListener("click", () => {
        if (answer[sindex].value === ans[sindex]) {
          correctFlag[sindex] = 1;
          if (sindex == 1) pause();

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
