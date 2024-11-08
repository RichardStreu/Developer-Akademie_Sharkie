import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesObject } from "../script.js";

export class JellyFishGreenSD extends JellyFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  imagesDead = [
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];

  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png");
    this.width = 90 * moveObjRatio;
    this.height = 135 * moveObjRatio;
    this.loadImageCache(this.imagesSwim, this.constructor.name);
    this.loadImageCache(this.imagesDead, this.constructor.name);
    this.checkImagesForSwimAnimation(this.imagesSwim, this.img, 650);
  }
}
