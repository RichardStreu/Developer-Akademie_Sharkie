/**
 * @module "staticFloor.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Floor extends MoveableObject {
  /**
   * Constructs a new instance of the class.
   * 
   * @param {number} [x=0] - The x-coordinate position.
   * @param {number} [y=0] - The y-coordinate position.
   */
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/2. Floor/L.png");
    this.x = x;
    this.y = y;
    this.width = canvasWidth * 2;
    this.height = canvasHeight;
  }
}