import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class JellyFishGreenSD extends JellyFish {
  constructor(moveUpDownFactor) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png");
    this.moveUpDownFactor = moveUpDownFactor;
    this.x = enemyStartX + (Math.random() * enemyStartDistX);
    this.y = enemyStartY + (Math.random() * (enemyEndY - this.height));
    console.log("StartY = " + this.y);
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
    this.minY = this.y - ((this.y - enemyStartY) * moveUpDownFactor);
    console.log("MinY = " + this.minY);
    this.maxY = this.y + (((enemyEndY - this.height) - this.y) * moveUpDownFactor);
    console.log("MaxY = " + this.maxY);
    this.upDownJellyFish(this.minY, this.maxY);
  }

  calculateMinMaxY() {
    
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
