import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesReady } from "../script.js";

export class JellyFishPinkSD extends JellyFish {
  imgPathArr = [
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png",
  ];

  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png");
    imgCachesReady[this.constructor.name] = false;
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
    this.loadImageCache(this.imgPathArr, this.constructor.name);
  }
}
