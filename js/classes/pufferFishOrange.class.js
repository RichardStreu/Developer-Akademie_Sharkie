import { PufferFish } from "./pufferFish.class.js"
import { ratio } from "../script.js"

export class PufferFishOrange extends PufferFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
    this.x = 100;
    this.y = 180;
    this.width = 86 * ratio;
    this.height = 69 * ratio;
  }
  
}