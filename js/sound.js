let isSoundMuted = false;

export function muteUnmuteSound() {
  if (!isSoundMuted) {
    console.log("Sound is muted");
  } else {
    console.log("Sound is unmuted");
  }
  isSoundMuted = !isSoundMuted;
}
