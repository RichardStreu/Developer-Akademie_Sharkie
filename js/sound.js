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

let sounds = {
  backgroundRetroArcade: {
    link: "audio/retro-game-arcade-236133.mp3",
    volume: 0.5,
    loop: true,
  },
  hurt: {
    hurt1: {
      link: "audio/edit/hurt/hurt1.mp3",
      volume: 0.5,
      loop: false,
    },
    hurt2: {
      link: "audio/edit/hurt/hurt2.mp3",
      volume: 0.5,
      loop: false,
    },
    hurt3: {
      link: "audio/edit/hurt/hurt3.mp3",
      volume: 0.5,
      loop: false,
    },
    hurt4: {
      link: "audio/edit/hurt/hurt4.mp3",
      volume: 0.5,
      loop: false,
    },
    hurt5: {
      link: "audio/edit/hurt/hurt5.mp3",
      volume: 0.5,
      loop: false,
    },
  },
  slap: {
    slap1: {
      link: "audio/edit/slap/slap1.mp3",
      volume: 0.5,
      loop: false,
    },
    slap2: {
      link: "audio/edit/slap/slap2.mp3",
      volume: 0.5,
      loop: false,
    },
    slap3: {
      link: "audio/edit/slap/slap3.mp3",
      volume: 0.5,
      loop: false,
    },
    slap4: {
      link: "audio/edit/slap/slap4.mp3",
      volume: 0.5,
      loop: false,
    },
    slap5: {
      link: "audio/edit/slap/slap5.mp3",
      volume: 0.5,
      loop: false,
    },
  },
  blub: {
    link: "audio/edit/blub.mp3",
    volume: 0.5,
    loop: false,
  },
  electroShock: {
    link: "audio/edit/electro.mp3",
    volume: 0.5,
    loop: false,
  },
  chewbacca: {
    link: "audio/chewbacca.swf.mp3",
    volume: 0.5,
    loop: false,
  }
};
