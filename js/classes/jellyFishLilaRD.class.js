import { JellyFish } from "./jellyFish.class.js";
import { ratio } from "../script.js"

export class JellyFishLilaRD extends JellyFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.x = 300;
    this.y = 300;
    this.width = 66 * ratio;
    this.height = 99 * ratio;
  }
}