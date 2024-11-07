import { MoveableObject } from "./moveable-object.class.js";
import { enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";



export class JellyFish extends MoveableObject {

  minY;
  maxY;
  moveUpDownFactor = 0;

  constructor() {
    super();
    this.x = enemyStartX + (Math.random() * enemyStartDistX);
    this.y = enemyStartY + (Math.random() * (enemyEndY - this.height));
    this.calculateMoveUpDownFactor();
    this.calculateMinMaxY();
    this.upDownJellyFish(this.minY, this.maxY);
  }

  calculateMoveUpDownFactor() {
    let factor = Math.random();
    if (factor < 0.2) {
      this.moveUpDownFactor = 0.2;
    }else {
      this.moveUpDownFactor = factor;
    }
  }
  
  calculateMinMaxY() {
    this.minY = this.y - ((this.y - enemyStartY) * this.moveUpDownFactor);
    this.maxY = this.y + (((enemyEndY - this.height) - this.y) * this.moveUpDownFactor);
  }
  
  upDownJellyFish(minY, maxY) {
    this.moveUp = true;
    setInterval(() => {
      if (this.moveUp && this.y > minY) this.y -= 3;
      if (this.moveUp && this.y < minY) this.moveUp = false;
      if (!this.moveUp && this.y < maxY) this.y += 3;
      if (!this.moveUp && this.y > maxY) this.moveUp = true;
    }, 100);
  }
}

