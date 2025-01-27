/**
 * @module "staticLight.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";
import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class Light extends MoveableObject {
  sharkyX;
  sharkyY;

  /**
   * Creates an instance of the class and initializes its properties.
   * 
   * @constructor
   * @param {number} [x=0] - The x-coordinate of the light.
   * @param {number} [y=0] - The y-coordinate of the light.
   */
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/1. Light/1.png");
    this.x = x;
    this.y = y;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.sharkyMidPoint = canvasWidth / 2 - sharkyWidth / 2 - 50;
    this.getSharkyPosition(x, this.sharkyMidPoint);
  }

  /**
   * Continuously updates the sharky's position and moves the light accordingly.
   *
   * @param {number} x - The x-coordinate to move the light to.
   * @param {number} sharkyMidPoint - The midpoint of the sharky.
   */
  getSharkyPosition(x, sharkyMidPoint) {
    setInterval(() => {
      this.sharkyX = sharkyXPosition;
      this.sharkyY = sharkyYPosition;
      this.moveLightLeft(this.sharkyX, x, sharkyMidPoint);
    }, 50);
  }

  /**
   * Moves the light source to the left based on the position of the shark.
   *
   * @param {number} sharkyX - The current X position of the shark.
   * @param {number} x - The current X position of the light.
   * @param {number} sharkyMidPoint - The midpoint of the shark.
   */
  moveLightLeft(sharkyX, x, sharkyMidPoint) {
    const interpolation = (start, end, amount) => (1 - amount) * start + amount * end;
    const smoothFactor = 0.1;

    if (x < 1 && sharkyX > sharkyMidPoint && sharkyX > 0 && sharkyX < canvasWidth * 3.5 - sharkyWidth) {
      this.x = interpolation(this.x, sharkyX - sharkyMidPoint, smoothFactor);
    } else if (x > 1 && sharkyX <= 0) {
      this.x = interpolation(this.x, 0, smoothFactor);
    }
  }
}
