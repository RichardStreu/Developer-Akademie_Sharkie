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
export let enemyStartDistX = 400;
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
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  world = new World(canvas, keyboard);
  window.world = world;

  let cacheStatus = setInterval(() => {
    checkImgChachStatus();
    if (areImgCachesReady) {
      clearInterval(cacheStatus);
    }
  }, 200);
}

init();

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") keyboard.LEFT = true;
  if (event.key == "ArrowRight") keyboard.RIGHT = true;
  if (event.key == "ArrowUp") keyboard.UP = true;
  if (event.key == "ArrowDown") keyboard.DOWN = true;
  if (event.key == " ") keyboard.SPACE = true;
  if (event.key == "d") keyboard.DKey = true;
});

window.addEventListener("keyup", (event) => {
  if (event.key == "ArrowLeft") keyboard.LEFT = false;
  if (event.key == "ArrowRight") keyboard.RIGHT = false;
  if (event.key == "ArrowUp") keyboard.UP = false;
  if (event.key == "ArrowDown") keyboard.DOWN = false;
  if (event.key == " ") keyboard.SPACE = false;
  if (event.key == "d") keyboard.DKey = false;
});

export function checkImgChachStatus() {
  if (imgCachesObject) {
    let imagesReady = Object.values(imgCachesObject).every((value) => value === true);
    if (imagesReady) {
      areImgCachesReady = true;
      document.getElementById("canvas").classList.remove("visibility_hidden");
      document.getElementById("loadingScreen").classList.add("d_none");
    }
  } else {
    throw new Error("Images cant be loaded");
  }
}
