import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Fondo2 extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/3. Background/Layers/4.Fondo 2/L.png");
    // this.img;
    this.x = 0;
    this.y = 0;
    this.width = canvasWidth * 2;
    this.height = canvasHeight;
  }
}