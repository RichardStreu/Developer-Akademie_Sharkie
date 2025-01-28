/**
 * @module "sharky.action.hurt.js"
 */

import { playHurtSound, stopSwimSound, playSfxSound, stopAllLoopSounds } from "../sound.js";

/**
 * Increases the coin count for the player and plays a sound effect.
 * If the coin count reaches 20, the player's life energy is restored to 100 and the coin count is reset to 0.
 *
 * @param {Object} enemy - The enemy object (not used in the function).
 */
export function getCoins(enemy) {
  this.coin += 1;
  playSfxSound("coin", 0, false, 0.3);
  if (this.coin >= 20) {
    this.lifeEnergy = 100;
    this.coin = 0;
  }
}

/**
 * Increases the poison count for the current object and plays a sound effect.
 * If the poison count reaches 10 or more, sets the `isEnoughPoison` flag to true.
 *
 * @param {Object} enemy - The enemy object (not used in the function).
 */
export function getPoison(enemy) {
  this.poison += 1;
  playSfxSound("bottle", 0, false, 0.2);
  if (this.poison >= 10) this.isEnoughPoison = true;
}

/**
 * Handles the hurt animation for the sharky character.
 * 
 * This function clears any existing movement animation intervals,
 * sets the hurt animation flag to true, and ensures the attack animation
 * flag is set to false.
 * 
 * @function handleHurtAnimation
 */
export function handleHurtAnimation() {
  this.clearIntervalsAnimationMove();
  this.isCurrentlyHurtAnimation = true;
  this.isCurrentlyAttackAnimation = false;
}

/**
 * Resets the hurt animation for the sharky character.
 * 
 * This function clears any ongoing animation intervals, sets the sharky character
 * to its standing animation, and marks the character as not currently hurt.
 * 
 * @function resetHurtAnimation
 * @memberof Sharky
 */
export function resetHurtAnimation() {
  this.clearIntervalsAnimationMove();
  this.sharkyStandAnimation();
  this.isCurrentlyHurtAnimation = false;
}

/**
 * Handles the event when the sharky character is hurt by a puffer fish.
 * Reduces the life energy of the character and updates the corresponding status bar.
 * If the hurt animation is not currently playing, it triggers the hurt animation and plays a hurt sound.
 * After a delay, it resets the hurt animation and checks if the character is dead.
 *
 * @function hurtedByPufferFish
 */
export function hurtedByPufferFish() {
  if (!this.isCurrentlyFinSlap) {
    let demageFactor = -4;
    this.lifeEnergy += demageFactor;
    this.world.statBars[1].updatePercentageStatBar(demageFactor);
    if (!this.isCurrentlyHurtAnimation) {
      this.handleHurtAnimation();
      this.sharkyHurtRegularAnimation();
      playHurtSound("hurt1");
      setTimeout(() => (this.resetHurtAnimation(), this.isSharkyDead("regular")), 600);
    }
  }
}

/**
 * Handles the event when the shark is hurt by a jellyfish.
 * Reduces the shark's life energy and updates the corresponding status bar.
 * Triggers hurt animations and sound effects if not already in a hurt state.
 * 
 * @function hurtedByJellyFishRD
 * @memberof Sharky
 * @this Sharky
 */
export function hurtedByJellyFishRD() {
  if (!this.isCurrentlyFinSlap) {
    let demageFactor = -6;
    this.lifeEnergy += demageFactor;
    this.world.statBars[1].updatePercentageStatBar(demageFactor);
    if (!this.isCurrentlyHurtAnimation) {
      this.handleHurtAnimation();
      this.sharkyHurtRegularAnimation();
      playHurtSound("hurt2");
      setTimeout(() => (this.resetHurtAnimation(), this.isSharkyDead("regular")), 600);
    }
  }
}

/**
 * Handles the event when the sharky character is hurt by a jellyfish.
 * Reduces the life energy of the character and updates the corresponding stat bar.
 * Triggers hurt animations and sound effects if not already in a hurt state.
 * 
 * @function hurtedByJellyFishSD
 * @memberof Sharky
 * @this Sharky
 */
export function hurtedByJellyFishSD() {
  if (!this.isCurrentlyFinSlap) {
    let demageFactor = -10;
    this.lifeEnergy += demageFactor;
    this.world.statBars[1].updatePercentageStatBar(demageFactor);
    if (!this.isCurrentlyHurtAnimation) {
      this.handleHurtAnimation();
      this.sharkyHurtShockAnimation();
      playHurtSound("electroShock");
      setTimeout(() => (this.resetHurtAnimation(), this.isSharkyDead("electric")), 600);
    }
  }
}

/**
 * Handles the event when Sharky is hurt by the End Boss.
 * Reduces Sharky's life energy and updates the corresponding status bar.
 * Triggers hurt animations and sound effects if not already playing.
 * 
 * @function hurtedByEndBoss
 * @memberof Sharky
 */
export function hurtedByEndBoss() {
  let demageFactor = -20;
  this.lifeEnergy += demageFactor;
  this.world.statBars[1].updatePercentageStatBar(demageFactor);
  if (!this.isCurrentlyHurtAnimation) {
    this.handleHurtAnimation();
    this.sharkyHurtRegularAnimation();
    playHurtSound("hurt4");
    setTimeout(() => (this.resetHurtAnimation(), this.isSharkyDead("regular")), 600);
  }
}

/**
 * Checks if Sharky is dead based on its life energy.
 * If Sharky's life energy is less than or equal to 0, it stops the swim sound,
 * removes mobile listeners, and triggers the sharkyDead function.
 *
 * @param {string} kindOfDead - The type or reason for Sharky's death.
 */
export function isSharkyDead(kindOfDead) {
  if (this.lifeEnergy <= 0) {
    stopSwimSound();
    this.removeSharkyMobileListeners();
    this.sharkyDead(kindOfDead);
  }
}

/**
 * Handles the death animation and behavior for Sharky.
 *
 * @param {string} kindOfDead - The type of death animation to play. 
 *                              Can be "regular" or "shock".
 */
export function sharkyDead(kindOfDead) {
  stopAllLoopSounds();
  playSfxSound("backgroundLose");
  this.clearIntervalsAnimationMove();
  kindOfDead == "regular" ? this.sharkyDeadRegularAnimation() : this.sharkyDeadShockAnimation();
  setTimeout(() => {
    this.clearIntervalsAnimationMove();
    kindOfDead == "regular" ? this.floatToSurface("Sharky") : this.sinkToGround("Sharky");
  }, 1560);
}
