import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesReady } from "../script.js";

export class JellyFishLilaRD extends JellyFish {
  imgPathArr = [
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    imgCachesReady[this.constructor.name] = false;
    this.width = 66 * moveObjRatio;
    this.height = 99 * moveObjRatio;
    this.loadImageCache(this.imgPathArr);
  }
}

