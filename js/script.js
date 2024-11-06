import { World } from "./classes/world.class.js";

let canvas;
let ctx;
window.ctx = ctx;
let world = new World;

function init() {
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
}
window.init = init;

console.log(world);



