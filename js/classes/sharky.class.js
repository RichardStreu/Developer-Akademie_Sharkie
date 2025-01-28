/**
 * @module "sharky.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio } from "../script.js";
import { stopSwimSound } from "../sound.js";

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

import { handleKeyDown, setAllKeyDownsToFalse, handleKeyUp, keyArrowLeftUp, keyArrowRightUp, keyArrowUpUp, keyArrowDownUp, keySpaceUp, keyDUp, allKeysUp } from "./sharky.class.handleKeys.js";

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

  /**
   * Asynchronously loads and caches all images for the Sharky character.
   * This method sequentially loads images for various states and actions of Sharky,
   * including standing, sleeping, swimming, attacking, getting hurt, and dying.
   *
   * @async
   * @function loadAllImagesCacheSharky
   * @returns {Promise<void>} A promise that resolves when all images are loaded and cached.
   */
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

  /**
   * Sets up mobile event listeners for Sharky controls.
   *
   * This method adds touch event listeners to various buttons for controlling Sharky's actions and movements.
   *
   * Event listeners added:
   * - "touchend" on "attackBubbleBtn" to handle bubble attack.
   * - "touchend" on "attackFinSlapBtn" to handle fin slap attack.
   * - "touchstart" and "touchend" on "moveRightBtn" to handle moving right.
   * - "touchstart" and "touchend" on "moveLeftBtn" to handle moving left.
   * - "touchstart" and "touchend" on "moveUpBtn" to handle moving up.
   * - "touchstart" and "touchend" on "moveDownBtn" to handle moving down.
   */
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

 

  /**
   * Removes all mobile event listeners for the Sharky character.
   * This includes touchstart and touchend event listeners for attack and movement buttons.
   */
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

  /**
   * Sets event listeners for keydown and keyup events on the window.
   *
   * This method attaches event listeners to the window object to handle
   * keydown and keyup events. The handlers for these events are defined
   * in the `handleKeyDown` and `handleKeyUp` methods of the class.
   *
   * @method setSharkyWindowEventListeners
   */
  setSharkyWindowEventListeners() {
    this.keyDownHandler = window.addEventListener("keydown", (event) => this.handleKeyDown(event));
    this.keyUpHandler = window.addEventListener("keyup", (event) => this.handleKeyUp(event));
  }

  /**
   * Removes the event listeners for "keydown" and "keyup" events from the window.
   * This method detaches the keyDownHandler and keyUpHandler functions from the respective events.
   */
  removeSharkyWindowEventListeners() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  }

  /**
   * Starts the first sharky animation after the image cache has loaded.
   * This method sets an interval that checks if the image cache is loaded.
   * Once the cache is loaded, it triggers the sharky stand animation and clears the interval.
   */
  firstSharkyAnimationAfterCacheLoading() {
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) this.sharkyStandAnimation(), clearInterval(this.firstInterval);
    }, 100);
  }

  /**
   * Continuously updates the current X and Y positions of the sharky object at regular intervals.
   * The positions are updated every 50 milliseconds.
   *
   * @method checkCurrentSharkyPositions
   * @memberof Sharky
   */
  checkCurrentSharkyPositions() {
    this.currentPositionInterval = setInterval(() => ((sharkyXPosition = this.x), (sharkyYPosition = this.y)), 50);
  }

  /**
   * Clears all intervals related to the Sharky instance.
   * This includes movement intervals, current position interval, and animation move intervals.
   */
  clearAllSharkyIntervals() {
    this.clearMovementIntervals(), this.clearCurrentPositionInterval(), this.clearIntervalsAnimationMove();
  }

  /**
   * Clears the interval that updates the current position.
   * This method stops the interval set for updating the current position by calling clearInterval on the stored interval ID.
   */
  clearCurrentPositionInterval() {
    clearInterval(this.currentPositionInterval);
  }

  /**
   * Clears the intervals for the current movement and animation.
   *
   * This method stops the intervals that control the movement and animation
   * of the object by calling `clearInterval` on `this.currentMovement` and
   * `this.currentAnimationIntervall`.
   */
  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement), clearInterval(this.currentAnimationIntervall);
  }

  /**
   * Resets the state of the Sharky character by performing the following actions:
   * - Clears any active animation intervals.
   * - Puts Sharky into a sleep state.
   * - Sets Sharky to the standing animation.
   */
  resetSharkyState() {
    this.clearIntervalsAnimationMove(), this.letSharkySleep(), this.sharkyStandAnimation();
  }

  /**
   * Clears all movement intervals for the shark.
   * This method stops the shark from swimming in any direction by clearing the intervals
   * associated with swimming left, right, up, and down.
   */
  clearMovementIntervals() {
    clearInterval(this.isSwimLeft), clearInterval(this.isSwimRight), clearInterval(this.isSwimUp), clearInterval(this.isSwimDown);
  }

  /**
   * Checks if the shark is not swimming in any direction and stops the swimming sound if true.
   *
   * This method checks the state of the keyboard inputs for the directions LEFT, RIGHT, UP, and DOWN.
   * If none of these keys are pressed, it calls the stopSwimSound() function to stop the swimming sound.
   */
  checkSwimmingForStopSound() {
    if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.UP && !this.world.keyboard.DOWN) {
      stopSwimSound();
    }
  }

  /**
   * Checks if the mobile buttons are available (visible) on the page.
   *
   * This function retrieves the element with the ID "mobileBtnMoveBox" and checks its
   * computed display style. If the display style is "none", it means the buttons are
   * not available (hidden). Otherwise, the buttons are available (visible).
   *
   * @returns {boolean} True if the mobile buttons are available (visible), false otherwise.
   */
  areMobileButtonsAvailable() {
    let buttons = document.getElementById("mobileBtnMoveBox");
    let buttonsAvaiable;
    window.getComputedStyle(buttons).display === "none" ? (buttonsAvaiable = false) : (buttonsAvaiable = true);
    return buttonsAvaiable;
  }

  /**
   * Handles the interaction between the shark and various enemies.
   * Depending on the type of enemy, it triggers different actions.
   *
   * @param {string} enemy - The type of enemy the shark interacts with.
   *                         Possible values are "Coin", "Poison", "PufferFishGreen",
   *                         "PufferFishOrange", "PufferFishRed", "JellyFishLilaRD",
   *                         "JellyFishYellowRD", "JellyFishGreenSD", "JellyFishPinkSD",
   *                         and "EndBoss".
   */
  hurtSharky(enemy) {
    if (this.lifeEnergy > 0) {
      if (enemy == "Coin") this.getCoins(enemy);
      if (enemy == "Poison") this.getPoison(enemy);
      if (enemy == "PufferFishGreen" || enemy == "PufferFishOrange" || enemy == "PufferFishRed") this.hurtedByPufferFish();
      if (enemy == "JellyFishLilaRD" || enemy == "JellyFishYellowRD") this.hurtedByJellyFishRD();
      if (enemy == "JellyFishGreenSD" || enemy == "JellyFishPinkSD") this.hurtedByJellyFishSD();
      if (enemy == "EndBoss") this.hurtedByEndBoss();
    }
  }
}

Sharky.prototype.handleKeyDown = handleKeyDown;
Sharky.prototype.setAllKeyDownsToFalse = setAllKeyDownsToFalse;
Sharky.prototype.handleKeyUp = handleKeyUp;
Sharky.prototype.keyArrowLeftUp = keyArrowLeftUp;
Sharky.prototype.keyArrowRightUp = keyArrowRightUp;
Sharky.prototype.keyArrowUpUp = keyArrowUpUp;
Sharky.prototype.keyArrowDownUp = keyArrowDownUp;
Sharky.prototype.keySpaceUp = keySpaceUp;
Sharky.prototype.keyDUp = keyDUp;
Sharky.prototype.allKeysUp = allKeysUp;

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
