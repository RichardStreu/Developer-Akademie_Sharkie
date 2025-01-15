let firstSoundInit = false;

let basicVolume = 1;
let isSoundMuted = false;

let musicVolume = 1;
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

let sounds = {
  backgroundRetroArcade: {
    audio: new Audio("./assets/audio/retro-game-arcade-236133.mp3"),
    link: "./assets/audio/retro-game-arcade-236133.mp3",
    volume: 0.1,
    loop: true,
  },
  backgroundMetal: {
    audio: new Audio("./assets/audio/metal.mp3"),
    link: "./assets/audio/metal.mp3",
    volume: 0.1,
    loop: true,
  },
  hurt1: {
    audio: new Audio("./assets/audio/edit/hurt/hurt1.mp3"),
    link: "./assets/audio/edit/hurt/hurt1.mp3",
    volume: 0.5,
    loop: false,
  },
  hurt2: {
    audio: new Audio("./assets/audio/edit/hurt/hurt2.mp3"),
    link: "./assets/audio/edit/hurt/hurt2.mp3",
    volume: 0.5,
    loop: false,
  },
  hurt3: {
    audio: new Audio("./assets/audio/edit/hurt/hurt3.mp3"),
    link: "./assets/audio/edit/hurt/hurt3.mp3",
    volume: 0.5,
    loop: false,
  },
  hurt4: {
    audio: new Audio("./assets/audio/edit/hurt/hurt4.mp3"),
    link: "./assets/audio/edit/hurt/hurt4.mp3",
    volume: 0.5,
    loop: false,
  },
  hurt5: {
    audio: new Audio("./assets/audio/edit/hurt/hurt5.mp3"),
    link: "./assets/audio/edit/hurt/hurt5.mp3",
    volume: 0.5,
    loop: false,
  },
  slap1: {
    audio: new Audio("./assets/audio/edit/slap/slap1.mp3"),
    link: "./assets/audio/edit/slap/slap1.mp3",
    volume: 0.5,
    loop: false,
  },
  slap2: {
    audio: new Audio("./assets/audio/edit/slap/slap2.mp3"),
    link: "./assets/audio/edit/slap/slap2.mp3",
    volume: 0.5,
    loop: false,
  },
  slap3: {
    audio: new Audio("./assets/audio/edit/slap/slap3.mp3"),
    link: "./assets/audio/edit/slap/slap3.mp3",
    volume: 0.5,
    loop: false,
  },
  slap4: {
    audio: new Audio("./assets/audio/edit/slap/slap4.mp3"),
    link: "./assets/audio/edit/slap/slap4.mp3",
    volume: 0.5,
    loop: false,
  },
  slap5: {
    audio: new Audio("./assets/audio/edit/slap/slap5.mp3"),
    link: "./assets/audio/edit/slap/slap5.mp3",
    volume: 0.5,
    loop: false,
  },
  blub: {
    audio: new Audio("./assets/audio/edit/blub.mp3"),
    link: "./assets/audio/edit/blub.mp3",
    volume: 0.3,
    loop: false,
  },
  electroShock: {
    audio: new Audio("./assets/audio/edit/electro.mp3"),
    link: "./assets/audio/edit/electro.mp3",
    volume: 0.5,
    loop: false,
  },
  chewbacca: {
    audio: new Audio("./assets/audio/chewbacca.swf.mp3"),
    link: "./assets/audio/chewbacca.swf.mp3",
    volume: 0.5,
    loop: false,
  },
  swim: {
    audio: new Audio("./assets/audio/edit/swim-short.mp3"),
    link: "./assets/audio/edit/swim-short.mp3",
    volume: 0.5,
    loop: true,
  },
  coin: {
    audio: new Audio("./assets/audio/edit/subway-surfers-coin-collect.mp3"),
    link: "./assets/audio/edit/subway-surfers-coin-collect.mp3",
    volume: 1,
    loop: true,
  },
  bottle: {
    audio: new Audio("./assets/audio/edit/bottle-pop-open.mp3"),
    link: "./assets/audio/edit/bottle-pop-open.mp3",
    volume: 0.5,
    loop: true,
  },
  hover: {
    audio: new Audio("./assets/audio/edit/hover-sound-effect.mp3"),
    link: "./assets/audio/edit/hover-sound-effect.mp3",
    volume: 0.15,
    loop: true,
  },
  click: {
    audio: new Audio("./assets/audio/edit/button-click.mp3"),
    link: "./assets/audio/edit/button-click.mp3",
    volume: 0.1,
    loop: true,
  },
  bossSplash: {
    audio: new Audio("./assets/audio/edit/water-for-drama.mp3"),
    link: "./assets/audio/edit/water-for-drama.mp3",
    volume: 0.4,
    loop: true,
  },
  bossScream: {
    audio: new Audio("./assets/audio/chewbacca.swf.mp3"),
    link: "./assets/audio/chewbacca.swf.mp3",
    volume: 0.3,
    loop: true,
  },
};

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
  soundToPlay.volume = sounds[sound].volume * sfxVolume * basicVolume;
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

export function muteUnmuteSound() {
  if (!isSoundMuted) {
    document.getElementById("muteButtonDiv").classList.add("settingsImgBoxPushed");
    if (currentSwimSound) currentSwimSound.muted = true;
    sounds.backgroundRetroArcade.audio.muted = true;
    basicVolume = 0;
  } else {
    document.getElementById("muteButtonDiv").classList.remove("settingsImgBoxPushed");
    if (currentSwimSound) currentSwimSound.muted = false;
    sounds.backgroundRetroArcade.audio.muted = false;
    basicVolume = 1;
  }
  isSoundMuted = !isSoundMuted;
}
