import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class JellyFishGreenSD extends JellyFish {

  minY;
  maxY;
  moveUpDownFactor;

  constructor(moveUpDownFactor) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png");
    this.moveUpDownFactor = moveUpDownFactor;
    this.x = enemyStartX + (Math.random() * enemyStartDistX);
    this.y = enemyStartY + (Math.random() * (enemyEndY - this.height));
    console.log("StartY = " + this.y);
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
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
    console.log("MinY = " + this.minY);
    this.maxY = this.y + (((enemyEndY - this.height) - this.y) * this.moveUpDownFactor);
    console.log("MaxY = " + this.maxY);
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
