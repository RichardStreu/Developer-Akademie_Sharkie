import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Fondo1 extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/3. Background/Layers/3.Fondo 1/L.png");
    // this.img;
    this.x = 0;
    this.y = 0;
    this.width = canvasWidth * 2;
    this.height = canvasHeight;
  }
}