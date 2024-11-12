import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio, loadedCachsArray, canvasHeight, canvasWidth } from "../script.js";
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

export let sharkyXPosition;
export let sharkyYPosition;
export let sharkyWidth;
export let sharkyHeight;
//
export class Sharky extends MoveableObject {
  currentAnimationIntervall;

  currentMovement;
  isSwimLeft;
  isSwimRight;
  isSwimUp;
  isSwimDown;

  world;

  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
    this.x = 0;
    this.y = 200;
    this.width = 180 * moveObjRatio;
    this.height = 221 * moveObjRatio;
    sharkyWidth = this.width;
    sharkyHeight = this.height;
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
        this.sharkyStandAnimation();
        this.letSharkySleep();
        clearInterval(this.firstInterval);
      }
    }, 100);
    this.checkCurrentSharkyPositions();
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

  checkCurrentSharkyPositions() {
    setInterval(() => {
      sharkyXPosition = this.x;
      sharkyYPosition = this.y;
    }, 50);
  }

  letSharkySleep() {
    let timeOfUnmoved = 0;
    this.currentMovement = setInterval(() => {
      timeOfUnmoved++;
      if (timeOfUnmoved > 5) {
        this.clearIntervalsAnimationMove();
        this.sharkySleepAnimation();
      }
    }, 1000);
  }

  sharkyStandAnimation() {
    this.doImageAnimation(imagesStand, this.img, 180);
  }
  sharkyFallAsleepAnimation() {
    this.doImageAnimation(imagesFallAsleep, this.img, 150);
  }
  sharkySleepAnimation() {
    this.doImageAnimation(imagesSleep, this.img, 200);
  }
  sharkySwimAnimation() {
    this.doImageAnimation(imagesSwim, this.img, 80);
  }
  sharkyBubbleWithoutAnimation() {
    this.doImageAnimation(imagesAttackBubbleWithout, this.img, 110);
  }
  sharkyBubbleRegularAnimation() {
    this.doImageAnimation(imagesAttackBubbleRegular, this.img, 110);
  }
  sharkyBubblePoisonAnimation() {
    this.doImageAnimation(imagesAttackBubblePoison, this.img, 110);
  }
  sharkyFinSlapAnimation() {
    this.doImageAnimation(imagesAttackFinSlap, this.img, 100);
  }
  sharkyHurtRegularAnimation() {
    this.doImageAnimation(imagesHurtRegular, this.img, 110);
  }
  sharkyHurtShockAnimation() {
    this.doImageAnimation(imagesHurtShock, this.img, 110);
  }
  sharkyDeadRegularAnimation() {
    this.doImageAnimation(imagesDeadRegular, this.img, 130);
  }
  sharkyDeadShockAnimation() {
    this.doImageAnimation(imagesDeadShock, this.img, 130);
  }

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  handleKeyUp(event) {
    if (event.key == "ArrowLeft") {
      this.world.keyboard.LEFT = false;
      clearInterval(this.isSwimLeft);
    }
    if (event.key == "ArrowRight") {
      this.world.keyboard.RIGHT = false;
      clearInterval(this.isSwimRight);
    }
    if (event.key == "ArrowUp") {
      this.world.keyboard.UP = false;
      clearInterval(this.isSwimUp);
    }
    if (event.key == "ArrowDown") {
      this.world.keyboard.DOWN = false;
      clearInterval(this.isSwimDown);
    }
    if (event.key == " ") this.world.keyboard.SPACE = false;
    if (event.key == "d") this.world.keyboard.DKey = false;
    if (Object.values(world.keyboard).every((value) => value === false)) {
      this.clearIntervalsAnimationMove();
      this.letSharkySleep();
      this.sharkyStandAnimation();
    }
  }

  handleKeyDown(event) {
    if (event.key == "ArrowLeft") this.moveSharkyLeft();
    if (event.key == "ArrowRight") this.moveSharkyRight();
    if (event.key == "ArrowUp") this.moveSharkyUp();
    if (event.key == "ArrowDown") this.moveSharkyDown();
    if (event.key == " ") this.sharkyAttackSpace();
    if (event.key == "d") this.sharkyAttackDKey();
  }

  moveSharkyLeft() {
    if (!this.world.keyboard.LEFT) {
      this.clearIntervalsAnimationMove();
      this.world.keyboard.LEFT = true;
      this.otherDirection = true;
      this.sharkySwimAnimation();
      this.isSwimLeft = setInterval(() => {
        if (this.x > -30) {
          this.x -= 4;
          const sharkyMidPoint = canvasWidth / 2 - this.width / 2 - 50;
          if (this.x > sharkyMidPoint && this.x > 0 && this.x < canvasWidth * 3.5 - this.width) {
            this.world.camera_x = sharkyMidPoint - this.x;
          } else if (this.x <= 0) {
            this.world.camera_x = 0;
          }
        }
      }, 10);
    }
  }

  moveSharkyRight() {
    if (!this.world.keyboard.RIGHT) {
      this.clearIntervalsAnimationMove();
      this.world.keyboard.RIGHT = true;
      this.otherDirection = false;
      this.sharkySwimAnimation();
      this.isSwimRight = setInterval(() => {
        if (this.x < canvasWidth * 4 - this.width) {
          this.x += 4;
          let sharkyMidPoint = canvasWidth / 2 - this.width / 2 - 50;
          if (this.x >= sharkyMidPoint && this.x < canvasWidth * 3.5 - this.width) this.world.camera_x = sharkyMidPoint - this.x;
        }
      }, 10);
    }
  }

  moveSharkyUp() {
    if (!this.world.keyboard.UP) {
      this.clearIntervalsAnimationMove();
      this.world.keyboard.UP = true;
      this.sharkySwimAnimation();
      this.isSwimUp = setInterval(() => {
        if (this.y > -120) this.y -= 4;
      }, 10);
    }
  }

  moveSharkyDown() {
    if (!this.world.keyboard.DOWN) {
      this.clearIntervalsAnimationMove();
      this.world.keyboard.DOWN = true;
      this.sharkySwimAnimation();
      this.isSwimDown = setInterval(() => {
        if (this.y < canvasHeight - 262) {
          this.y += 4;
        }
      }, 10);
    }
  }

  sharkyAttackSpace() {
    if (!this.world.keyboard.SPACE) {
      this.world.keyboard.SPACE = true;
      this.clearIntervalsAnimationMove();
      console.log("Bubble Attack");
    }
  }

  sharkyAttackDKey() {
    if (!this.world.keyboard.DKey) {
      this.world.keyboard.DKey = true;
      this.clearIntervalsAnimationMove();
      console.log("Fin Slap Attack");
    }
  }
}
