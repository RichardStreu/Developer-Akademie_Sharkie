/**
 * @module "sharky.bubble.class.js"
 */

import { canvasHeight, canvasWidth } from "../script.js";
import { MoveableObject } from "./moveable-object.class.js";
import { playSfxSound } from "../sound.js";

export class SharkyBubble extends MoveableObject {
  world;
  direction;
  bubbleMoveInterval;
  hasBubbleHit = false;
  startPositionX;
  isFloatToSurface = false;
  collidingInterval;
  factor = 1;

  /**
   * Creates an instance of a Bubble.
   * 
   * @constructor
   * @param {Object} world - The game world object.
   * @param {string} direction - The direction in which the bubble will move ("left" or "right").
   */
  constructor(world, direction) {
    super();
    this.direction = direction;
    this.world = world;
    if (!this.world.sharky.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    if (this.world.sharky.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    if (direction == "left") {
      this.x = world.sharky.x + 20;
      this.y = world.sharky.y + 131;
    } else {
      this.x = world.sharky.x + 169;
      this.y = world.sharky.y + 131;
    }
    this.width = 25;
    this.height = 25;
    this.startPositionX = this.x;
    this.moveBubble();
    this.checkCollisions();
    this.checkPosition();
    playSfxSound("blub");
  }

  /**
   * Starts an interval to check the position of the bubble.
   * If the bubble's y-coordinate is less than -40, it clears the bubble intervals.
   * 
   * @method checkPosition
   * @memberof SharkyBubble
   */
  checkPosition() {
    this.checkPositionInterval = setInterval(() => {
      if (this.y < -40) {
        this.clearBubbleIntervals();
      }
    }, 50);
  }

  /**
   * Clears all bubble-related intervals.
   * 
   * This method stops the intervals responsible for moving bubbles,
   * checking for collisions, and checking the position of bubbles.
   * 
   * @method clearBubbleIntervals
   */
  clearBubbleIntervals() {
    clearInterval(this.bubbleMoveInterval);
    clearInterval(this.collidingInterval);
    clearInterval(this.checkPositionInterval);
  }

  /**
   * Moves the bubble in the specified direction at regular intervals.
   * 
   * This method sets an interval to move the bubble either to the left or to the right
   * based on the direction property. The bubble will move until it hits the edge of the
   * canvas or another condition is met.
   * 
   * @method moveBubble
   * @memberof Bubble
   * @instance
   */
  moveBubble() {
    this.bubbleMoveInterval = setInterval(() => {
      if (this.direction == "left" && this.x > -this.width && !this.hasBubbleHit) {
        this.moveBubbleTopLeft();
      }
      if (this.direction == "right" && this.x < canvasWidth * 4 && !this.hasBubbleHit) {
        this.moveBubbleToRight();
      }
    }, 10);
  }

  /**
   * Moves the bubble towards the top-left direction.
   * 
   * If the bubble's x-coordinate is less than or equal to the starting x-coordinate minus 80 and it has not yet floated to the surface,
   * it will trigger the floatToSurface method and set the isFloatToSurface flag to true.
   * 
   * If the bubble has not floated to the surface, it will move left by 5 units.
   * If the bubble has floated to the surface, it will move left by 5 units multiplied by a factor that decreases by 5% each time.
   */
  moveBubbleTopLeft() {
    if (this.x <= this.startPositionX - 80 && !this.isFloatToSurface) {
      this.floatToSurface();
      this.isFloatToSurface = true;
    }
    if (!this.isFloatToSurface) {
      this.x -= 5;
    } else {
      this.x -= 5 * this.factor;
      this.factor = this.factor * 0.95;
    }
  }

  /**
   * Moves the bubble to the right. If the bubble has moved 80 units from its start position
   * and has not yet started floating to the surface, it will start floating to the surface.
   * The bubble's horizontal movement speed decreases over time if it is floating to the surface.
   *
   * @method moveBubbleToRight
   */
  moveBubbleToRight() {
    if (this.x >= this.startPositionX + 80 && !this.isFloatToSurface) {
      this.floatToSurface();
      this.isFloatToSurface = true;
    }
    if (!this.isFloatToSurface) {
      this.x += 5;
    } else {
      this.x += 5 * this.factor;
      this.factor = this.factor * 0.95;
    }
  }

  /**
   * Checks for collisions between the current object and enemies in the world.
   * If a collision is detected, the object's y-coordinate is set to -40.
   * This method sets up an interval that repeatedly checks for collisions every 100 milliseconds.
   *
   * @method checkCollisions
   */
  checkCollisions() {
    this.collidingInterval = setInterval(() => {
      for (let index = 0; index < this.world.level1.enemies.length; index++) {
        const enemy = this.world.level1.enemies[index];
        if (this.isColliding(enemy)) {
          this.y = -40;
          break;
        } else {
        }
      }
    }, 100);
  }

  /**
   * Checks if the current object is colliding with another object.
   * 
   * @param {Object} obj - The object to check collision with.
   * @param {string} obj.constructor.name - The name of the constructor of the object.
   * @returns {boolean} - Returns true if there is a collision, otherwise false.
   */
  isColliding(obj) {
    if (obj.constructor.name == "PufferFishGreen") return this.isCollPufferGreen(obj);
    if (obj.constructor.name == "PufferFishOrange") return this.isCollPufferOrange(obj);
    if (obj.constructor.name == "PufferFishRed") return this.isCollPufferRed(obj);
    if (obj.constructor.name == "JellyFishGreenSD") return this.isCollJellyGreen(obj);
    if (obj.constructor.name == "JellyFishPinkSD") return this.isCollJellyPink(obj);
    if (obj.constructor.name == "JellyFishLilaRD") return this.isCollJellyLila(obj);
    if (obj.constructor.name == "JellyFishYellowRD") return this.isCollJellyYellow(obj);
    if (obj.constructor.name == "EndBoss") return this.isCollEndBoss(obj);
  }

  /**
   * Checks if the current object is colliding with a green pufferfish object.
   * If a collision is detected, it applies damage to the pufferfish and stops the collision interval.
   *
   * @param {Object} obj - The object representing the green pufferfish.
   * @param {number} obj.x - The x-coordinate of the pufferfish.
   * @param {number} obj.y - The y-coordinate of the pufferfish.
   * @param {number} obj.width - The width of the pufferfish.
   * @param {number} obj.height - The height of the pufferfish.
   * @returns {boolean} - Returns true if a collision is detected, otherwise undefined.
   */
  isCollPufferGreen(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y && this.y < obj.y + (obj.height - 10)) {
      let demageFactor = 35;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollPufferOrange(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y && this.y < obj.y + (obj.height - 17)) {
      let demageFactor = 35;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollPufferRed(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + (obj.width - 10) && this.y + this.height > obj.y + 4 && this.y < obj.y + 4 + (obj.height - 30)) {
      let demageFactor = 35;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollJellyGreen(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 0;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollJellyPink(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 0;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollJellyLila(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y && this.y < obj.y + obj.height) {
      let demageFactor = 30;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollJellyYellow(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 30;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollEndBoss(obj) {
    if (this.x + this.width > obj.x + 10 && this.x < obj.x + 10 + (obj.width - 35) && this.y + this.height > obj.y + 180 && this.y < obj.y + 180 + (obj.height - 250)) {
      let demageFactor = 10;
      if (this.world.sharky.isEnoughPoison == true) this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  /**
   * Handles the event when a bubble hits an object.
   *
   * @param {Object} obj - The object that is hit by the bubble.
   * @param {number} demageFactor - The amount of damage inflicted by the bubble.
   */
  bubbleHit(obj, demageFactor) {
    this.y = canvasHeight + 2000;
    obj.lifeEnergy -= demageFactor;
    if (obj.lifeEnergy <= demageFactor) {
      obj.enemyIsDead();
    }
  }
}
