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

  currentAnimation = "swim"; //"swim" "dead" // "stop"

  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png");
    this.enemieIndex = index;
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
    this.loadImageCache(this.imagesSwim, this.constructor.name);
    this.loadImageCache(this.imagesDead, this.constructor.name);
    this.checkAndLoadCurrentAnimation();
  }

  checkAndLoadCurrentAnimation() {
    if (this.currentAnimation = "swim") {
      this.checkImagesForSwimAnimation(this.imagesSwim, this.img, 550);
      this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
    };
    if (this.currentAnimation == "dead") {

    }
    if (this.currentAnimation == "stop") {
      return;
    }
}
}
