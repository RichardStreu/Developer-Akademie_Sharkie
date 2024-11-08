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

  currentAnimation = "swim"; //"swim" "dead" // "stop"

  currentAnimationIntervall;

  currentMovement;

  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png");
    this.enemieIndex = index;
    this.width = 90 * moveObjRatio;
    this.height = 135 * moveObjRatio;
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
      this.doJellyFishAnimation(this.imagesSwim, this.img, 650);
    }
    if (this.currentAnimation == "dead") {
    }
    if (this.currentAnimation == "stop") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
    }
  }
}
