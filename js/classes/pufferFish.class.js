import { MoveableObject } from "./moveable-object.class.js";
import { enemyStartX, enemyStartDistX, enemyStartY, enemyEndY, areImgCachesReady, loadedCachsArray } from "../script.js";

export class PufferFish extends MoveableObject {
  minX;
  maxX;
  moveForBackFactor = 0;
  forBackSpeed = 0;
  isImageCacheLoaded = false;

  currentAnimationIntervall;

  constructor() {
    super();
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + Math.random() * (enemyEndY - this.height);
    this.calculateMoveForBackFactor();
    this.calculateForBackSpeed();
    this.calculateMinMaxX();
  }

  async loadAllImagesCachePuffer() {
    await this.loadImageCache(this.imagesDie, this.constructor.name);
    await this.loadImageCache(this.imagesSwim, this.constructor.name);
    await this.loadImageCache(this.imagesTransition, this.constructor.name);
    await this.loadImageCache(this.imagesBubbleSwim, this.constructor.name);
  }

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  calculateMoveForBackFactor() {
    let factor = Math.random();
    if (factor < 0.2) {
      this.moveForBackFactor = 0.2;
    } else {
      this.moveForBackFactor = factor;
    }
  }

  calculateForBackSpeed() {
    let speed = 1 + Math.random() * 3;
    this.forBackSpeed = speed;
  }

  calculateMinMaxX() {
    this.minX = this.x - 400 * this.moveForBackFactor;
    if (this.minX < enemyStartX) this.minX = enemyStartX;
    this.maxX = this.x + 400 * this.moveForBackFactor;
    if (this.maxX > enemyStartX + enemyStartDistX + this.width) this.maxX = enemyStartX + enemyStartDistX - this.width;
  }

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

  enemyIsDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);

    this.img = this.imageCache[this.imagesDie[2]];
    this.isEnemyDead = true;
    this.floatToSurface();
    setInterval(() => {
      if (this.y < -500) {
        clearInterval(this.currentMovement);
        clearInterval(this.currentAnimationIntervall);
      }
    }, 200);
  }
}
