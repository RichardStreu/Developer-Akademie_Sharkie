export function showSubMenu(groupNumber) {
  const controlScreen = document.getElementById("controlScreen");
  Array.from(controlScreen.querySelectorAll("button[data-group]")).forEach((button) => button.classList.remove("btnActive"));
  Array.from(controlScreen.querySelectorAll("div[data-group]")).forEach((div) => div.classList.add("d_none"));
  document.querySelector(`button[data-group="${groupNumber}"]`).classList.add("btnActive");
  document.querySelector(`div[data-group="${groupNumber}"]`).classList.remove("d_none");
}

export function toggleFullscreen() {
  const canvas = document.getElementById("canvas");
  canvas.requestFullscreen();
}
