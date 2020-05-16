function flagCheck() {
  t = localStorage.stageFlag.split(",");
  console.log(t);
  if (t[0] != 1) {
    history.back();
  }
}

function stepflagCheck(i) {
  t = localStorage.stage2Flag.split(",");
  console.log(t);
  if (t[i] != 1) {
    history.back();
  }
}
