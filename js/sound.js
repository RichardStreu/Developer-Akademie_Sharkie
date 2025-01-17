let firstSoundInit = false;

let basicVolume = 0.5;
let isSoundMuted = false;

let musicVolume = 0.8;
let isMusicMuted = false;
let currentMusic;

let sfxVolume = 1;
let isSfxMuted = false;

let currentSwimSound;
let isCurrentSwimSoundPlaying = false;

let currentHurtSound;
let isCurrentHurtSoundPlaying = false;

let currentSlapSound;
let isCurrentSlapSoundPlaying = false;

let currentBlubSound;
let isCurrentBlubSoundPlaying = false;

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
  hurt3: {
    audio: new Audio("./assets/audio/edit/hurt/hurt3.mp3"),
    link: "./assets/audio/edit/hurt/hurt3.mp3",
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
  hurt5: {
    audio: new Audio("./assets/audio/edit/hurt/hurt5.mp3"),
    link: "./assets/audio/edit/hurt/hurt5.mp3",
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
  slap2: {
    audio: new Audio("./assets/audio/edit/slap/slap2.mp3"),
    link: "./assets/audio/edit/slap/slap2.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  slap3: {
    audio: new Audio("./assets/audio/edit/slap/slap3.mp3"),
    link: "./assets/audio/edit/slap/slap3.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  slap4: {
    audio: new Audio("./assets/audio/edit/slap/slap4.mp3"),
    link: "./assets/audio/edit/slap/slap4.mp3",
    volume: 0.5,
    loop: false,
    type: "sfx",
  },
  slap5: {
    audio: new Audio("./assets/audio/edit/slap/slap5.mp3"),
    link: "./assets/audio/edit/slap/slap5.mp3",
    volume: 0.4,
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
  chewbacca: {
    audio: new Audio("./assets/audio/chewbacca.swf.mp3"),
    link: "./assets/audio/chewbacca.swf.mp3",
    volume: 0.4,
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
    volume: 0,
    loop: true,
    type: "sfx",
  },
};
window.sounds = sounds;

export function initHoverSound() {
  if (!firstSoundInit) {
    sounds.hover.audio.muted = true;
    setTimeout(() => {
      sounds.hover.audio.play();
    }, 50);
    setTimeout(() => {
      sounds.hover.audio.muted = false;
      firstSoundInit = true;
    }, 1000);
  }
}

export function playSfxSound(sound, delay = 0, loop = false, currentTime = 0) {
  let soundToPlay = sounds[sound].audio;
  sounds[sound].type === "music" ? (soundToPlay.volume = sounds[sound].volume * musicVolume * basicVolume) : (soundToPlay.volume = sounds[sound].volume * sfxVolume * basicVolume);
  soundToPlay.loop = loop;
  soundToPlay.currentTime = currentTime;
  setTimeout(() => {
    soundToPlay.play();
  }, delay);
}

export function playSwimSound() {
  if (!isCurrentSwimSoundPlaying) {
    currentSwimSound = sounds.swim.audio;
    currentSwimSound.volume = sounds.swim.volume * sfxVolume * basicVolume;
    currentSwimSound.loop = true;
    currentSwimSound.play();
    isCurrentSwimSoundPlaying = true;
  }
}
window.playSwimSound = playSwimSound;

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
    setTimeout(() => {
      currentSwimSound.pause();
      isCurrentSwimSoundPlaying = false;
    }, duration);
  }
}
window.stopSwimSound = stopSwimSound;

export function playHurtSound(sound) {
  if (!isCurrentHurtSoundPlaying) {
    currentHurtSound = sounds[sound].audio;
    currentHurtSound.volume = sounds[sound].volume * sfxVolume * basicVolume;
    currentHurtSound.loop = false;
    currentHurtSound.play();
    isCurrentHurtSoundPlaying = true;
    currentHurtSound.addEventListener("ended", () => {
      isCurrentHurtSoundPlaying = false;
    });
  }
}

export function stopSound(sound) {
  sounds[sound].audio.pause();
}

export function stopAllLoopSounds() {
  for (let sound in sounds) {
    if (sounds[sound].loop && sounds[sound].audio.currentTime > 0) {
      sounds[sound].audio.pause();
    }
  }
}

export function muteUnmuteSound() {
  if (!isSoundMuted) {
    document.getElementById("muteButtonDiv").classList.add("settingsImgBoxPushed");
    if (currentSwimSound) currentSwimSound.muted = true;
    sounds.backgroundRetroArcade.audio.muted = true;
    sounds.backgroundLose.audio.muted = true;
    sounds.backgroundWin.audio.muted = true;
    sounds.snore.audio.muted = true;
    basicVolume = 0;
  } else {
    document.getElementById("muteButtonDiv").classList.remove("settingsImgBoxPushed");
    if (currentSwimSound) currentSwimSound.muted = false;
    sounds.backgroundRetroArcade.audio.muted = false;
    basicVolume = document.getElementById("masterVolume").value / 100;
    sounds.backgroundMetal.audio.volume = basicVolume * musicVolume;
    sounds.backgroundLose.audio.muted = false;
    sounds.backgroundWin.audio.muted = false;
    sounds.snore.audio.muted = false;
  }
  isSoundMuted = !isSoundMuted;
}

export function changeMusicVolume(category, value) {
  let newVolume = value / 100;
  document.getElementById(`${category == "music" ? "musicVolume" : "masterVolume"}`).style.background = `linear-gradient(to right, rgb(127, 255, 224) ${value}%, rgb(58, 124, 108) ${value}%)`;
  if (category === "music") categoryMusicVolumeChange(newVolume);
  if (category === "master") categoryMasterVolumeChange(newVolume);
}
window.changeMusicVolume = changeMusicVolume;

function categoryMusicVolumeChange(newVolume) {
  musicVolume = newVolume;
  Object.entries(sounds).forEach((sound) => {
    if (sound[1].type === "music") {
      sound[1].audio.volume = sound[1].volume * basicVolume * musicVolume;
    }
  });
}

function categoryMasterVolumeChange(newVolume) {
  basicVolume = newVolume;
  Object.entries(sounds).forEach((sound) => {
    if (sound[1].type === "sfx") {
      sound[1].audio.volume = sound[1].volume * basicVolume * sfxVolume;
    }
    if (sound[1].type === "music") {
      sound[1].audio.volume = sound[1].volume * basicVolume * musicVolume;
    }
  });
}
