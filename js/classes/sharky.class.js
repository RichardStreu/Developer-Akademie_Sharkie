import { MoveableObject } from "./moveable-object.class.js";

import { moveObjRatio } from "../script.js";

import { stopSwimSound, stopSound, stopAllLoopSounds } from "../sound.js";

import {
  imagesStand,
  imagesSleep,
  imagesSwim,
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
  sharkySleepAnimation,
  sharkySwimAnimation,
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
  isSharkyDead,
  sharkyDead,
  handleHurtAnimation,
  resetHurtAnimation,
} from "./sharky.action.hurt.js";

export let sharkyXPosition = 0;
export let sharkyYPosition = 200;
export let sharkyWidth = 216;
export let sharkyHeight;
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
  isCurrentlyBubbleAttack = false;
  currentFinSlap = "none";
  world;
  lifeEnergy = 100;
  coin = 0;
  poison = 0;
  isEnoughCoin;

  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
    this.x = 0;
    this.y = 30;
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
    this.attackBubbleHandler = this.sharkyAttackSpace.bind(this);
    this.attackFinSlapHandler = this.sharkyAttackDKey.bind(this);
    this.moveRightStartHandler = this.moveSharkyRight.bind(this);
    this.moveRightEndHandler = this.keyArrowRightUp.bind(this);
    this.moveLeftStartHandler = this.moveSharkyLeft.bind(this);
    this.moveLeftEndHandler = this.keyArrowLeftUp.bind(this);
    this.moveUpStartHandler = this.moveSharkyUp.bind(this);
    this.moveUpEndHandler = this.keyArrowUpUp.bind(this);
    this.moveDownStartHandler = this.moveSharkyDown.bind(this);
    this.moveDownEndHandler = this.keyArrowDownUp.bind(this);
  }

  async loadAllImagesCacheSharky() {
    await this.loadImageCache(imagesStand, this.constructor.name);
    await this.loadImageCache(imagesSleep, this.constructor.name);
    await this.loadImageCache(imagesSwim, this.constructor.name);
    await this.loadImageCache(imagesAttackBubbleRegular, this.constructor.name);
    await this.loadImageCache(imagesAttackBubblePoison, this.constructor.name);
    await this.loadImageCache(imagesAttackFinSlap, this.constructor.name);
    await this.loadImageCache(imagesHurtRegular, this.constructor.name);
    await this.loadImageCache(imagesHurtShock, this.constructor.name);
    await this.loadImageCache(imagesDeadRegular, this.constructor.name);
    await this.loadImageCache(imagesDeadShock, this.constructor.name);
  }

  setSharkyMobileEventListeners() {
    document.getElementById("attackBubbleBtn").addEventListener("touchend", this.attackBubbleHandler);
    document.getElementById("attackFinSlapBtn").addEventListener("touchend", this.attackFinSlapHandler);
    document.getElementById("moveRightBtn").addEventListener("touchstart", this.moveRightStartHandler);
    document.getElementById("moveRightBtn").addEventListener("touchend", this.moveRightEndHandler);
    document.getElementById("moveLeftBtn").addEventListener("touchstart", this.moveLeftStartHandler);
    document.getElementById("moveLeftBtn").addEventListener("touchend", this.moveLeftEndHandler);
    document.getElementById("moveUpBtn").addEventListener("touchstart", this.moveUpStartHandler);
    document.getElementById("moveUpBtn").addEventListener("touchend", this.moveUpEndHandler);
    document.getElementById("moveDownBtn").addEventListener("touchstart", this.moveDownStartHandler);
    document.getElementById("moveDownBtn").addEventListener("touchend", this.moveDownEndHandler);
  }

  removeSharkyMobileListeners() {
    document.getElementById("attackBubbleBtn").removeEventListener("touchend", this.attackBubbleHandler);
    document.getElementById("attackFinSlapBtn").removeEventListener("touchend", this.attackFinSlapHandler);
    document.getElementById("moveRightBtn").removeEventListener("touchstart", this.moveRightStartHandler);
    document.getElementById("moveRightBtn").removeEventListener("touchend", this.moveRightEndHandler);
    document.getElementById("moveLeftBtn").removeEventListener("touchstart", this.moveLeftStartHandler);
    document.getElementById("moveLeftBtn").removeEventListener("touchend", this.moveLeftEndHandler);
    document.getElementById("moveUpBtn").removeEventListener("touchstart", this.moveUpStartHandler);
    document.getElementById("moveUpBtn").removeEventListener("touchend", this.moveUpEndHandler);
    document.getElementById("moveDownBtn").removeEventListener("touchstart", this.moveDownStartHandler);
    document.getElementById("moveDownBtn").removeEventListener("touchend", this.moveDownEndHandler);
  }

  setSharkyWindowEventListeners() {
    this.keyDownHandler = window.addEventListener("keydown", (event) => this.handleKeyDown(event));
    this.keyUpHandler = window.addEventListener("keyup", (event) => this.handleKeyUp(event));
  }

  removeSharkyWindowEventListeners() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  }

  firstSharkyAnimationAfterCacheLoading() {
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) this.sharkyStandAnimation(), clearInterval(this.firstInterval);
    }, 100);
  }

  checkCurrentSharkyPositions() {
    this.currentPositionInterval = setInterval(() => ((sharkyXPosition = this.x), (sharkyYPosition = this.y)), 50);
  }

  clearAllSharkyIntervals() {
    this.clearMovementIntervals(), this.clearCurrentPositionInterval(), this.clearIntervalsAnimationMove();
  }

  clearCurrentPositionInterval() {
    clearInterval(this.currentPositionInterval);
  }

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement), clearInterval(this.currentAnimationIntervall);
  }

  resetSharkyState() {
    this.clearIntervalsAnimationMove(), this.letSharkySleep(), this.sharkyStandAnimation();
  }

  handleKeyDown(event) {
    if (
      this.lifeEnergy > 0 &&
      !this.isCurrentlyAttackAnimation &&
      document.getElementById("winScreen").classList.contains("d_none") &&
      document.getElementById("looseScreen").classList.contains("d_none")
    ) {
      if (event.key == "ArrowLeft") this.moveSharkyLeft();
      if (event.key == "ArrowRight") this.moveSharkyRight();
      if (event.key == "ArrowUp") this.moveSharkyUp();
      if (event.key == "ArrowDown") this.moveSharkyDown();
      if (event.key == " ") this.sharkyAttackSpace();
      if (event.key == "d") this.sharkyAttackDKey();
      stopSound("snore");
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

  areMobileButtonsAvailable() {
    let buttons = document.getElementById("mobileBtnMoveBox");
    let buttonsAvaiable;
    window.getComputedStyle(buttons).display === "none" ? (buttonsAvaiable = false) : (buttonsAvaiable = true);
    return buttonsAvaiable;
  }

  keyArrowLeftUp() {
    this.world.keyboard.LEFT = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimLeft);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) {
        this.resetSharkyState();
      }
    }
  }

  keyArrowRightUp() {
    this.world.keyboard.RIGHT = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimRight);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) {
        this.resetSharkyState();
      }
    }
  }

  keyArrowUpUp() {
    this.world.keyboard.UP = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimUp);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) {
        this.resetSharkyState();
      }
    }
  }

  keyArrowDownUp() {
    this.world.keyboard.DOWN = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimDown);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) {
        this.resetSharkyState();
      }
    }
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
        this.resetSharkyState();
      }, 600);
    }
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyAttackAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) {
      this.resetSharkyState();
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
Sharky.prototype.sharkySleepAnimation = sharkySleepAnimation;
Sharky.prototype.sharkySwimAnimation = sharkySwimAnimation;
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
Sharky.prototype.handleHurtAnimation = handleHurtAnimation;
Sharky.prototype.resetHurtAnimation = resetHurtAnimation;

Sharky.prototype.getPoison = getPoison;
Sharky.prototype.getCoins = getCoins;
Sharky.prototype.hurtedByPufferFish = hurtedByPufferFish;
Sharky.prototype.hurtedByJellyFishRD = hurtedByJellyFishRD;
Sharky.prototype.hurtedByJellyFishSD = hurtedByJellyFishSD;
Sharky.prototype.hurtedByEndBoss = hurtedByEndBoss;
Sharky.prototype.isSharkyDead = isSharkyDead;
Sharky.prototype.sharkyDead = sharkyDead;
