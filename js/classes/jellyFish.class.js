import { MoveableObject } from "./moveable-object.class.js";
import { enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";



export class JellyFish extends MoveableObject {

  minY;
  maxY;
  moveUpDownFactor = 0;
  upDownSpeed = 0;

  constructor() {
    super();
    this.x = enemyStartX + (Math.random() * enemyStartDistX);
    this.y = enemyStartY + (Math.random() * (enemyEndY - this.height));
    this.calculateMoveUpDownFactor();
    this.calculateUpDownSpeed();
    this.calculateMinMaxY();
    this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
  }

  calculateMoveUpDownFactor() {
    let factor = Math.random();
    if (factor < 0.2) {
      this.moveUpDownFactor = 0.2;
    }else {
      this.moveUpDownFactor = factor;
    }
  }

  calculateUpDownSpeed() {
    let speed = 1 + (Math.random() * 3);
    this.upDownSpeed = speed;
  }
  
  calculateMinMaxY() {
    this.minY = this.y - ((this.y - enemyStartY) * this.moveUpDownFactor);
    this.maxY = this.y + (((enemyEndY - this.height) - this.y) * this.moveUpDownFactor);
  }
  
  upDownJellyFish(minY, maxY, speed) {
    this.moveUp = true;
    setInterval(() => {
      if (this.moveUp && this.y > minY) this.y -= speed;
      if (this.moveUp && this.y < minY) this.moveUp = false;
      if (!this.moveUp && this.y < maxY) this.y += speed;
      if (!this.moveUp && this.y > maxY) this.moveUp = true;
    }, 100);
  }
}


