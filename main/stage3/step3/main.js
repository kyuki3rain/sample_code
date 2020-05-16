let area;

function changePer(x, y) {
  return {
    x: Math.floor(((x - area.left) / area.width) * 100),
    y: Math.floor(((y - area.top) / area.height) * 100),
  };
}

onload = function () {
  document.getElementById("backHome").addEventListener("click", () => {
    location.href = "../";
  });

  area = document.getElementsByClassName("main")[0].getBoundingClientRect();

  document.body.addEventListener("mousemove", (e) => {
    let per = changePer(e.pageX, e.pageY);
    document.getElementById("wrapper").style.clipPath =
      "circle(12% at " + per.x + "% " + per.y + "%)";
    document.getElementById("room").style.clipPath =
      "circle(10% at " + per.x + "% " + per.y + "%)";
  });
};
