import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio } from "../script.js";

export class JellyFishYellowRD extends JellyFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.x = 600;
    this.y = 300;
    this.width = 66 * moveObjRatio;
    this.height = 99 * moveObjRatio;
  }
}
