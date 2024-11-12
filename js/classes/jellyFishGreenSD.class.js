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
    this.loadAllImagesCacheJellyFish();
    this.checkImagesCacheLoaded();
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.doCurrentAnimationAndMovement();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  // doImageAnimation(imageArray, imgRef, intervall)
  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") this.jellySwim();
    if (this.currentAnimation == "dead") this.jellyDead();
    if (this.currentAnimation == "stop") this.jellyStop();
  }

  jellySwim() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
    this.doImageAnimation(this.imagesSwim, this.img, 650);
  }

  jellyDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    // this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
    this.doImageAnimation(this.imagesDead, this.img, 250);
  }

  jellyStop() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }
}
