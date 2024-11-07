import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio } from "../script.js";

export class JellyFishGreenSD extends JellyFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png");
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
  }
}
