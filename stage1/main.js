window.onload = function () {
  document.getElementById("backHome").addEventListener("click", () => {
    window.location.href = "../index.html";
  });
  document.getElementById("submit").addEventListener("click", () => {
    if (document.getElementById("q1ans").value === "富本銭") {
      window.location.href = "../stage2/index.html";
    } else {
      window.alert("答えが間違っています");
    }
  });
};
