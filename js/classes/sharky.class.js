import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio, loadedCachsArray } from "../script.js";
import {
  imagesStand,
  imagesFallAsleep,
  imagesSleep,
  imagesSwim,
  imagesAttackBubbleWithout,
  imagesAttackBubbleRegular,
  imagesAttackBubblePoison,
  imagesAttackFinSlap,
  imagesHurtRegular,
  imagesHurtShock,
  imagesDeadRegular,
  imagesDeadShock,
} from "./sharky.class.images.js";

export class Sharky extends MoveableObject {
  currentAnimation = "stand"; //"stand""fallAsleep""sleep""swim""bubbleWithout""bubbleRegular""bubblePoison""finSlap""hurtRegular""hurtShock""deadRegular""deadShock" // "stop"

  currentAnimationIntervall;

  currentMovement;

  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
    // this.img;
    this.x = 0;
    this.y = 200;
    this.width = 180 * moveObjRatio;
    this.height = 221 * moveObjRatio;
    this.loadAllImagesCacheSharky();
    this.checkImagesCacheLoaded();
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.doCurrentAnimationAndMovement();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  async loadAllImagesCacheSharky() {
    await this.loadImageCache(imagesStand, this.constructor.name);
    await this.loadImageCache(imagesFallAsleep, this.constructor.name);
    await this.loadImageCache(imagesSleep, this.constructor.name);
    await this.loadImageCache(imagesSwim, this.constructor.name);
    await this.loadImageCache(imagesAttackBubbleWithout, this.constructor.name);
    await this.loadImageCache(imagesAttackBubbleRegular, this.constructor.name);
    await this.loadImageCache(imagesAttackBubblePoison, this.constructor.name);
    await this.loadImageCache(imagesAttackFinSlap, this.constructor.name);
    await this.loadImageCache(imagesHurtRegular, this.constructor.name);
    await this.loadImageCache(imagesHurtShock, this.constructor.name);
    await this.loadImageCache(imagesDeadRegular, this.constructor.name);
    await this.loadImageCache(imagesDeadShock, this.constructor.name);
  }

  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "stand") this.sharkyStand();
    if (this.currentAnimation == "fallAsleep") this.sharkyFallAsleep();
    if (this.currentAnimation == "sleep") this.sharkySleep();
    if (this.currentAnimation == "swim") this.sharkySwim();
    if (this.currentAnimation == "bubbleWithout") this.sharkyBubbleWithout();
    if (this.currentAnimation == "bubbleRegular") this.sharkyBubbleRegular();
    if (this.currentAnimation == "bubblePoison") this.sharkyBubblePoison();
    if (this.currentAnimation == "finSlap") this.sharkyFinSlap();
    if (this.currentAnimation == "hurtRegular") this.sharkyHurtRegular();
    if (this.currentAnimation == "hurtShock") this.sharkyHurtShock();
    if (this.currentAnimation == "deadRegular") this.sharkyDeadRegular();
    if (this.currentAnimation == "deadShock") this.sharkyDeadShock();
    if (this.currentAnimation == "stop") this.sharkyStop();
  }

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  sharkyStand() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesStand, this.img, 200);
  }
  sharkyFallAsleep() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesFallAsleep, this.img, 650);
  }
  sharkySleep() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesSleep, this.img, 650);
  }
  sharkySwim() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesSwim, this.img, 650);
  }
  sharkyBubbleWithout() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubbleWithout, this.img, 650);
  }
  sharkyBubbleRegular() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubbleRegular, this.img, 650);
  }
  sharkyBubblePoison() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubblePoison, this.img, 650);
  }
  sharkyFinSlap() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackFinSlap, this.img, 650);
  }
  sharkyHurtRegular() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesHurtRegular, this.img, 650);
  }
  sharkyHurtShock() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesHurtShock, this.img, 650);
  }
  sharkyDeadRegular() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesDeadRegular, this.img, 650);
  }
  sharkyDeadShock() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesDeadShock, this.img, 650);
  }
  sharkyStop() {
    this.clearIntervalsAnimationMove();
  }
}
