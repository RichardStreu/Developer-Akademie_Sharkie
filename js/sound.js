let isSoundMuted = false;

export function muteUnmuteSound() {
  let muteImage = document.getElementById("muteImage");
  if (!isSoundMuted) {
    console.log("Sound is muted");
  } else {
    console.log("Sound is unmuted");
  }
  isSoundMuted = !isSoundMuted;
}
