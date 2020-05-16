const answer = [3, 2, 1, 4, 0];

function remove(lines) {
  for (let i = 0; i < core.length; i++) {
    for (let j = 0; j < core.length; j++) {
      lines[i][j].hide();
    }
  }
}

onload = function () {
  flagCheck();
  stepflagCheck(0);
  document.getElementById("backHome").addEventListener("click", () => {
    location.href = "../";
  });

  core = document.getElementsByClassName("core");

  let lines = new Array(core.length);

  for (let i = 0; i < core.length; i++) {
    lines[i] = new Array(core.length);
    for (let j = i + 1; j < core.length; j++) {
      lines[i][j] = new LeaderLine(core[i], core[j], {
        color: "red",
        size: 5,
        path: "straight",
        endPlug: "behind",
        hide: true,
        showEffectName: "draw",
      });
    }
  }

  for (let i = 0; i < core.length; i++) {
    for (let j = i + 1; j < core.length; j++) {
      lines[i][j].hide();
    }
  }

  let prevButton = 0;
  let step = 0,
    point = 0;

  document.getElementById("reset").addEventListener("click", () => {
    for (let i = 0; i < core.length; i++) {
      for (let j = i + 1; j < core.length; j++) {
        lines[i][j].hide();
      }
    }
    prevButton = 0;
    point = 0;
    step = 0;
  });

  [].forEach.call(
    document.getElementsByClassName("button"),
    (element, index) => {
      element.addEventListener("click", () => {
        if (prevButton !== index) {
          i = Math.min(prevButton, index);
          j = Math.max(prevButton, index);
          lines[i][j].show();
          prevButton = index;
          if (answer[step] === index) {
            point++;
            if (point >= answer.length) {
              t = localStorage.stage2Flag.split(",");
              t[1] = 1;
              localStorage.stage2Flag = t;
              setTimeout(() => {
                alert("正解です。次の問題にすすみます。");
                location.href = "../step3/index.html";
              }, 200);
            }
          }
          step++;
        }
      });
    }
  );
};
