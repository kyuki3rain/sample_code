ans = ["富本銭", "富本銭", "富本銭", "富本銭"];
correctFlag = new Array(4).fill(0);

function scroll_control(event) {
  event.preventDefault();
}

function goToNextStage() {
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
