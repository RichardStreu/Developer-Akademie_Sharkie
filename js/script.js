import { MoveableObject } from "./classes/moveable-object.class.js";
window.MoveableObject = MoveableObject;

let canvas;
let ctx;
let character = new MoveableObject(200, null, "hallo Welt");
window.character = character;
window.ctx = ctx;

function init() {
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  console.log(character);
  
}
window.init = init;
