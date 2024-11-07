import { PufferFish } from "./pufferFish.class.js";

export class PufferFishGreen extends PufferFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
    this.x = 100;
    this.y = 100;
    this.width = 100;
    this.height = 100;
  }
}
