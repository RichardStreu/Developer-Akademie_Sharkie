/**
 * @module "staticWater.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";

export class Water extends MoveableObject {
  /**
   * Creates an instance of the staticWater class.
   * 
   * @param {number} [x=0] - The x-coordinate position of the water.
   * @param {number} [y=0] - The y-coordinate position of the water.
   */
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/5. Water/L.png");
    this.x = x;
    this.y = y;
    this.width = canvasWidth * 2;
    this.height = canvasHeight;
  }
}
