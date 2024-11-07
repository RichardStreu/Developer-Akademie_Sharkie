import { World } from "./classes/world.class.js";

let canvas;
let world;

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
