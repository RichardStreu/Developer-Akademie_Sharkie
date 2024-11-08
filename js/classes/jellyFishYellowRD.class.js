import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesObject } from "../script.js";

export class JellyFishYellowRD extends JellyFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];
  imagesDead = [
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];

  currentAnimation = "swim";

  constructor() {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.width = 60 * moveObjRatio;
    this.height = 90 * moveObjRatio;
    this.loadImageCache(this.imagesSwim, this.constructor.name);
    this.loadImageCache(this.imagesDead, this.constructor.name);
    this.checkImagesForSwimAnimation(this.imagesSwim, this.img, 250);
  }
}
