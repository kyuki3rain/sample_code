const answer = [0, 10, 10, 10, 1, 1, 1, 1, 1, 9, 0, 0, 0];
const changeWordCount = [1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4];

onload = function () {
  document.getElementById("backHome").addEventListener("click", () => {
    location.href = "../";
  });

  let i = 0;
  [].forEach.call(
    document.getElementsByClassName("button"),
    (element, index) => {
      element.addEventListener("click", () => {
        if (answer[i] === index) {
          if (i + 1 >= answer.length) {
            t = localStorage.stage2Flag.split(",");
            t[0] = 1;
            localStorage.stage2Flag = t;
            alert("正解です。次の問題にすすみます。");
            location.href = "../step2/index.html";
          } else {
            document.getElementById("password").innerHTML =
              ">>" + "*".repeat(changeWordCount[i]);
            console.log(changeWordCount[i]);
            i++;
          }
        } else {
          alert("答えが間違っています");
          document.getElementById("password").innerHTML = ">>";
          i = 0;
        }
      });
    }
  );
};
