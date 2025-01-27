/**
 * @module "sound.js"
 */

let firstSoundInit = false;
let basicVolume = 0.5;
let isSoundMuted = false;
let musicVolume = 0.8;
let sfxVolume = 1;
let currentSwimSound;
let isCurrentSwimSoundPlaying = false;
let isCurrentHurtSoundPlaying = false;

export let sounds = {
  backgroundRetroArcade: {
    audio: new Audio("./assets/audio/retro-game-arcade-236133.mp3"),
    link: "./assets/audio/retro-game-arcade-236133.mp3",
    volume: 0.1,
    loop: true,
    type: "music",
  },
  backgroundMetal: {
    audio: new Audio("./assets/audio/metal.mp3"),
    link: "./assets/audio/metal.mp3",
    volume: 0.5,
    loop: true,
    type: "music",
  },
  backgroundLose: {
    audio: new Audio("./assets/audio/lose-music.mp3"),
    link: "./assets/audio/lose-music.mp3",
    volume: 0.4,
    loop: true,
    type: "music",
  },
  backgroundWin: {
    audio: new Audio("./assets/audio/winMusic.mp3"),
    link: "./assets/audio/winMusic.mp3",
    volume: 0.5,
    loop: true,
    type: "music",
  },
  hurt1: {
    audio: new Audio("./assets/audio/edit/hurt/hurt1.mp3"),
    link: "./assets/audio/edit/hurt/hurt1.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  hurt2: {
    audio: new Audio("./assets/audio/edit/hurt/hurt2.mp3"),
    link: "./assets/audio/edit/hurt/hurt2.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  hurt4: {
    audio: new Audio("./assets/audio/edit/hurt/hurt4.mp3"),
    link: "./assets/audio/edit/hurt/hurt4.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  slap1: {
    audio: new Audio("./assets/audio/edit/slap/slap1.mp3"),
    link: "./assets/audio/edit/slap/slap1.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  blub: {
    audio: new Audio("./assets/audio/edit/blub.mp3"),
    link: "./assets/audio/edit/blub.mp3",
    volume: 0.2,
    loop: false,
    type: "sfx",
  },
  electroShock: {
    audio: new Audio("./assets/audio/edit/electro.mp3"),
    link: "./assets/audio/edit/electro.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  swim: {
    audio: new Audio("./assets/audio/edit/swim-short.mp3"),
    link: "./assets/audio/edit/swim-short.mp3",
    volume: 0.6,
    loop: true,
    type: "sfx",
  },
  coin: {
    audio: new Audio("./assets/audio/edit/subway-surfers-coin-collect.mp3"),
    link: "./assets/audio/edit/subway-surfers-coin-collect.mp3",
    volume: 1,
    loop: false,
    type: "sfx",
  },
  bottle: {
    audio: new Audio("./assets/audio/edit/bottle-pop-open.mp3"),
    link: "./assets/audio/edit/bottle-pop-open.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  hover: {
    audio: new Audio("./assets/audio/edit/hover-sound-effect.mp3"),
    link: "./assets/audio/edit/hover-sound-effect.mp3",
    volume: 0.15,
    loop: false,
    type: "sfx",
  },
  click: {
    audio: new Audio("./assets/audio/edit/button-click.mp3"),
    link: "./assets/audio/edit/button-click.mp3",
    volume: 0.1,
    loop: false,
    type: "sfx",
  },
  bossSplash: {
    audio: new Audio("./assets/audio/edit/water-for-drama.mp3"),
    link: "./assets/audio/edit/water-for-drama.mp3",
    volume: 0.4,
    loop: false,
    type: "sfx",
  },
  bossScream: {
    audio: new Audio("./assets/audio/chewbacca.swf.mp3"),
    link: "./assets/audio/chewbacca.swf.mp3",
    volume: 0.3,
    loop: false,
    type: "sfx",
  },
  snore: {
    audio: new Audio("./assets/audio/snorker.mp3"),
    link: "./assets/audio/snorker.mp3",
    volume: 0.2,
    loop: true,
    type: "sfx",
  },
};
window.sounds = sounds;


