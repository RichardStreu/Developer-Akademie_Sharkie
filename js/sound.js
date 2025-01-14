let basicVolume = 0.5;
let isSoundMuted = false;

let musicVolume = 1;
let isMusicMuted = false;

let sfxVolume = 0.2;
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
    backgroundRetroArcade: new Audio("./assets/audio/retro-game-arcade-236133.mp3"),
    link: "./assets/audio/retro-game-arcade-236133.mp3",
    volume: 0.5,
    loop: true,
  },
  hurt1: {
    hurt1: new Audio("./assets/audio/edit/hurt/hurt1.mp3"),
    link: "./assets/audio/edit/hurt/hurt1.mp3",
    volume: 0.5,
    loop: false,
  },
  hurt2: {
    hurt2: new Audio("./assets/audio/edit/hurt/hurt2.mp3"),
    link: "./assets/audio/edit/hurt/hurt2.mp3",
    volume: 0.5,
    loop: false,
  },
  hurt3: {
    hurt3: new Audio("./assets/audio/edit/hurt/hurt3.mp3"),
    link: "./assets/audio/edit/hurt/hurt3.mp3",
    volume: 0.5,
    loop: false,
  },
  hurt4: {
    hurt4: new Audio("./assets/audio/edit/hurt/hurt4.mp3"),
    link: "./assets/audio/edit/hurt/hurt4.mp3",
    volume: 0.5,
    loop: false,
  },
  hurt5: {
    hurt5: new Audio("./assets/audio/edit/hurt/hurt5.mp3"),
    link: "./assets/audio/edit/hurt/hurt5.mp3",
    volume: 0.5,
    loop: false,
  },
  slap1: {
    slap1: new Audio("./assets/audio/edit/slap/slap1.mp3"),
    link: "./assets/audio/edit/slap/slap1.mp3",
    volume: 0.5,
    loop: false,
  },
  slap2: {
    slap2: new Audio("./assets/audio/edit/slap/slap2.mp3"),
    link: "./assets/audio/edit/slap/slap2.mp3",
    volume: 0.5,
    loop: false,
  },
  slap3: {
    slap3: new Audio("./assets/audio/edit/slap/slap3.mp3"),
    link: "./assets/audio/edit/slap/slap3.mp3",
    volume: 0.5,
    loop: false,
  },
  slap4: {
    slap4: new Audio("./assets/audio/edit/slap/slap4.mp3"),
    link: "./assets/audio/edit/slap/slap4.mp3",
    volume: 0.5,
    loop: false,
  },
  slap5: {
    slap5: new Audio("./assets/audio/edit/slap/slap5.mp3"),
    link: "./assets/audio/edit/slap/slap5.mp3",
    volume: 0.5,
    loop: false,
  },
  blub: {
    blub: new Audio("./assets/audio/edit/blub.mp3"),
    link: "./assets/audio/edit/blub.mp3",
    volume: 0.5,
    loop: false,
  },
  electroShock: {
    electroShock: new Audio("./assets/audio/edit/electro.mp3"),
    link: "./assets/audio/edit/electro.mp3",
    volume: 0.5,
    loop: false,
  },
  chewbacca: {
    chewbacca: new Audio("./assets/audio/chewbacca.swf.mp3"),
    link: "./assets/audio/chewbacca.swf.mp3",
    volume: 0.5,
    loop: false,
  },
  swim: {
    swim: new Audio("./assets/audio/edit/swim-short.mp3"),
    link: "./assets/audio/edit/swim-short.mp3",
    volume: 0.2,
    loop: true,
  },
};


export function playSfxSound(sound, delay = 0, loop = false) {
  let soundToPlay = sounds[sound][sound];
  soundToPlay.volume = sounds[sound].volume * sfxVolume * basicVolume;
  soundToPlay.loop = loop;
  setTimeout(() => {
    soundToPlay.play();
  }, delay);
}

export function playSwimSound() {
  if (!isCurrentSwimSoundPlaying) {
    currentSwimSound = sounds.swim.swim;
    currentSwimSound.volume = sounds.swim.volume * basicVolume;
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
        currentSwimSound.volume -= reduction;
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
    currentHurtSound = sounds[sound][sound];
    currentHurtSound.volume = sounds[sound].volume * sfxVolume * basicVolume;
    currentHurtSound.loop = false;
    currentHurtSound.play();
    isCurrentHurtSoundPlaying = true;
    currentHurtSound.addEventListener("ended", () => {
      isCurrentHurtSoundPlaying = false;
    });
  }
}

export function muteUnmuteSound() {
  if (!isSoundMuted) {
    basicVolume = 0;
  } else {
    basicVolume = 1;
  }
  isSoundMuted = !isSoundMuted;
}
