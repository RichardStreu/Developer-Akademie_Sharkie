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

  isKeyPressed;

  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
    this.x = 0;
    this.y = 200;
    this.width = 180 * moveObjRatio;
    this.height = 221 * moveObjRatio;
    this.loadAllImagesCacheSharky();
    this.checkImagesCacheLoaded();
    window.addEventListener("keydown", (event) => {
      this.isKeyPressed = true;
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
    this.doImageAnimation(imagesSwim, this.img, 130);
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
    if (event.key == "ArrowLeft") this.world.keyboard.LEFT = false;
    if (event.key == "ArrowRight") this.world.keyboard.RIGHT = false;
    if (event.key == "ArrowUp") this.world.keyboard.UP = false;
    if (event.key == "ArrowDown") this.world.keyboard.DOWN = false;
    if (event.key == " ") this.world.keyboard.SPACE = false;
    if (event.key == "d") this.world.keyboard.DKey = false;
    if (Object.values(world.keyboard).every((value) => value === false)) {
      this.clearIntervalsAnimationMove();
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
      this.currentMovement = setInterval(() => {
        this.x -= 4;
      }, 10);
    }
  }

  moveSharkyRight() {
    if (!this.world.keyboard.RIGHT) {
      this.clearIntervalsAnimationMove();
      this.world.keyboard.RIGHT = true;
      this.otherDirection = false;
      this.sharkySwimAnimation();
      this.currentMovement = setInterval(() => {
        this.x += 4;
      }, 10);
    }
  }

  moveSharkyUp() {
    if (!this.world.keyboard.UP) {
      this.clearIntervalsAnimationMove();
      this.world.keyboard.UP = true;
      this.sharkySwimAnimation();
      this.currentMovement = setInterval(() => {
        this.y -= 4;
      }, 10);
    }
  }

  moveSharkyDown() {
    if (!this.world.keyboard.DOWN) {
      this.clearIntervalsAnimationMove();
      this.world.keyboard.DOWN = true;
      this.sharkySwimAnimation();
      this.currentMovement = setInterval(() => {
        this.y += 4;
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
