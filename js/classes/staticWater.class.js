import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Water extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/3. Background/Layers/5. Water/L.png");
    // this.img;
    this.x = 0;
    this.y = 0;
    this.width = canvasWidth * 2;
    this.height = canvasHeight;
  }
}
