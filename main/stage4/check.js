function flagCheck() {
  t = localStorage.stageFlag.split(",");
  console.log(t);
  if (t[2] !== 1) {
    history.back();
  }
}
