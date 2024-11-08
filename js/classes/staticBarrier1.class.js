import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Barrier1 extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/3. Background/Barrier/1.png");
    // this.img;
    this.x = 0;
    this.y = 0;
    this.width = canvasWidth;
    this.height = canvasHeight;
  }
}
