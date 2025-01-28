/**
 * @module "poison.class.js"
 */

import { DrawableObject } from "./drawable-object.class.js";

export class Poison extends DrawableObject {
  imagesPoison = ["../../assets/img/4. Marcadores/Posión/Light - Left.png", "../../assets/img/4. Marcadores/Posión/Light - Right.png"];

  /**
   * Creates an instance of the Poison class.
   * 
   * @constructor
   * @param {number} x - The x-coordinate of the poison object.
   * @param {number} y - The y-coordinate of the poison object.
   * @param {number} index - The index of the poison object.
   */
  constructor(x, y, index) {
    super();
    this.loadImage(this.imagesPoison[Math.floor(Math.random() * 2)]);
    this.height = 68;
    this.width = 50;
    this.x = x;
    this.y = y;
    this.index = index;
  }
}
