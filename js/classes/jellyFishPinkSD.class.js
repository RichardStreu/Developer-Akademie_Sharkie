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

  currentAnimationIntervall;

  currentMovement;

  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png");
    this.enemieIndex = index;
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
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
    if (this.currentAnimation == "swim") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
      this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
      this.doImageAnimation(this.imagesSwim, this.img, 550);
    }
    if (this.currentAnimation == "dead") {
    }
    if (this.currentAnimation == "stop") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
    }
  }

  jellyDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    // this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
    this.doImageAnimation(this.imagesDead, this.img, 250);
  }


  enemyIsDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.jellyDead();
    this.floatToSurface();
    setInterval(() => {
      if (this.y < -500) {
        clearInterval(this.currentMovement);
        clearInterval(this.currentAnimationIntervall);
      }
    }, 200);
  }
}
