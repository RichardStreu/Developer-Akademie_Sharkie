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

let isControlScreenVisible = false;

function showHideControlScreen() {
  if (!isControlScreenVisible) {
    document.getElementById("controlScreen").classList.add("d_none");
    isControlScreenVisible = false;
  } else {
    document.getElementById("controlScreen").classList.remove("d_none");
    isControlScreenVisible = true;
  }
}

function init() {
  if (world) clearGlobalGame();
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  world = new World(canvas, keyboard);
  world.sharky.setSharkyWindowEventListeners();
  if (!areImgCachesReady && world) {
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

function clearGlobalGame() {
  world.level1.enemies[17].clearAllEndBossIntervals();
  world.sharky.clearAllSharkyIntervals();
  world.sharky.removeSharkyWindowEventListeners();
  world.clearCheckCollisionsInterval();
  world.statBars[1].clearLifeEnergyIntertval();
  world.clearWorld();
  world.sharky = null;
  world = null;
}

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

    // document.getElementById("winScreen").classList.remove("d_none");
    // document.getElementById("winScreen").classList.remove("opacity_zero");

    world.startDrawing();
  }, 500);
}
window.startGame = startGame;

export function restartGame() {
  switchScreens();
  setTimeout(() => {
    document.getElementById("winScreen").classList.add("d_none");
    document.getElementById("looseScreen").classList.add("d_none");
    setTimeout(() => {
      world.sharky.x = 0;
      setTimeout(() => {
        init();
        // location.reload();
        world.sharky.setSharkyWindowEventListeners();
        world.startDrawing();
        // document.getElementById("startScreen").classList.add("d_none");
      }, 10);
    }, 50);
  }, 500);
}
window.restartGame = restartGame;

export function youWin() {
  document.getElementById("winScreen").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("winScreen").classList.remove("opacity_zero");
  }, 20);
}

export function youLoose() {
  document.getElementById("looseScreen").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("looseScreen").classList.remove("opacity_zero");
  }, 20);
}
