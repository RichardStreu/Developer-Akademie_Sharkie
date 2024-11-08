import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesObject } from "../script.js";

export class JellyFishLilaRD extends JellyFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];
  imagesDead = [
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  currentAnimation = "swim"; //"swim" "dead" // "stop"

  currentAnimationIntervall;

  currentMovement;

  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.enemieIndex = index;
    this.width = 66 * moveObjRatio;
    this.height = 99 * moveObjRatio;
    this.loadImageCache(this.imagesSwim, this.constructor.name);
    this.loadImageCache(this.imagesDead, this.constructor.name);
    this.checkImagesCacheLoaded();
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.doCurrentAnimationAndMovement();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
      this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
      this.doImageAnimation(this.imagesSwim, this.img, 350);
    }
    if (this.currentAnimation == "dead") {
    }
    if (this.currentAnimation == "stop") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
    }
  }
}
