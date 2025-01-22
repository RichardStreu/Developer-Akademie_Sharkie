import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Water extends MoveableObject {
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/5. Water/L.png");
    this.x = x;
    this.y = y;
    this.width = canvasWidth * 2;
    console.log("Water width: " + this.width);
    
    this.height = canvasHeight;
  }
}
