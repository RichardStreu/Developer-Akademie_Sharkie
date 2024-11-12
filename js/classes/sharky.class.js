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
  currentAnimationIntervall;

  currentMovement;

  world;

  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
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
        this.sharkyStandAnimation();
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

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  handleKeyDown(event) {
    if (event.key == "ArrowLeft") {
      if (!this.world.keyboard.LEFT) {
        this.clearIntervalsAnimationMove();
        this.world.keyboard.LEFT = true;
        this.moveSharkyLeft();
      }
    }
    if (event.key == "ArrowRight") {
      if (!this.world.keyboard.RIGHT) {
        this.clearIntervalsAnimationMove();
        this.world.keyboard.RIGHT = true;
        this.moveSharkyRight();
        console.log("right");
      }
    }
    if (event.key == "ArrowUp") {
      if (!this.world.keyboard.UP) {
        this.clearIntervalsAnimationMove();
        this.world.keyboard.UP = true;
        this.moveSharkyUp();
      }
    }
    if (event.key == "ArrowDown") {
      if (!this.world.keyboard.DOWN) {
        this.clearIntervalsAnimationMove();
        this.world.keyboard.DOWN = true;
        this.moveSharkyDown();
      }
    }
    if (event.key == " ") {
      if (!this.world.keyboard.SPACE) {
        this.clearIntervalsAnimationMove();
        this.world.keyboard.SPACE = true;
        this.sharkyAttackSpace();
      }
    }
    if (event.key == "d") {
      if (!this.world.keyboard.DKey) {
        this.clearIntervalsAnimationMove();
        this.world.keyboard.DKey = true;
        this.sharkyAttackDKey();
      }
    }
  }

  handleKeyUp(event) {
    this.clearIntervalsAnimationMove();
    this.sharkyStandAnimation();
    if (event.key == "ArrowLeft") this.world.keyboard.LEFT = false;
    if (event.key == "ArrowRight") this.world.keyboard.RIGHT = false;
    if (event.key == "ArrowUp") this.world.keyboard.UP = false;
    if (event.key == "ArrowDown") this.world.keyboard.DOWN = false;
    if (event.key == " ") this.world.keyboard.SPACE = false;
    if (event.key == "d") this.world.keyboard.DKey = false;
  }

  moveSharkyLeft() {
    this.sharkySwimAnimation();
    this.otherDirection = true;
    this.currentMovement = setInterval(() => {
      this.x -= 1.2;
    }, 1);
  }

  moveSharkyRight() {
    this.sharkySwimAnimation();
    this.otherDirection = false;
    this.currentMovement = setInterval(() => {
      this.x += 1.2;
    }, 1);
  }

  moveSharkyUp() {
    this.sharkySwimAnimation();
    this.currentMovement = setInterval(() => {
      this.y -= 1.2;
    }, 1);
  }

  moveSharkyDown() {
    this.sharkySwimAnimation();
    this.currentMovement = setInterval(() => {
      this.y += 1.2;
    }, 1);
  }

  sharkyAttackSpace() {
    console.log("Bubble Attack");
  }

  sharkyAttackDKey() {
    console.log("Fin Slap Attack");
  }

  sharkyStandAnimation() {
    this.doImageAnimation(imagesStand, this.img, 180);
  }
  sharkyFallAsleepAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesFallAsleep, this.img, 150);
  }
  sharkySleepAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesSleep, this.img, 200);
  }
  sharkySwimAnimation() {
    this.doImageAnimation(imagesSwim, this.img, 130);
  }
  sharkyBubbleWithoutAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubbleWithout, this.img, 110);
  }
  sharkyBubbleRegularAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubbleRegular, this.img, 110);
  }
  sharkyBubblePoisonAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackBubblePoison, this.img, 110);
  }
  sharkyFinSlapAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesAttackFinSlap, this.img, 100);
  }
  sharkyHurtRegularAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesHurtRegular, this.img, 110);
  }
  sharkyHurtShockAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesHurtShock, this.img, 110);
  }
  sharkyDeadRegularAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesDeadRegular, this.img, 130);
  }
  sharkyDeadShockAnimation() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesDeadShock, this.img, 130);
  }
  sharkyStopAnimation() {
    this.clearIntervalsAnimationMove();
  }
}
