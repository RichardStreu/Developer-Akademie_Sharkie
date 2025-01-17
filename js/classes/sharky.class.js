import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio } from "../script.js";
import { stopSwimSound, stopSound} from "../sound.js";

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

import { letSharkySleep, moveSharkyLeft, moveSharkyRight, moveSharkyUp, moveSharkyDown, sharkyAttackSpace, shootBubble, sharkyAttackDKey, doFinSlap } from "./sharky.action.movement.js";

import {
  getCoins,
  getPoison,
  hurtedByPufferFish,
  hurtedByJellyFishRD,
  hurtedByJellyFishSD,
  hurtedByEndBoss,
  regularHurt,
  electricHurt,
  isSharkyDead,
  regularDead,
  electricDead,
} from "./sharky.action.hurt.js";

export let sharkyXPosition = 0;
export let sharkyYPosition = 200;
export let sharkyWidth = 216;
export let sharkyHeight;
//
export class Sharky extends MoveableObject {
  firstInterval;
  currentAnimationIntervall;
  currentPositionInterval;
  currentMovement;
  isSwimLeft;
  isSwimRight;
  isSwimUp;
  isSwimDown;
  isCurrentlyHurt = false;
  isCurrentlyHurtAnimation = false;
  isCurrentlyAttackAnimation = false;
  isCurrentlyFinSlap = false;
  
  currentFinSlap = "none"; // "right", "left"
  world;
  lifeEnergy = 100;
  coin = 0;
  poison = 0;
  // isEnoughPoison;
  isEnoughCoin;

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
    this.isEnoughPoison = false;
    this.isEnoughCoin = false;
    this.keyDownHandler = this.handleKeyDown.bind(this);
    this.keyUpHandler = this.handleKeyUp.bind(this);
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

  removeSharkyWindowEventListeners() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  }

  firstSharkyAnimationAfterCacheLoading() {
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.sharkyStandAnimation();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  checkCurrentSharkyPositions() {
    this.currentPositionInterval = setInterval(() => {
      sharkyXPosition = this.x;
      sharkyYPosition = this.y;
    }, 50);
  }

  clearAllSharkyIntervals() {
    this.clearMovementIntervals();
    this.clearCurrentPositionInterval();
    this.clearIntervalsAnimationMove();
  }

  clearCurrentPositionInterval() {
    clearInterval(this.currentPositionInterval);
  }

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  handleKeyDown(event) {
    if (this.lifeEnergy > 0 && !this.isCurrentlyAttackAnimation) {
      if (event.key == "ArrowLeft") this.moveSharkyLeft();
      if (event.key == "ArrowRight") this.moveSharkyRight();
      if (event.key == "ArrowUp") this.moveSharkyUp();
      if (event.key == "ArrowDown") this.moveSharkyDown();
      if (event.key == " ") this.sharkyAttackSpace();
      if (event.key == "d") this.sharkyAttackDKey();
      stopSound('snore');
    }
  }

  handleKeyUp(event) {
    if (this.lifeEnergy > 0) {
      if (event.key == "ArrowLeft") this.keyArrowLeftUp();
      if (event.key == "ArrowRight") this.keyArrowRightUp();
      if (event.key == "ArrowUp") this.keyArrowUpUp();
      if (event.key == "ArrowDown") this.keyArrowDownUp();
      if (event.key == " ") this.keySpaceUp();
      if (event.key == "d") this.keyDUp();
      if (Object.values(this.world.keyboard).every((value) => value === false)) this.allKeysUp();
    }
  }

  setAllKeyDownsToFalse() {
    this.world.keyboard.LEFT = false;
    this.world.keyboard.RIGHT = false;
    this.world.keyboard.UP = false;
    this.world.keyboard.DOWN = false;
    this.world.keyboard.SPACE = false;
    this.world.keyboard.DKey = false;
  }

  clearMovementIntervals() {
    clearInterval(this.isSwimLeft);
    clearInterval(this.isSwimRight);
    clearInterval(this.isSwimUp);
    clearInterval(this.isSwimDown);
  }

  checkSwimmingForStopSound() {
    if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.UP && !this.world.keyboard.DOWN) {
      stopSwimSound();
    }
  }

  keyArrowLeftUp() {
    this.world.keyboard.LEFT = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimLeft);
  }
  keyArrowRightUp() {
    this.world.keyboard.RIGHT = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimRight);
  }
  keyArrowUpUp() {
    this.world.keyboard.UP = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimUp);
  }
  keyArrowDownUp() {
    this.world.keyboard.DOWN = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimDown);
  }
  keySpaceUp() {
    this.world.keyboard.SPACE = false;
  }
  keyDUp() {
    this.world.keyboard.DKey = false;
  }
  allKeysUp() {
    if (this.isCurrentlyAttackAnimation) {
      setTimeout(() => {
        if (this.isCurrentlyAttackAnimation) this.isCurrentlyAttackAnimation = false;
        this.clearIntervalsAnimationMove();
        this.letSharkySleep();
        this.sharkyStandAnimation();
      }, 600);
    }
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyAttackAnimation) {
      this.clearIntervalsAnimationMove();
      this.letSharkySleep();
      this.sharkyStandAnimation();
    }
  }

  hurtSharky(enemy) {
    if (this.lifeEnergy > 0) {
      if (enemy == "Coin") {
        this.getCoins(enemy);
      }
      if (enemy == "Poison") this.getPoison(enemy);
      if (enemy == "PufferFishGreen" || enemy == "PufferFishOrange" || enemy == "PufferFishRed") this.hurtedByPufferFish();
      if (enemy == "JellyFishLilaRD" || enemy == "JellyFishYellowRD") this.hurtedByJellyFishRD();
      if (enemy == "JellyFishGreenSD" || enemy == "JellyFishPinkSD") this.hurtedByJellyFishSD();
      if (enemy == "EndBoss") this.hurtedByEndBoss();
    }
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
Sharky.prototype.shootBubble = shootBubble;
Sharky.prototype.sharkyAttackDKey = sharkyAttackDKey;
Sharky.prototype.doFinSlap = doFinSlap;

Sharky.prototype.getPoison = getPoison;
Sharky.prototype.getCoins = getCoins;
Sharky.prototype.hurtedByPufferFish = hurtedByPufferFish;
Sharky.prototype.hurtedByJellyFishRD = hurtedByJellyFishRD;
Sharky.prototype.hurtedByJellyFishSD = hurtedByJellyFishSD;
Sharky.prototype.hurtedByEndBoss = hurtedByEndBoss;
Sharky.prototype.regularHurt = regularHurt;
Sharky.prototype.electricHurt = electricHurt;
Sharky.prototype.isSharkyDead = isSharkyDead;
Sharky.prototype.regularDead = regularDead;
Sharky.prototype.electricDead = electricDead;
