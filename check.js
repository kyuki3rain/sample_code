onload = () => {
  t = localStorage.stageFlag.split(",");
  console.log(t);
  if (t.reduce((p, c) => Number(p) + Number(c)) < 4) {
    history.back();
  }
};
