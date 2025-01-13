
let basicVolume = 1;
let isSoundMuted = false;

let musicVolume = 1;
let isMusicMuted = false;

let sfxVolume = 1;
let isSfxMuted = false;

let currentHurtSound;
let isCurrentHurtSoundPlaying = false;

let currentSlapSound;
let isCurrentSlapSoundPlaying = false;

let currentBlubSound;
let isCurrentBlubSoundPlaying = false;

let sounds = {
  backgroundRetroArcade: {
    link: "./assets/audio/retro-game-arcade-236133.mp3",
    volume: 0.5,
    loop: true,
  },
  hurt: {
    hurt1: {
      hurt1: new Audio (this.link),
      link: "./assets/audio/edit/hurt/hurt1.mp3",
      volume: 0.5,
      loop: false,
    },
    hurt2: {
      hurt2: new Audio (this.link),
      link: "./assets/audio/edit/hurt/hurt2.mp3",
      volume: 0.5,
      loop: false,
    },
    hurt3: {
      hurt3: new Audio (this.link),
      link: "./assets/audio/edit/hurt/hurt3.mp3",
      volume: 0.5,
      loop: false,
    },
    hurt4: {
      hurt4: new Audio (this.link),
      link: "./assets/audio/edit/hurt/hurt4.mp3",
      volume: 0.5,
      loop: false,
    },
    hurt5: {
      hurt5: new Audio (this.link),
      link: "./assets/audio/edit/hurt/hurt5.mp3",
      volume: 0.5,
      loop: false,
    },
  },
  slap: {
    slap1: {
      slap1: new Audio (this.link),
      link: "./assets/audio/edit/slap/slap1.mp3",
      volume: 0.5,
      loop: false,
    },
    slap2: {
      slap2: new Audio (this.link),
      link: "./assets/audio/edit/slap/slap2.mp3",
      volume: 0.5,
      loop: false,
    },
    slap3: {
      slap3: new Audio (this.link),
      link: "./assets/audio/edit/slap/slap3.mp3",
      volume: 0.5,
      loop: false,
    },
    slap4: {slap4: new Audio (this.link),
      link: "./assets/audio/edit/slap/slap4.mp3",
      volume: 0.5,
      loop: false,
    },
    slap5: {
      slap5: new Audio (this.link),
      link: "./assets/audio/edit/slap/slap5.mp3",
      volume: 0.5,
      loop: false,
    },
  },
  blub: {
    blub: new Audio (this.link),
    link: "./assets/audio/edit/blub.mp3",
    volume: 0.5,
    loop: false,
  },
  electroShock: {
    electroShock: new Audio (this.link),  
    link: "./assets/audio/edit/electro.mp3",
    volume: 0.5,
    loop: false,
  },
  chewbacca: {
    chewbacca: new Audio (this.link),
    link: "./assets/audio/chewbacca.swf.mp3",
    volume: 0.5,
    loop: false,
  }
};

export function muteUnmuteSound() {
  let muteImage = document.getElementById("muteImage");
  if (!isSoundMuted) {
    console.log("Sound is muted");
  } else {
    console.log("Sound is unmuted");
  }
  isSoundMuted = !isSoundMuted;
}


