import { MoveableObject } from "./classes/moveable-object.class.js";
window.MoveableObject = MoveableObject;

let canvas;
let ctx;
let characterSharkie = new Image();
window.characterSharkie = characterSharkie;
window.ctx = ctx;

function init() {
  canvas = document.getElementById("canvas");
  characterSharkie.src = "../assets/img/1.Sharkie/1.IDLE/1.png";

  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;

  ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  setTimeout(() => {
    ctx.drawImage(characterSharkie, 20, 20, 450, 350);
  }, 500);
}
window.init = init;
