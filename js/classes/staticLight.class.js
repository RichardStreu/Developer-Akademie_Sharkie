import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Light extends MoveableObject {
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/1. Light/1.png");
    // this.img;
    this.x = x;
    this.y = y;
    this.width = canvasWidth;
    this.height = canvasHeight;
  }
}