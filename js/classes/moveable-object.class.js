/**
 * @module "moveable-object.class.js"
 */

import { canvasHeight, youWinOrLose } from "../script.js";
import { DrawableObject } from "./drawable-object.class.js";

export class MoveableObject extends DrawableObject {
  otherDirection = false;
  speedY = 2;
  lifeEnergy;
  isEnoughPoison = false;

  constructor() {
    super();
    this.lifeEnergy = 100;
  }

  /**
   * Draws a rectangular frame around the sharky object.
   *
   * @param {CanvasRenderingContext2D} ctx - The rendering context to use for drawing the frame.
   */
  drawSharkyFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x + 40, this.y + 125, this.width - 80, this.height - 190);
    ctx.stroke();
  }

  drawPufferGreenFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height - 10);
    ctx.stroke();
  }

  drawPufferOrangeFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height - 17);
    ctx.stroke();
  }

  drawPufferRedFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y + 4, this.width - 10, this.height - 30);
    ctx.stroke();
  }

  drawJellyGreen(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y + 5, this.width, this.height - 15);
    ctx.stroke();
  }

  drawJellyPink(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y + 5, this.width, this.height - 15);
    ctx.stroke();
  }

  drawJellyLila(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  drawJellyYellow(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y + 5, this.width, this.height - 15);
    ctx.stroke();
  }

  drawEndbossFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x + 10, this.y + 180, this.width - 35, this.height - 250);
    ctx.stroke();
  }

  /**
   * Moves the object upwards until it reaches the surface.
   * If the object is "Sharky" and reaches the surface, it checks the current positions of Sharky
   * and triggers the 'looseScreen' event.
   *
   * @param {string} item - The name of the item to check if it is "Sharky".
   */
  floatToSurface(item) {
    this.currentMovement = setInterval(() => {
      if (this.y > -100 - this.height) {
        this.y -= this.speedY;
      } else {
        if (item == "Sharky") {
          this.world.sharky.checkCurrentSharkyPositions();
          youWinOrLose('looseScreen');
        }
        clearInterval(this.currentMovement);
      }
    }, 1000 / 40);
  }

  /**
   * Moves the object downwards until it reaches the ground level.
   * If the item is "Sharky", it triggers a check on Sharky's position and displays the lose screen after a delay.
   *
   * @param {string} item - The name of the item to check for specific behavior.
   */
  sinkToGround(item) {
    this.currentMovement = setInterval(() => {
      if (this.y < canvasHeight - this.height - 10) {
        this.y += this.speedY;
      } else {
        if (item == "Sharky") {
          setTimeout(() => {
            this.world.sharky.checkCurrentSharkyPositions();
            youWinOrLose('looseScreen');
          }, 1500);
        }
        clearInterval(this.currentMovement);
      }
    }, 1000 / 40);
  }

  /**
   * Animates a sequence of images by cycling through an array of image paths at a specified interval.
   *
   * @param {string[]} imageArray - An array of image paths to be animated.
   * @param {HTMLImageElement} imgRef - A reference to the HTML image element where the animation will be displayed.
   * @param {number} intervall - The interval in milliseconds at which to cycle through the images.
   */
  doImageAnimation(imageArray, imgRef, intervall) {
    let imagesArray = [];
    imageArray.forEach((imgPath) => {
      imagesArray.push(this.imageCache[imgPath]);
    });
    let currentIndex = 0;
    this.currentAnimationIntervall = setInterval(() => {
      this.img = imagesArray[currentIndex];
      currentIndex = (currentIndex + 1) % imagesArray.length;
    }, intervall);
  }

  /**
   * Checks if the current object is colliding with another object.
   * 
   * @param {Object} obj - The object to check for collision.
   * @param {string} obj.constructor.name - The name of the constructor of the object.
   * @returns {boolean} - Returns true if there is a collision, otherwise false.
   */
  isColliding(obj) {
    let hitboxX = this.currentFinSlap === "left" ? this.x - 50 : this.currentFinSlap === "right" ? this.x + 50 : this.x;
    let currentFinSlap = this.currentFinSlap;
    if (obj.constructor.name == "Coin") return this.isCollCoin(obj);
    if (obj.constructor.name == "Poison") return this.isCollPoison(obj);
    if (obj.constructor.name == "PufferFishGreen") return this.isCollPufferGreen(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "PufferFishOrange") return this.isCollPufferOrange(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "PufferFishRed") return this.isCollPufferRed(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "JellyFishGreenSD") return this.isCollJellyGreen(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "JellyFishPinkSD") return this.isCollJellyPink(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "JellyFishLilaRD") return this.isCollJellyLila(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "JellyFishYellowRD") return this.isCollJellyYellow(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "EndBoss") return this.isCollEndBoss(obj);
  }

  /**
   * Checks if the current object collides with a coin object.
   * If a collision is detected, the coin is removed from the world,
   * the coin count is incremented, and the status bar is updated.
   */
  isCollCoin(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + obj.height) {
      let enemyIndex = this.world.enemies.findIndex((element) => element.index === obj.index);
      this.world.enemies.splice(enemyIndex, 1);
      this.coin += 1;
      this.world.statBars[0].updatePercentageStatBar(9.1);
      return true;
    }
  }

  isCollPoison(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + obj.height) {
      let enemyIndex = this.world.enemies.findIndex((element) => element.index === obj.index);
      this.world.enemies.splice(enemyIndex, 1);
      this.poison += 1;
      this.world.statBars[2].updatePercentageStatBar(17);
      return true;
    }
  }

  /**
   * Checks for collision with a green pufferfish and handles the collision accordingly.
   *
   * @param {Object} obj - The object representing the green pufferfish.
   * @param {number} hitboxX - The x-coordinate of the hitbox.
   * @param {string} currentFinSlap - The direction of the current fin slap ("left" or "right").
   * @returns {boolean} - Returns true if a collision is detected and handled, otherwise undefined.
   */
  isCollPufferGreen(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y &&
      this.y + 125 < obj.y + (obj.height - 10) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollPufferOrange(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y &&
      this.y + 125 < obj.y + (obj.height - 17) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollPufferRed(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + (obj.width - 10) &&
      this.y + 125 + (this.height - 190) > obj.y + 4 &&
      this.y + 125 < obj.y + 4 + (obj.height - 30) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollJellyGreen(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y + 5 &&
      this.y + 125 < obj.y + 5 + (obj.height - 15) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollJellyPink(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y + 5 &&
      this.y + 125 < obj.y + 5 + (obj.height - 15) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollJellyLila(obj, hitboxX, currentFinSlap) {
    if (hitboxX + 40 + (this.width - 80) > obj.x && hitboxX + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + obj.height && obj.isEnemyDead == false) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollJellyYellow(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y + 5 &&
      this.y + 125 < obj.y + 5 + (obj.height - 15) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  /**
   * Moves the given object to the right when it hits an enemy.
   * The object will move a total distance of 60 units to the right,
   * with an initial speed of 6 units per interval, decreasing by a factor of 0.85 each interval.
   * The movement starts after a delay of 300 milliseconds.
   *
   * @param {Object} obj - The object to be moved.
   * @param {number} obj.x - The current x-coordinate of the object.
   */
  hitEnemyToRight(obj) {
    setTimeout(() => {
      let endX = obj.x + 60;
      let speed = 6;
      let factor = 0.85;
      let interval = setInterval(() => {
        if (obj.x < endX) {
          obj.x += speed;
          speed = speed * factor;
        } else {
          clearInterval(interval);
        }
      }, 150);
    }, 300);
  }

  hitEnemyToLeft(obj) {
    setTimeout(() => {
      let endX = obj.x - 60;
      let speed = 6;
      let factor = 0.85;
      let interval = setInterval(() => {
        if (obj.x > endX) {
          obj.x -= speed;
          speed = speed * factor;
        } else {
          clearInterval(interval);
        }
      }, 150);
    }, 300);
  }

  /**
   * Checks if the current object collides with the end boss.
   *
   * @param {Object} obj - The object representing the end boss.
   * @param {number} obj.x - The x-coordinate of the end boss.
   * @param {number} obj.y - The y-coordinate of the end boss.
   * @param {number} obj.width - The width of the end boss.
   * @param {number} obj.height - The height of the end boss.
   * @param {boolean} obj.isEnemyDead - The status indicating if the end boss is dead.
   * @returns {boolean} - Returns true if there is a collision with the end boss, otherwise false.
   */
  isCollEndBoss(obj) {
    if (
      this.x + 40 + (this.width - 80) > obj.x + 10 &&
      this.x + 40 < obj.x + 10 + (obj.width - 35) &&
      this.y + 125 + (this.height - 190) > obj.y + 180 &&
      this.y + 125 < obj.y + 180 + (obj.height - 250) &&
      obj.isEnemyDead == false
    ) {
      return true;
    }
  }
}
