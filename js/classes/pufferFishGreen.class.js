import { PufferFish } from "./pufferFish.class.js";
import { moveObjRatio, enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class PufferFishGreen extends PufferFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + (Math.random() * (enemyEndY - this.height));
    this.width = 70 * moveObjRatio;
    this.height = 56 * moveObjRatio;
  }
}
