let count = 0;

let parentHeight, parentWidth, childHeight, childWidth;

let intervalIds = [];

const changeCount = (f) => {
  let length = document.getElementsByClassName("checkBox").length;
  if (f) {
    count++;
  } else {
    count--;
  }
  document.getElementById("count").innerHTML = count + "/" + length;
  if (count == length) {
    t = localStorage.stage2Flag.split(",");
    t[3] = 1;
    localStorage.stage2Flag = t;
    t = localStorage.stageFlag.split(",");
    t[1] = 1;
    localStorage.stageFlag = t;
    setTimeout(() => {
      alert("正解です。次のステージに進みます。");
      location.href = "../../stage3/index.html";
    }, 200);
  }
};

const makePosition = () => {
  return {
    top: Math.random() * (parentHeight - childHeight),
    left: Math.random() * (parentWidth - childWidth),
  };
};

onload = function () {
  document.getElementById("backHome").addEventListener("click", () => {
    location.href = "../";
  });

  let parent = document.getElementsByClassName("checkContainer")[0];
  let child = document.getElementsByClassName("checkBox")[0];

  parentHeight = parent.clientHeight;
  parentWidth = parent.clientWidth;
  childHeight = child.clientHeight;
  childWidth = child.clientWidth;

  document.getElementById("count").innerHTML =
    count + "/" + document.getElementsByClassName("checkBox").length;
  [].forEach.call(document.getElementsByClassName("checkBox"), (element, i) => {
    element.addEventListener("change", () => {
      changeCount(element.checked);
    });
  });

  [].forEach.call(document.getElementsByClassName("blink"), (element, i) => {
    let position = makePosition();
    element.style.top = position.top + "px";
    element.style.left = position.left + "px";
    let opacity = 0;
    let id = setInterval(() => {
      element.style.opacity = opacity + "%";
      opacity = -opacity + 100;
    }, 1000);
    intervalIds.push(id);
  });

  [].forEach.call(document.getElementsByClassName("movex"), (element, i) => {
    let position = makePosition();
    element.style.top = position.top + "px";
    element.style.left = position.left + "px";
    let top = position.top;
    let f = 1;
    let id = setInterval(() => {
      if (parentHeight - childHeight <= top) f = -1;
      else if (top <= 0) f = 1;
      top += f * 10 * (i + 1);
      element.style.top = top + "px";
    }, 500);
    intervalIds.push(id);
  });

  [].forEach.call(document.getElementsByClassName("movey"), (element, i) => {
    let position = makePosition();
    element.style.top = position.top + "px";
    element.style.left = position.left + "px";
    let left = position.left;
    let f = 1;
    let id = setInterval(() => {
      if (parentWidth - childWidth <= left) f = -1;
      else if (left <= 0) f = 1;
      left += f * 10 * (i + 1);
      element.style.left = left + "px";
    }, 500);
    intervalIds.push(id);
  });

  [].forEach.call(document.getElementsByClassName("teleport"), (element, i) => {
    let position = makePosition();
    element.style.top = position.top + "px";
    element.style.left = position.left + "px";
    let id = setInterval(() => {
      element.style.opacity = "0%";
      let position = makePosition();
      element.style.top = position.top + "px";
      element.style.left = position.left + "px";
      element.style.opacity = "100%";
    }, 3000);
    intervalIds.push(id);
  });

  document.getElementById("stop").addEventListener("click", () => {
    intervalIds.forEach((id) => {
      clearInterval(id);
    });
    [].forEach.call(
      document.getElementsByClassName("checkBox"),
      (element, i) => {
        element.style.opacity = "100%";
      }
    );
  });

  t = localStorage.stage2Flag.split(",");
  t[3] = 1;
  localStorage.stage2Flag = t;
};
