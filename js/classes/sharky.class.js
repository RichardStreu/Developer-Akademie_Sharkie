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

import {
  sharkyStandAnimation,
  sharkyFallAsleepAnimation,
  sharkySleepAnimation,
  sharkySwimAnimation,
  sharkyBubbleWithoutAnimation,
  sharkyBubbleRegularAnimation,
  sharkyBubblePoisonAnimation,
  sharkyFinSlapAnimation,
  sharkyHurtRegularAnimation,
  sharkyHurtShockAnimation,
  sharkyDeadRegularAnimation,
  sharkyDeadShockAnimation,
} from "./sharky.action.animations.js";

import { letSharkySleep, moveSharkyLeft, moveSharkyRight, moveSharkyUp, moveSharkyDown, sharkyAttackSpace, sharkyAttackDKey } from "./sharky.action.movement.js";

import { hurtedByPufferFish, hurtedByJellyFishRD, hurtedByJellyFishSD, hurtedByEndBoss } from "./sharky.action.hurt.js";

export let sharkyXPosition;
export let sharkyYPosition;
export let sharkyWidth;
export let sharkyHeight;
//
export class Sharky extends MoveableObject {
  firstInterval;
  currentAnimationIntervall;
  currentMovement;
  isSwimLeft;
  isSwimRight;
  isSwimUp;
  isSwimDown;
  isCurrentlyHurt = false;
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
    this.setSharkyWindowEventListeners();
    this.firstSharkyAnimationAfterCacheLoading();
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

  setSharkyWindowEventListeners() {
    window.addEventListener("keydown", (event) => {
      this.handleKeyDown(event);
    });
    window.addEventListener("keyup", (event) => {
      this.handleKeyUp(event);
    });
  }

  firstSharkyAnimationAfterCacheLoading() {
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.sharkyStandAnimation();
        this.letSharkySleep();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  checkCurrentSharkyPositions() {
    setInterval(() => {
      sharkyXPosition = this.x;
      sharkyYPosition = this.y;
    }, 50);
  }

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  handleKeyDown(event) {
    if (event.key == "ArrowLeft") this.moveSharkyLeft();
    if (event.key == "ArrowRight") this.moveSharkyRight();
    if (event.key == "ArrowUp") this.moveSharkyUp();
    if (event.key == "ArrowDown") this.moveSharkyDown();
    if (event.key == " ") this.sharkyAttackSpace();
    if (event.key == "d") this.sharkyAttackDKey();
  }

  handleKeyUp(event) {
    if (event.key == "ArrowLeft") this.keyArrowLeftUp();
    if (event.key == "ArrowRight") this.keyArrowRightUp();
    if (event.key == "ArrowUp") this.keyArrowUpUp();
    if (event.key == "ArrowDown") this.keyArrowDownUp();
    if (event.key == " ") this.keySpaceUp();
    if (event.key == "d") this.keyDUp();
    if (Object.values(world.keyboard).every((value) => value === false)) this.allKeysUp();  
  }

  keyArrowLeftUp() {
    this.world.keyboard.LEFT = false;
    clearInterval(this.isSwimLeft);
  }

  keyArrowRightUp() {
    this.world.keyboard.RIGHT = false;
    clearInterval(this.isSwimRight);
  }

  keyArrowUpUp() {
    this.world.keyboard.UP = false;
    clearInterval(this.isSwimUp);
  }

  keyArrowDownUp() {
    this.world.keyboard.DOWN = false;
    clearInterval(this.isSwimDown);
  }

  keySpaceUp() {
    this.world.keyboard.SPACE = false;
  }

  keyDUp() {
    this.world.keyboard.DKey = false;
  }

  allKeysUp() {
    this.clearIntervalsAnimationMove();
    this.letSharkySleep();
    this.sharkyStandAnimation();
  }

  hurtSharky(enemy) {
    if (enemy == "PufferFishGreen" || enemy == "PufferFishOrange" || enemy == "PufferFishRed") this.hurtedByPufferFish();
    if (enemy == "JellyFishLilaRD" || enemy == "JellyFishYellowRD") this.hurtedByJellyFishRD();
    if (enemy == "JellyFishGreenSD" || enemy == "JellyFishPinkSD") this.hurtedByJellyFishSD();
    if (enemy == "EndBoss") this.hurtedByEndBoss();
  }
}

Sharky.prototype.sharkyStandAnimation = sharkyStandAnimation;
Sharky.prototype.sharkyFallAsleepAnimation = sharkyFallAsleepAnimation;
Sharky.prototype.sharkySleepAnimation = sharkySleepAnimation;
Sharky.prototype.sharkySwimAnimation = sharkySwimAnimation;
Sharky.prototype.sharkyBubbleWithoutAnimation = sharkyBubbleWithoutAnimation;
Sharky.prototype.sharkyBubbleRegularAnimation = sharkyBubbleRegularAnimation;
Sharky.prototype.sharkyBubblePoisonAnimation = sharkyBubblePoisonAnimation;
Sharky.prototype.sharkyFinSlapAnimation = sharkyFinSlapAnimation;
Sharky.prototype.sharkyHurtRegularAnimation = sharkyHurtRegularAnimation;
Sharky.prototype.sharkyHurtShockAnimation = sharkyHurtShockAnimation;
Sharky.prototype.sharkyDeadRegularAnimation = sharkyDeadRegularAnimation;
Sharky.prototype.sharkyDeadShockAnimation = sharkyDeadShockAnimation;

Sharky.prototype.letSharkySleep = letSharkySleep;
Sharky.prototype.moveSharkyLeft = moveSharkyLeft;
Sharky.prototype.moveSharkyRight = moveSharkyRight;
Sharky.prototype.moveSharkyUp = moveSharkyUp;
Sharky.prototype.moveSharkyDown = moveSharkyDown;
Sharky.prototype.sharkyAttackSpace = sharkyAttackSpace;
Sharky.prototype.sharkyAttackDKey = sharkyAttackDKey;

Sharky.prototype.hurtedByPufferFish = hurtedByPufferFish;
Sharky.prototype.hurtedByJellyFishRD = hurtedByJellyFishRD;
Sharky.prototype.hurtedByJellyFishSD = hurtedByJellyFishSD;
Sharky.prototype.hurtedByEndBoss = hurtedByEndBoss;
