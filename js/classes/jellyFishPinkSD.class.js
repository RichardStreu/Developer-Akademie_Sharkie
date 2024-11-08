import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesObject } from "../script.js";

export class JellyFishPinkSD extends JellyFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];
  imagesDead = [
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png",
  ];

  currentAnimation = "swim";

  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png");
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
    this.loadImageCache(this.imagesSwim, this.constructor.name);
    this.loadImageCache(this.imagesDead, this.constructor.name);
    this.checkImagesForSwimAnimation(this.imagesSwim, this.img, 550);
  }
}
