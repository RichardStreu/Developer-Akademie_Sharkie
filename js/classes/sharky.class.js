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

//
export class Sharky extends MoveableObject {
  currentAnimation = "stand"; //"stand""fallAsleep""sleep""swim""bubbleWithout""bubbleRegular""bubblePoison""finSlap""hurtRegular""hurtShock""deadRegular""deadShock" / "stop"

  currentAnimationIntervall;

  currentMovement;

  world;

  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
    // this.img;
    this.x = 0;
    this.y = 200;
    this.width = 180 * moveObjRatio;
    this.height = 221 * moveObjRatio;
    this.loadAllImagesCacheSharky();
    this.checkImagesCacheLoaded();
    window.addEventListener("keydown", (event) => {
      this.handleKeyDown(event);
    });
    window.addEventListener("keyup", (event) => {
      this.handleKeyUp(event);
    });
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.doCurrentSharkyAnimation();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  handleKeyDown(event) {
    if (event.key == "ArrowLeft") this.world.keyboard.LEFT = true;
    if (event.key == "ArrowRight") this.world.keyboard.RIGHT = true;
    if (event.key == "ArrowUp") this.world.keyboard.UP = true;
    if (event.key == "ArrowDown") this.world.keyboard.DOWN = true;
    if (event.key == " ") this.world.keyboard.SPACE = true;
    if (event.key == "d") this.world.keyboard.DKey = true;
    this.startMovingSharky();
  }

  handleKeyUp(event) {
    if (event.key == "ArrowLeft") this.world.keyboard.LEFT = false;
    if (event.key == "ArrowRight") this.world.keyboard.RIGHT = false;
    if (event.key == "ArrowUp") this.world.keyboard.UP = false;
    if (event.key == "ArrowDown") this.world.keyboard.DOWN = false;
    if (event.key == " ") this.world.keyboard.SPACE = false;
    if (event.key == "d") this.world.keyboard.DKey = false;
    this.stopMovingSharky();
  }

  startMovingSharky() {
    if (this.world.keyboard.LEFT == true) this.moveSharkyLeft();
    if (this.world.keyboard.RIGHT == true) this.moveSharkyRight();
    if (this.world.keyboard.UP == true) this.moveSharkyUp();
    if (this.world.keyboard.DOWN == true) this.moveSharkyDown();
    if (this.world.keyboard.SPACE == true) this.sharkyAttackSpace();
    if (this.world.keyboard.DKey == true) this.sharkyAttackDKey();
  }

  stopMovingSharky() {
    console.log("Moving stopped");
  }

  moveSharkyLeft() {
    console.log("Left");
  }

  moveSharkyRight() {
    console.log("Right");
  }

  moveSharkyUp() {
    console.log("UP");
  }

  moveSharkyDown() {
    console.log("DOWN");
  }

  sharkyAttackSpace() {
    console.log("Bubble Attack");
  }

  sharkyAttackDKey() {
    console.log("Fin Slap Attack");
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

  doCurrentSharkyAnimation() {
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
    this.doImageAnimation(imagesStand, this.img, 180);
  }
  sharkyFallAsleep() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesFallAsleep, this.img, 150);
  }
  sharkySleep() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesSleep, this.img, 200);
  }
  sharkySwim() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesSwim, this.img, 130);
  }
  sharkyBubbleWithout() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubbleWithout, this.img, 110);
  }
  sharkyBubbleRegular() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubbleRegular, this.img, 110);
  }
  sharkyBubblePoison() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubblePoison, this.img, 110);
  }
  sharkyFinSlap() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackFinSlap, this.img, 100);
  }
  sharkyHurtRegular() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesHurtRegular, this.img, 110);
  }
  sharkyHurtShock() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesHurtShock, this.img, 110);
  }
  sharkyDeadRegular() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesDeadRegular, this.img, 130);
  }
  sharkyDeadShock() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesDeadShock, this.img, 130);
  }
  sharkyStop() {
    this.clearIntervalsAnimationMove();
  }
}
