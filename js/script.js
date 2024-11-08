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

export let imgCachesReady = {};

export function checkImgChachStatus() {
  console.log(imgCachesReady);
}

function init() {
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  world = new World(canvas);
  window.world = world;
}

init();

function LOG() {
  console.log(world);
}
window.LOG = LOG;
