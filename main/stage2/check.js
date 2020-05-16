function flagCheck() {
  t = localStorage.stageFlag.split(",");
  console.log(t);
  if (t[0] !== 1) {
    history.back();
  }
}
