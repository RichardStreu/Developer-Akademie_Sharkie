import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Floor extends MoveableObject {
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/2. Floor/L.png");
    // this.img;
    this.x = x;
    this.y = y;
    this.width = canvasWidth * 2;
    this.height = canvasHeight;
  }
}