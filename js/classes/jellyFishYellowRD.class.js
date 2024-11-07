import { JellyFish } from "./jellyFish.class.js";
import { ratio } from "../script.js"

export class JellyFishYellowRD extends JellyFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.x = 600;
    this.y = 300;
    this.width = 66 * ratio;
    this.height = 99 * ratio;
  }
}
