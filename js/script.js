import { World } from "./classes/world.class.js";

let canvas;
// let ctx;
// window.ctx = ctx;
let world;
window.world = world;

function init() {
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  world = new World(canvas);
  // ctx = canvas.getContext("2d");
  // ctx.scale(dpr, dpr);
  console.log(world);
}
window.init = init;

function LOG() {
  console.log(world.draw());
}
window.LOG = LOG;

window.moveElement = moveElement;
