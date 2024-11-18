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

  currentAnimation = "swim"; //"swim" "dead" // "stop"

  currentAnimationIntervall;

  currentMovement;

  constructor(index) {
    super(index).loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.enemieIndex = index;
    this.width = 60 * moveObjRatio;
    this.height = 90 * moveObjRatio;
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
      this.doImageAnimation(this.imagesSwim, this.img, 250);
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
