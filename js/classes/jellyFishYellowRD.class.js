import { JellyFish } from "./jellyFish.class.js";

export class JellyFishYellowRD extends JellyFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.x = 100;
    this.y = 100;
    this.width = 100;
    this.height = 100;
  }
}
