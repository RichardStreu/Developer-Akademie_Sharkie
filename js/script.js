import { World } from "./classes/world.class.js";

export let moveObjRatio = 1.2;
export let staticObjRatio = 1;
export let canvasWidth = 720;
export let canvasHeight = 480;
export let enemyStartX = 200;
export let enemyStartDistX = 400;
export let enemyStartY = 0;
export let enemyEndY = 460;
let canvas;
let world;

export let imgCachesObject = {};
export let areImgCachesReady = false;

export let loadedCachsArray = [];

export function checkImgChachStatus() {
  if (imgCachesObject) {
    let imagesReady = Object.values(imgCachesObject).every((value) => value === true);
    if (imagesReady) {
      areImgCachesReady = true;
      // setTimeout(() => {
      // debugger;
      document.getElementById("canvas").classList.remove("visibility_hidden");
      document.getElementById("loadingScreen").classList.add("d_none");

      // }, 200); // minimum time of loading screen visibility
    }
  } else {
    throw new Error("Images cant be loaded");
  }
}

function gdhdsos() {
  
}

function init() {
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  world = new World(canvas);
  window.world = world;

  let cacheStatus = setInterval(() => {
    checkImgChachStatus();
    if (areImgCachesReady) {
      clearInterval(cacheStatus);
    }
  }, 200);
}

init();

function LOG() {
  console.log(world);
}
window.LOG = LOG;
