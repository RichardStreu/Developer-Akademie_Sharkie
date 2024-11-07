import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class JellyFishYellowRD extends JellyFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + (Math.random() * (enemyEndY - this.height));
    this.width = 66 * moveObjRatio;
    this.height = 99 * moveObjRatio;
  }
}
