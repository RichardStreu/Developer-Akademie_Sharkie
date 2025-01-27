/**
 * @module "pufferFish.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";
import { enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class PufferFish extends MoveableObject {
  minX;
  maxX;
  moveForBackFactor = 0;
  forBackSpeed = 0;
  isImageCacheLoaded = false;

  currentAnimationIntervall;

  /**
   * Creates an instance of the PufferFish class.
   * Initializes the position and movement parameters of the puffer fish.
   */
  constructor() {
    super();
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + Math.random() * (enemyEndY - this.height);
    this.calculateMoveForBackFactor();
    this.calculateForBackSpeed();
    this.calculateMinMaxX();
  }

  /**
   * Asynchronously loads all image caches for the PufferFish class.
   * This method loads image caches for different states of the PufferFish,
   * including die, swim, transition, and bubble swim images.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when all image caches are loaded.
   */
  async loadAllImagesCachePuffer() {
    await this.loadImageCache(this.imagesDie, this.constructor.name);
    await this.loadImageCache(this.imagesSwim, this.constructor.name);
    await this.loadImageCache(this.imagesTransition, this.constructor.name);
    await this.loadImageCache(this.imagesBubbleSwim, this.constructor.name);
  }

  /**
   * Calculates and sets the moveForBackFactor property.
   * The factor is a random number between 0 and 1.
   * If the factor is less than 0.2, moveForBackFactor is set to 0.2.
   * Otherwise, moveForBackFactor is set to the random factor.
   */
  calculateMoveForBackFactor() {
    let factor = Math.random();
    if (factor < 0.2) {
      this.moveForBackFactor = 0.2;
    } else {
      this.moveForBackFactor = factor;
    }
  }

  /**
   * Calculates and sets the forward and backward speed for the puffer fish.
   * The speed is a random value between 1 and 4.
   */
  calculateForBackSpeed() {
    let speed = 1 + Math.random() * 3;
    this.forBackSpeed = speed;
  }

  /**
   * Calculates and sets the minimum and maximum X coordinates for the puffer fish.
   * 
   * The minimum X coordinate is determined by subtracting 400 times the moveForBackFactor from the current X coordinate.
   * If the calculated minimum X is less than the enemy's starting X coordinate, it is set to the enemy's starting X coordinate.
   * 
   * The maximum X coordinate is determined by adding 400 times the moveForBackFactor to the current X coordinate.
   * If the calculated maximum X is greater than the enemy's starting X coordinate plus the enemy's starting distance and the width of the puffer fish, 
   * it is set to the enemy's starting X coordinate plus the enemy's starting distance minus the width of the puffer fish.
   */
  calculateMinMaxX() {
    this.minX = this.x - 400 * this.moveForBackFactor;
    if (this.minX < enemyStartX) this.minX = enemyStartX;
    this.maxX = this.x + 400 * this.moveForBackFactor;
    if (this.maxX > enemyStartX + enemyStartDistX + this.width) this.maxX = enemyStartX + enemyStartDistX - this.width;
  }

  /**
   * Moves the puffer fish back and forth between the specified minimum and maximum X coordinates.
   *
   * @param {number} minX - The minimum X coordinate the puffer fish can move to.
   * @param {number} maxX - The maximum X coordinate the puffer fish can move to.
   * @param {number} speed - The speed at which the puffer fish moves.
   */
  forBackMovePufferFish(minX, maxX, speed) {
    this.moveFor = true;
    this.currentMovement = setInterval(() => {
      if (this.moveFor && this.x > minX) this.x -= speed;
      if (this.moveFor && this.x < minX) {
        this.moveFor = false;
        this.otherDirection = true;
      }
      if (!this.moveFor && this.x < maxX) this.x += speed;
      if (!this.moveFor && this.x > maxX) {
        this.moveFor = true;
        this.otherDirection = false;
      }
    }, 100);
  }

  /**
   * Clears the intervals for the current movement and animation.
   * 
   * This method stops the ongoing movement and animation by clearing their respective intervals.
   * It is useful to halt the puffer fish's actions when necessary.
   */
  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  /**
   * Handles the logic for when the enemy is dead.
   * - Stops the current movement and animation intervals.
   * - Updates the enemy's image to the dying state.
   * - Sets the enemy's dead status to true.
   * - Initiates the floating to surface behavior.
   * - Periodically checks if the enemy has floated off-screen and stops intervals if so.
   */
  enemyIsDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.img = this.imageCache[this.imagesDie[2]];
    this.isEnemyDead = true;
    this.floatToSurface();
    setInterval(() => {
      if (this.y < -1500) {
        clearInterval(this.currentMovement);
        clearInterval(this.currentAnimationIntervall);
      }
    }, 200);
  }
}
