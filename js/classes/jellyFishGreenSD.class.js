import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesReady } from "../script.js";

export class JellyFishGreenSD extends JellyFish {
  imgPathArr = [
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];

  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png");
    imgCachesReady[this.constructor.name] = false;
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
    this.loadImageCache(this.imgPathArr, this.constructor.name);
  }
}
