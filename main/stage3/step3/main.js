const MIN_DISTANCE = 200;

const ANIMALS = [
  "うし",
  "いぬ",
  "ねこ",
  "ごりら",
  "ぺんぎん",
  "とら",
  "あざらし",
  "らいおん",
];

let area;

function distance(x, y) {
  return Math.sqrt(x * x + y * y);
}

const makePosition = () => {
  return {
    top: Math.random() * area.height,
    left: Math.random() * area.width,
  };
};

onload = function () {
  document.getElementById("backHome").addEventListener("click", () => {
    location.href = "../";
  });

  let animals = document.getElementsByClassName("animals");
  area = document.getElementsByClassName("main")[0].getBoundingClientRect();

  var query_string = window.location.search;
  let parameter_key = "anim";
  var match_condition = new RegExp(parameter_key + "=[A-Za-z0-9-_%]+");
  if ((parameter = query_string.match(match_condition))) {
    parameter_value = parameter[0].split("=")[1];
    console.log(query_string, parameter_value);
  }

  [].forEach.call(animals, (animal, i) => {
    let position = makePosition();
    animal.style.top = position.top + "px";
    animal.style.left = position.left + "px";
    console.log(animal.style.top);
    animal.addEventListener("click", () => {
      query_string = query_string.replace(
        match_condition,
        parameter_key + "=" + ANIMALS[i]
      );
      location.href = "../index.html" + query_string;
    });
  });

  document.body.addEventListener(
    "mousemove",
    (e) => {
      [].forEach.call(animals, (animal, i) => {
        let rect = animal.getBoundingClientRect();
        let starty = rect.top + rect.height / 2 - e.pageY;
        let startx = rect.left + rect.width / 2 - e.pageX;

        let x = startx,
          y = starty;
        while (distance(x, y) < MIN_DISTANCE) {
          x += startx / 10;
          y += starty / 10;
        }

        let top = y + e.pageY - rect.height / 2 - area.top;
        let left = x + e.pageX - rect.width / 2 - area.left;
        console.log(area.top, area.left);

        if (top < 0) top = 0;
        if (left < 0) left = 0;
        if (top > area.height - rect.height) top = area.height - rect.height;
        if (left > area.width - rect.width) left = area.width - rect.width;

        animal.style.top = top + "px";
        animal.style.left = left + "px";
      });
    },
    false
  );
};
