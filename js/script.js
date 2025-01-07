import { World } from "./classes/world.class.js";

import { Keyboard } from "./classes/keyboard.class.js";

// with this ratio you can scale all moveable objects in one step
export let moveObjRatio = 1.2;
// with this ratio you can scale all static objects in one step
export let staticObjRatio = 1;
export let canvasWidth = 720;
export let canvasHeight = 480;
// minimum x position where an object respawns
export let enemyStartX = 200;
// maximum x position (+ enemyStartX) where an object respawns
export let enemyStartDistX = 2400;
// minimum y position where an object respawns
export let enemyStartY = 0;
// maximum y position where an object respawns
export let enemyEndY = 460;

let canvas;
let world;
export let keyboard = new Keyboard();

export let imgCachesObject = {};
export let areImgCachesReady = false;

export let loadedCachsArray = [];

function init() {
  if (world) {
    world.sharky.clearAllSharkyIntervals();
    world.level1.enemies[17].clearAllEndBossIntervals();
    world.clearCheckCollisionsInterval();
    world.statBars[1].clearLifeEnergyIntertval();
    world.clearWorld();
    console.log("SHARKY INTERVAL");
    world = null;
  }
  world = {};
  console.log("1: ", world);
  

  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  world = new World(canvas, keyboard);
  window.world = world;
  console.log("2: ", world);
  

  if (!areImgCachesReady) {
    let cacheStatus = setInterval(() => {
      checkImgChachStatus();
      if (areImgCachesReady) {
        clearInterval(cacheStatus);
      }
    }, 200);
  }
}

init();
window.init = init;

export function checkImgChachStatus() {
  if (!areImgCachesReady) {
    if (imgCachesObject) {
      let imagesReady = Object.values(imgCachesObject).every((value) => value === true);
      if (imagesReady) {
        areImgCachesReady = true;
        document.getElementById("startScreen").classList.remove("d_none");
        document.getElementById("loadingScreen").classList.add("d_none");
      }
    } else {
      throw new Error("Images cant be loaded");
    }
  }
}

export function switchScreens() {
  document.getElementById("blackScreen").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("blackScreen").classList.remove("opacity_zero");
  }, 10);
  setTimeout(() => {
    document.getElementById("blackScreen").classList.add("opacity_zero");
  }, 590);
  setTimeout(() => {
    document.getElementById("blackScreen").classList.add("d_none");
  }, 990);
}
window.switchScreens = switchScreens;

export function startGame() {
  switchScreens();
  setTimeout(() => {
    document.getElementById("startScreen").classList.add("d_none");
    document.getElementById("canvas").classList.remove("d_none");
  }, 500);
}
window.startGame = startGame;

export function restartGame() {
  switchScreens();
  setTimeout(() => {
    document.getElementById("winScreen").classList.add("d_none");
    document.getElementById("looseScreen").classList.add("d_none");
    document.getElementById("canvas").classList.add("d_none");
    canvas = "";
    setTimeout(() => {
      document.getElementById("canvas").classList.remove("d_none");
      world.sharky.x = 0;
      setTimeout(() => {
        init();
      }, 10);
    }, 50);
  }, 500);
}
window.restartGame = restartGame;

export function youWin() {
  document.getElementById("winScreen").classList.remove("d_none");
  console.log("You Win");
}

export function youLoose() {
  document.getElementById("looseScreen").classList.remove("d_none");
  console.log("You loose");
}
