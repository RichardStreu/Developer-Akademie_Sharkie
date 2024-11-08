import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class JellyFishPinkSD extends JellyFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png");
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + (Math.random() * (enemyEndY - this.height));
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
  }
}
