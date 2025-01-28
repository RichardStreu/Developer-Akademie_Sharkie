/**
 * @module "endboss.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio, youWinOrLose } from "../script.js";
import { imagesBossIntroduce, imagesBossSwim, imagesBossAttack, imagesBossDead } from "./endboss.class.images.js";
import { playSfxSound, stopSound } from "../sound.js";

export class EndBoss extends MoveableObject {
  currentAnimationIntervall;
  currentSharkyPositionInterval;
  countSecondsInterval;
  endBossLifeBarInterval;
  currentMovement;
  currentlyMoveUp = true;
  floating;
  world;
  bossUpDown;
  bossIsVisible = false;
  bossIsDead = false;
  moveBossForward;
  sprintForwardInterval;
  currentPlaytime = 0;
  sharkyX;
  sharkyY;
  isEnemyDead = false;

  /**
   * Creates an instance of the Endboss class.
   * 
   * @constructor
   * @param {number} index - The index of the endboss.
   * 
   * @property {number} x - The x-coordinate of the endboss.
   * @property {number} y - The y-coordinate of the endboss.
   * @property {number} width - The width of the endboss, scaled by moveObjRatio.
   * @property {number} height - The height of the endboss, scaled by moveObjRatio.
   * 
   * @method loadAllImagesEndboss - Loads all images for the endboss.
   * @method checkImagesCacheLoaded - Checks if all images are loaded in the cache.
   * @method checkSharkyPosition - Checks the position of Sharky.
   * @method countSeconds - Starts a timer to count seconds.
   */
  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.x = 2750;
    this.y = -1000;
    this.width = 300 * moveObjRatio;
    this.height = 342 * moveObjRatio;
    this.loadAllImagesEndboss();
    this.checkImagesCacheLoaded();
    this.checkSharkyPosition();
    this.countSeconds();
  }

  /**
   * Asynchronously loads all images for the end boss by caching them.
   * This method loads images for different states of the end boss, including
   * introduction, swimming, attacking, and dead states.
   *
   * @async
   * @function loadAllImagesEndboss
   * @returns {Promise<void>} A promise that resolves when all images are loaded.
   */
  async loadAllImagesEndboss() {
    await this.loadImageCache(imagesBossIntroduce, this.constructor.name);
    await this.loadImageCache(imagesBossSwim, this.constructor.name);
    await this.loadImageCache(imagesBossAttack, this.constructor.name);
    await this.loadImageCache(imagesBossDead, this.constructor.name);
  }

  /**
   * Clears all intervals related to the EndBoss.
   * This includes intervals for boss movement, animations, and other timed actions.
   */
  clearAllEndBossIntervals() {
    clearInterval(this.bossUpDown);
    clearInterval(this.moveBossForward);
    clearInterval(this.sprintForwardInterval);
    clearInterval(this.currentAnimationIntervall);
    clearInterval(this.currentSharkyPositionInterval);
    clearInterval(this.countSecondsInterval);
    clearInterval(this.endBossLifeBarInterval);
    this.clearIntervalsAnimationMove();
  }

  /**
   * Sets an interval to update the life bar of the end boss.
   * The interval checks the life energy of the end boss every 100 milliseconds.
   * If the life energy is 0 or the end boss is dead, the interval is cleared and the life bar is set to 0%.
   * Otherwise, the life bar width is updated based on the current life energy.
   */
  setLifeBarInterval() {
    this.endBossLifeBarInterval = setInterval(() => {
      if (this.world.enemies[17].lifeEnergy <= 0) {
        clearInterval(this.endBossLifeBarInterval);
      }
      if (this.world.enemies[17].lifeEnergy > 0) {
        document.getElementById("innerLifeBar").style.width = `${this.world.enemies[17].lifeEnergy}%`;
      }
      if (this.world.enemies[17].isEnemyDead) {
        document.getElementById("innerLifeBar").style.width = `0%`;
        clearInterval(this.endBossLifeBarInterval);
      }
    }, 100);
  }

  /**
   * Starts a timer that increments the current playtime by one second every second.
   * 
   * @method
   * @memberof Endboss
   */
  countSeconds() {
    this.countSecondsInterval = setInterval(() => {
      this.currentPlaytime += 1;
    }, 1000);
  }

  /**
   * Continuously checks the position of Sharky in the game world.
   * If Sharky's x-coordinate reaches 2300 and the boss is not yet visible,
   * it triggers the boss introduction and stops checking the position.
   * 
   * @method checkSharkyPosition
   * @memberof Endboss
   */
  checkSharkyPosition() {
    this.currentSharkyPositionInterval = setInterval(() => {
      this.sharkyX = this.world.sharky.x;
      this.sharkyY = this.world.sharky.y;
      if (this.sharkyX >= 2300 && !this.bossIsVisible) this.doBossIntroduce(), clearInterval(this.currentSharkyPositionInterval);
    }, 100);
  }

  /**
   * Introduces the boss character by clearing any existing animation intervals,
   * starting a new image animation for the boss introduction, and displaying the
   * boss's life bar after a delay.
   */
  bossIntroduce() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossIntroduce, this.img, 150);
    setTimeout(() => {
      document.getElementById("endBossLifeBar").classList.remove("d_none");
      this.setLifeBarInterval();
    }, 1000);
  }

  /**
   * Plays the introduction sounds for the boss encounter.
   */
  playBossIntroduceSounds() {
    playSfxSound("bossSplash");
    stopSound("backgroundRetroArcade");
    playSfxSound("backgroundMetal");
  }

  /**
   * Sets the movement intervals for the boss character.
   */
  setBossMovementIntervals() {
    this.moveBossUpDown();
    this.moveBossForBackwards();
    this.sprintBossForwards();
  }

  /**
   * Introduces the boss character by making it visible, setting its initial position,
   * and initiating its movement and sounds.
   */
  doBossIntroduce() {
    this.bossIsVisible = true;
    this.y = -50;
    this.bossIntroduce();
    this.setBossMovementIntervals();
    setTimeout(() => this.playBossIntroduceSounds(), 500);
    setTimeout(() => (this.clearIntervalsAnimationMove(), this.bossSwim()), 1500);
  }

  /**
   * Moves the boss character up and down within a specified range.
   * 
   * The boss will move up until it reaches the minimum Y coordinate (minY),
   * then it will move down until it reaches the maximum Y coordinate (maxY).
   * This movement is controlled by a setInterval function that updates the
   * boss's Y coordinate every 10 milliseconds.
   * 
   * @method moveBossUpDown
   * @memberof EndBoss
   */
  moveBossUpDown() {
    let minY = -110;
    let maxY = 130;
    this.bossUpDown = setInterval(() => {
      if (this.currentlyMoveUp && this.y >= minY) this.y -= 1.5;
      if (this.currentlyMoveUp && this.y < minY) this.currentlyMoveUp = false;
      if (!this.currentlyMoveUp && this.y < maxY) this.y += 1.5;
      if (!this.currentlyMoveUp && this.y >= maxY) this.currentlyMoveUp = true;
    }, 10);
  }

  /**
   * Moves the boss character backwards based on the position of the sharky character.
   * The boss will follow sharky if sharky's x position is less than or equal to 2800 and the boss has life energy.
   * If sharky's x position is greater than 2800 or the boss has no life energy, the boss will move to a fixed position (3100).
   * The movement is updated every 10 milliseconds.
   */
  moveBossForBackwards() {
    this.moveBossForward = setInterval(() => {
      if (this.world.sharky.x <= 2800 && this.lifeEnergy > 0) {
        this.x = this.world.sharky.x + 300;
      } else {
        this.x = 3100;
      }
    }, 10);
  }

  /**
   * Initiates the sprint forward action for the boss character.
   * The boss will sprint forward and then back in a specified range.
   * The sprint action is repeated at intervals.
   * 
   * - The boss will sprint forward if the player's life energy is greater than 0.
   * - The boss will change direction when reaching the end of the range.
   * - The sprint action will stop and reset when the boss returns to the starting position.
   * 
   * @method sprintBossForwards
   * @memberof EndBoss
   */
  sprintBossForwards() {
    this.sprintForwardInterval = setInterval(() => {
      if (this.world.sharky.lifeEnergy > 0) {
        this.sprintBossBossAttackFunctions();
        let direction = "left";
        let xRange = 0;
        let interval = setInterval(() => {
          if (xRange < 360 && direction == "left") {
            this.world.sharky.x <= 2800 ? (this.x = this.world.sharky.x + (300 - xRange)) : (this.x = 3100 - xRange), setTimeout(() => (xRange += 5), 2);
          }
          if (xRange >= 360 && direction == "left") direction = "right";
          if (xRange > 0 && direction == "right") {
            this.world.sharky.x <= 2800 ? (this.x = this.world.sharky.x + (300 - xRange)) : (this.x = 3100 - xRange), setTimeout(() => (xRange -= 5), 2);
          }
          if (xRange <= 0 && direction == "right") {
            (direction = "left"), (xRange = 0), (this.x = this.world.sharky.x + 300);
            this.sprintBossBossSwimFunctions();
            clearInterval(interval);
          }
        }, 10);
      }
    }, 4000);
  }

  /**
   * Handles the boss attack sequence by clearing existing intervals and initiating the boss attack.
   * 
   * This function performs the following actions:
   * - Clears the interval responsible for moving the boss forward.
   * - Clears the current animation interval.
   * - Initiates the boss attack sequence.
   */
  sprintBossBossAttackFunctions() {
    clearInterval(this.moveBossForward);
    clearInterval(this.currentAnimationIntervall);
    this.bossAttack();
  }

  /**
   * Handles the swimming and movement functions for the boss character.
   * This method calls the bossSwim and moveBossForBackwards functions.
   */
  sprintBossBossSwimFunctions() {
    this.bossSwim();
    this.moveBossForBackwards();
  }

  /**
   * Clears the intervals for the current movement and animation.
   * 
   * This method stops the ongoing movement and animation intervals
   * by calling `clearInterval` on `this.currentMovement` and 
   * `this.currentAnimationIntervall`.
   */
  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  /**
   * Handles the swimming animation for the boss character.
   * Clears any existing animation intervals and starts a new swimming animation.
   */
  bossSwim() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossSwim, this.img, 180);
  }

  /**
   * Initiates the boss attack sequence.
   * 
   * This method performs the following actions:
   * 1. Plays the boss scream sound effect.
   * 2. Clears any existing animation move intervals.
   * 3. Starts the boss attack image animation.
   * 
   * @method bossAttack
   */
  bossAttack() {
    playSfxSound("bossScream", 0, false, 0);
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossAttack, this.img, 180);
  }

  /**
   * Handles the actions to be taken when the boss character is defeated.
   * Clears any ongoing animation intervals and initiates the death animation sequence.
   */
  bossDead() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossDead, this.img, 150);
  }

  /**
   * Handles the logic for when the enemy (boss) is dead.
   * It stops the boss's movement, sets the boss and enemy status to dead,
   * and triggers the necessary animations and sequences for the boss's defeat.
   */
  enemyIsDead() {
    if (!this.bossIsDead) {
      clearInterval(this.moveBossForward);
      clearInterval(this.sprintForwardInterval);
      this.bossIsDead = true;
      this.isEnemyDead = true;
      this.bossDead();
      this.endBossDeathAnimation();
      this.triggerEndBossDefeatSequence();
    }
  }

  /**
   * Triggers the death animation for the end boss.
   * 
   * This function clears any ongoing animation intervals and sets a timeout to change the end boss image to the dead state after 600 milliseconds.
   * 
   * @method endBossDeathAnimation
   * @memberof EndBoss
   */
  endBossDeathAnimation() {
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      clearInterval(this.bossUpDown);
      this.loadImage("../../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png");
    }, 600);
  }

  /**
   * Triggers the sequence of events that occur when the end boss is defeated.
   * 
   * This function initiates a series of actions:
   * 1. Waits for 1.5 seconds before starting the sequence.
   * 2. Calls `floatToSurface` to make the end boss float upwards.
   * 3. Stops the background metal sound and plays the victory sound.
   * 4. Sets an interval to check the position of the end boss every 10 milliseconds.
   * 5. If the end boss reaches a y-coordinate of -430 or above, it clears the movement and animation intervals,
   *    displays the win screen, and clears the floating interval.
   */
  triggerEndBossDefeatSequence() {
    setTimeout(() => {
      this.floatToSurface();
      stopSound("backgroundMetal");
      playSfxSound("backgroundWin");
      const floatingInterval = setInterval(() => {
        if (this.y <= -430) {
          clearInterval(this.currentMovement);
          clearInterval(this.currentAnimationIntervall);
          youWinOrLose('winScreen');
          clearInterval(floatingInterval);
        }
      }, 10);
    }, 1500);
  }
}
