import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio } from "../script.js";

export class JellyFishPinkSD extends JellyFish {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png");
    this.x = 500;
    this.y = 100;
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
  }
}
