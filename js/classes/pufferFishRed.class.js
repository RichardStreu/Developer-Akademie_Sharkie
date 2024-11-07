import { PufferFish } from "./pufferFish.class.js";
import { moveObjRatio } from "../script.js";

export class PufferFishRed extends PufferFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png");
    this.x = 100;
    this.y = 100;
    this.width = 100 * moveObjRatio;
    this.height = 80 * moveObjRatio;
  }
}