/**
 * Initializes the first sound by setting a flag to true.
 * Ensures that sound playback only starts after the first interaction.
 */
export function initFirstSound() {
  if (!firstSoundInit) firstSoundInit = true;
}

/**
 * Plays a sound effect or music track.
 *
 * @param {string} sound - The key of the sound to play from the sounds object.
 * @param {number} [delay=0] - The delay in milliseconds before the sound starts playing.
 * @param {boolean} [loop=false] - Whether the sound should loop when it ends.
 * @param {number} [currentTime=0] - The starting point in the audio track, in seconds.
 */
export function playSfxSound(sound, delay = 0, loop = false, currentTime = 0) {
  if ((sound === "hover" && !firstSoundInit) || !sound) return;
  sounds[sound].type === "music" ? (sounds[sound].audio.volume = sounds[sound].volume * musicVolume * basicVolume) : (sounds[sound].audio.volume = sounds[sound].volume * sfxVolume * basicVolume);
  sounds[sound].audio.loop = loop;
  sounds[sound].audio.currentTime = currentTime;
  setTimeout(() => sounds[sound].audio.play(), delay);
}

/**
 * Plays the swimming sound effect if it is not already playing.
 * Stops any currently playing swimming sound before starting a new one.
 * Sets the volume and loop properties for the swimming sound.
 */
export function playSwimSound() {
  stopSwimSound("snore");
  if (!isCurrentSwimSoundPlaying) {
    currentSwimSound = sounds.swim.audio;
    currentSwimSound.volume = sounds.swim.volume * sfxVolume * basicVolume;
    currentSwimSound.loop = true;
    currentSwimSound.play();
    isCurrentSwimSoundPlaying = true;
  }
}
window.playSwimSound = playSwimSound;

/**
 * Gradually reduces the volume of the current swimming sound and stops it.
 * 
 * This function checks if the current swimming sound is playing. If it is, it gradually
 * reduces the volume over a specified duration and then pauses the sound.
 * 
 * @global {boolean} isCurrentSwimSoundPlaying - Indicates if the current swimming sound is playing.
 * @global {object} currentSwimSound - The audio object for the current swimming sound.
 * @global {number} currentSwimSound.volume - The volume of the current swimming sound.
 * @global {function} currentSwimSound.pause - Pauses the current swimming sound.
 */
export function stopSwimSound() {
  if (isCurrentSwimSoundPlaying) {
    let duration = 400;
    let steps = 20;
    let interval = duration / steps;
    let reduction = (currentSwimSound.volume - 0.05) / steps;
    for (let i = 1; i < steps; i++) {
      setTimeout(() => {
        if (currentSwimSound.volume > reduction) currentSwimSound.volume -= reduction;
      }, i * interval);
    }
    setTimeout(() => (currentSwimSound.pause(), (isCurrentSwimSoundPlaying = false)), duration);
  }
}
window.stopSwimSound = stopSwimSound;

/**
 * Plays the hurt sound effect if it is not already playing.
 *
 * @param {string} sound - The key of the sound to be played from the sounds object.
 */
export function playHurtSound(sound) {
  if (!isCurrentHurtSoundPlaying) {
    isCurrentHurtSoundPlaying = true;
    playSfxSound(sound);
    sounds[sound].audio.addEventListener("ended", () => (isCurrentHurtSoundPlaying = false));
  }
}

/**
 * Stops the specified sound by pausing its audio.
 *
 * @param {string} sound - The key of the sound to stop.
 */
export function stopSound(sound) {
  sounds[sound].audio.pause();
}

/**
 * Stops all looping sounds by pausing their audio.
 * Iterates through the `sounds` object and pauses the audio of each sound that is set to loop.
 */
