function flagCheck() {
  t = localStorage.stageFlag.split(",");
  console.log(t);
  if (t[1] != 1) {
    history.back();
  }
}
