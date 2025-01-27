/**
 * @module "staticFondo1.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";
import { sharkyWidth } from "./sharky.class.js";

export class Fondo1 extends MoveableObject {
  sharkyX;
  sharkyY;
  world;

  /**
   * Creates an instance of the class and initializes its properties.
   * 
   * @param {number} [x=0] - The x-coordinate of the instance.
   * @param {number} [y=0] - The y-coordinate of the instance.
   */
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/3.Fondo 1/L.png");
    this.x = x;
    this.y = y;
    this.width = canvasWidth * 2;
    this.height = canvasHeight;
    this.sharkyMidPoint = canvasWidth / 2 - sharkyWidth / 2 - 50;
    this.getSharkyPosition(this.x, this.sharkyMidPoint);
  }

  /**
   * Continuously updates the position of Sharky and moves the background accordingly.
   *
   * @param {number} x - The x-coordinate to compare with Sharky's position.
   * @param {number} sharkyMidPoint - The midpoint value to determine Sharky's position relative to the background.
   */
  getSharkyPosition(x, sharkyMidPoint) {
    setInterval(() => {
      if (this.world.sharky) {
        this.sharkyX = this.world.sharky.x;
        this.moveFondo1(this.sharkyX, x, sharkyMidPoint);
      }
    }, 50);
  }

  /**
   * Moves the background based on the shark's position.
   *
   * @param {number} sharkyX - The current x-coordinate of the shark.
   * @param {number} x - The current x-coordinate of the background.
   * @param {number} sharkyMidPoint - The midpoint of the shark's x-coordinate.
   */
  moveFondo1(sharkyX, x, sharkyMidPoint) {
    if (x < 1 && sharkyX > sharkyMidPoint && sharkyX < canvasWidth * 3.5 - sharkyWidth) {
      this.x = sharkyX * 0.2 - 30;
    } else if (x > 1 && sharkyX > sharkyMidPoint && sharkyX < canvasWidth * 3.5 - sharkyWidth) {
      this.x = sharkyX * 0.2 + x - 30;
    }
  }
}
