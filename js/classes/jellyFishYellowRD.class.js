import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesReady } from "../script.js";

export class JellyFishYellowRD extends JellyFish {
  imgPathArr = [
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];

  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    imgCachesReady[this.constructor.name] = false;
    this.width = 66 * moveObjRatio;
    this.height = 99 * moveObjRatio;
    this.loadImageCache(this.imgPathArr, this.constructor.name);
  }
}
