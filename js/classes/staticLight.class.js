import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Light extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/3. Background/Layers/1. Light/1.png");
    // this.img;
    this.x = 0;
    this.y = 0;
    this.width = canvasWidth;
    this.height = canvasHeight;
  }
}