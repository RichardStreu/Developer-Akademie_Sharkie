import { PufferFish } from "./pufferFish.class.js";
import { moveObjRatio, enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class PufferFishOrange extends PufferFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + (Math.random() * (enemyEndY - this.height));
    this.width = 86 * moveObjRatio;
    this.height = 69 * moveObjRatio;
  }
}
