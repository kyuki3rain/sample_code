let area;

const ITEM_NAMES = [
  "びーる",
  "ああああ",
  "ああああ",
  "あああああ",
  "あああああ",
  "ああああ",
];

const ITEM_POSITIONS = [
  // [top,left]
  [400, 100],
  [100, 100],
  [100, 100],
  [100, 100],
  [100, 100],
  [100, 100],
  [100, 100],
  [100, 100],
];

const ITEM_SIZES = [200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

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

  items = document.getElementsByClassName("items");
  itemimages = document.getElementsByClassName("itemimages");

  for (let i = 0; i < items.length / 2; i++) {
    items[i].style.top = ITEM_POSITIONS[i][0] + "px";
    items[i].style.left = ITEM_POSITIONS[i][1] + "px";
    itemimages[i].style.width = ITEM_SIZES[i] + "px";
    items[i + items.length / 2].style.top = ITEM_POSITIONS[i][0] + "px";
    items[i + items.length / 2].style.left = ITEM_POSITIONS[i][1] + "px";
    itemimages[i + items.length / 2].style.width = ITEM_SIZES[i] + "px";
    console.log(items[i].style.top, items[i].style.left, items[i].style.width);
    var query_string = window.location.search;
    let parameter_key = "item";
    var match_condition = new RegExp(parameter_key + "=[A-Za-z0-9-_%]+");
    if ((parameter = query_string.match(match_condition))) {
      parameter_value = parameter[0].split("=")[1];
      console.log(query_string, parameter_value);
    }

    items[i].addEventListener("click", () => {
      query_string = query_string.replace(
        match_condition,
        parameter_key + "=" + ITEM_NAMES[i]
      );
      location.href = "../index.html" + query_string;
    });
  }
};
