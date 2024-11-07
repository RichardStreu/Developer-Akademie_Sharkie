import { World } from "./classes/world.class.js";

let canvas;
let world;
window.world = world;

function init() {
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  world = new World(canvas);
}
window.init = init;
init();

console.log(world);

function LOG() {
  console.log(world.draw());
}
window.LOG = LOG;
