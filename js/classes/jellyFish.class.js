/**
 * @module "jellyFish.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";
import { enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class JellyFish extends MoveableObject {
  minY;
  maxY;
  moveUpDownFactor = 0;
  upDownSpeed = 0;
  isImageCacheLoaded = false;

  currentAnimationIntervall;

  /**
   * Constructs a new instance of the JellyFish class.
   * Initializes the position and movement parameters of the jellyfish.
   * 
   * @constructor
   */
  constructor() {
    super();
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + Math.random() * (enemyEndY - this.height);
    this.calculateMoveUpDownFactor();
    this.calculateUpDownSpeed();
    this.calculateMinMaxY();
  }

  /**
   * Calculates and sets the move up/down factor for the jellyfish.
   * The factor is a random number between 0 and 1. If the factor is less than 0.2,
   * it sets the moveUpDownFactor to 0.2. Otherwise, it sets the moveUpDownFactor to the random factor.
   */
  calculateMoveUpDownFactor() {
    let factor = Math.random();
    if (factor < 0.2) {
      this.moveUpDownFactor = 0.2;
    } else {
      this.moveUpDownFactor = factor;
    }
  }

  /**
   * Calculates and sets the up-down speed for the jellyfish.
   * The speed is a random value between 1 and 4.
   */
  calculateUpDownSpeed() {
    let speed = 1 + Math.random() * 3;
    this.upDownSpeed = speed;
  }

  /**
   * Calculates the minimum and maximum Y coordinates for the jellyfish movement.
   * 
   * This method sets the `minY` and `maxY` properties of the jellyfish instance.
   * The `minY` is calculated based on the current Y position and the starting Y position of the enemy.
   * The `maxY` is calculated based on the current Y position, the ending Y position of the enemy, 
   * the height of the jellyfish, and a movement factor.
   * 
   * @property {number} minY - The minimum Y coordinate the jellyfish can move to.
   * @property {number} maxY - The maximum Y coordinate the jellyfish can move to.
   */
  calculateMinMaxY() {
    this.minY = this.y - (this.y - enemyStartY) * this.moveUpDownFactor;
    this.maxY = this.y + (enemyEndY - this.height - this.y) * this.moveUpDownFactor;
  }

  /**
   * Moves the jellyfish up and down between the specified minimum and maximum Y coordinates.
   *
   * @param {number} minY - The minimum Y coordinate the jellyfish can move to.
   * @param {number} maxY - The maximum Y coordinate the jellyfish can move to.
   * @param {number} speed - The speed at which the jellyfish moves.
   */
  upDownJellyFish(minY, maxY, speed) {
    this.moveUp = true;
    this.currentMovement = setInterval(() => {
      if (this.moveUp && this.y > minY) this.y -= speed;
      if (this.moveUp && this.y < minY) this.moveUp = false;
      if (!this.moveUp && this.y < maxY) this.y += speed;
      if (!this.moveUp && this.y > maxY) this.moveUp = true;
    }, 100);
  }

  /**
   * Asynchronously loads and caches all images for the JellyFish class.
   * This method loads the images for both the swimming and dead states of the jellyfish.
   * 
   * @async
   * @function loadAllImagesCacheJellyFish
   * @returns {Promise<void>} A promise that resolves when all images are loaded and cached.
   */
  async loadAllImagesCacheJellyFish() {
    await this.loadImageCache(this.imagesSwim, this.constructor.name);
    await this.loadImageCache(this.imagesDead, this.constructor.name);
  }

}