export function stopAllLoopSounds() {
  for (let sound in sounds) {
    if (sounds[sound].loop) sounds[sound].audio.pause();
  }
}

/**
 * Mutes all game sounds and updates the mute button's appearance.
 * 
 * This function performs the following actions:
 * - Adds a CSS class to the mute button to indicate it has been pressed.
 * - Mutes the current swimming sound if it is playing.
 * - Mutes the background arcade, lose, win, and snore sounds.
 * - Sets the basic volume level to 0.
 */
function muteSound() {
  document.getElementById("muteButtonDiv").classList.add("settingsImgBoxPushed");
  if (currentSwimSound) currentSwimSound.muted = true;
  sounds.backgroundRetroArcade.audio.muted = true;
  sounds.backgroundLose.audio.muted = true;
  sounds.backgroundWin.audio.muted = true;
  sounds.snore.audio.muted = true;
  basicVolume = 0;
}

/**
 * Unmutes various sound elements in the application.
 * 
 * This function performs the following actions:
 * - Removes the "settingsImgBoxPushed" class from the mute button div.
 * - Unmutes the current swimming sound if it exists.
 * - Unmutes the background retro arcade sound.
 * - Sets the volume of the background metal sound based on the master volume and music volume.
 * - Unmutes the background lose sound.
 * - Unmutes the background win sound.
 * - Unmutes the snore sound.
 */
function unmuteSound() {
  document.getElementById("muteButtonDiv").classList.remove("settingsImgBoxPushed");
  if (currentSwimSound) currentSwimSound.muted = false;
  sounds.backgroundRetroArcade.audio.muted = false;
  basicVolume = document.getElementById("masterVolume").value / 100;
  sounds.backgroundMetal.audio.volume = basicVolume * musicVolume;
  sounds.backgroundLose.audio.muted = false;
  sounds.backgroundWin.audio.muted = false;
  sounds.snore.audio.muted = false;
}

/**
 * Toggles the sound between muted and unmuted states.
 * If the sound is currently not muted, it will mute the sound.
 * If the sound is currently muted, it will unmute the sound.
 * Updates the `isSoundMuted` flag accordingly.
 */
export function muteUnmuteSound() {
  if (!isSoundMuted) {
    muteSound();
  } else {
    unmuteSound();
  }
  isSoundMuted = !isSoundMuted;
}

/**
 * Changes the volume of the specified category and updates the UI to reflect the new volume level.
 *
 * @param {string} category - The category of the volume to change. Expected values are "music" or "master".
 * @param {number} value - The new volume level as a percentage (0-100).
 */
export function changeMusicVolume(category, value) {
  let newVolume = value / 100;
  document.getElementById(`${category == "music" ? "musicVolume" : "masterVolume"}`).style.background = `linear-gradient(to right, rgb(127, 255, 224) ${value}%, rgb(58, 124, 108) ${value}%)`;
  category === "music" ? categoryMusicVolumeChange(newVolume) : categoryMasterVolumeChange(newVolume);
}
window.changeMusicVolume = changeMusicVolume;

/**
 * Changes the volume of all music category sounds.
 *
 * @param {number} newVolume - The new volume level to set for the music category.
 */
function categoryMusicVolumeChange(newVolume) {
  musicVolume = newVolume;
  Object.entries(sounds).forEach((sound) => {
    if (sound[1].type === "music") sound[1].audio.volume = sound[1].volume * basicVolume * musicVolume;
  });
}

/**
 * Updates the volume of all sounds based on the new master volume.
 *
 * @param {number} newVolume - The new master volume level to set.
 */
function categoryMasterVolumeChange(newVolume) {
  basicVolume = newVolume;
  Object.entries(sounds).forEach((sound) => {
    sound[1].type === "music" ? (sound[1].audio.volume = sound[1].volume * basicVolume * musicVolume) : (sound[1].audio.volume = sound[1].volume * basicVolume * sfxVolume);
  });
}
