/**
 * @module "sharky.class.handleKeys.js"
 */

/**
 * Handles the keydown event for controlling the sharky character.
 *
 * @param {KeyboardEvent} event - The keyboard event object.
 * @this {Object} The context in which the function is called, expected to have properties:
 *   - lifeEnergy {number}: The current life energy of the sharky character.
 *   - isCurrentlyAttackAnimation {boolean}: Indicates if the sharky character is currently in an attack animation.
 *   - moveSharkyLeft {Function}: Function to move the sharky character to the left.
 *   - moveSharkyRight {Function}: Function to move the sharky character to the right.
 *   - moveSharkyUp {Function}: Function to move the sharky character up.
 *   - moveSharkyDown {Function}: Function to move the sharky character down.
 *   - sharkyAttackSpace {Function}: Function to make the sharky character attack using the space key.
 *   - sharkyAttackDKey {Function}: Function to make the sharky character attack using the 'd' key.
 */
export function handleKeyDown(event) {
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

/**
 * Resets all keyboard key states to false.
 * This function sets the state of the following keys to false:
 * LEFT, RIGHT, UP, DOWN, SPACE, and DKey.
 */
export function setAllKeyDownsToFalse() {
  this.world.keyboard.LEFT = false;
  this.world.keyboard.RIGHT = false;
  this.world.keyboard.UP = false;
  this.world.keyboard.DOWN = false;
  this.world.keyboard.SPACE = false;
  this.world.keyboard.DKey = false;
} 

/**
 * Handles the key up event for the game character.
 *
 * @param {KeyboardEvent} event - The keyboard event object.
 * @this {Object} - The context in which the function is called, expected to have properties:
 *   - lifeEnergy {number} - The life energy of the character.
 *   - world {Object} - The game world object, expected to have a keyboard property.
 *   - keyArrowLeftUp {Function} - Function to handle the ArrowLeft key up event.
 *   - keyArrowRightUp {Function} - Function to handle the ArrowRight key up event.
 *   - keyArrowUpUp {Function} - Function to handle the ArrowUp key up event.
 *   - keyArrowDownUp {Function} - Function to handle the ArrowDown key up event.
 *   - keySpaceUp {Function} - Function to handle the Space key up event.
 *   - keyDUp {Function} - Function to handle the 'd' key up event.
 *   - allKeysUp {Function} - Function to handle the event when all keys are released.
 */
export function handleKeyUp(event) {
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

/**
 * Handles the event when the left arrow key is released.
 * 
 * This function performs the following actions:
 * - Sets the `LEFT` property of the `keyboard` object in the `world` to `false`.
 * - Calls `checkSwimmingForStopSound` to check if the swimming sound should be stopped.
 * - Clears the interval for `isSwimLeft`.
 * - If mobile buttons are available and the shark is not currently in a hurt animation:
 *   - Stops the "snore" sound.
 *   - If the shark is not currently performing a fin slap, resets the shark's state.
 */
export function keyArrowLeftUp() {
    this.world.keyboard.LEFT = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimLeft);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) this.resetSharkyState();
    }
  }

/**
 * Handles the event when the right arrow key is released.
 * 
 * This function performs the following actions:
 * - Sets the `RIGHT` property of the `keyboard` object in the `world` to `false`.
 * - Calls `checkSwimmingForStopSound` to determine if the swimming sound should stop.
 * - Clears the interval for `isSwimRight`.
 * - If mobile buttons are available and the shark is not currently in a hurt animation:
 *   - Stops the "snore" sound.
 *   - If the shark is not currently performing a fin slap, resets the shark's state.
 */
export function keyArrowRightUp() {
    this.world.keyboard.RIGHT = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimRight);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) this.resetSharkyState();
    }
  }

/**
 * Handles the event when the "Arrow Up" key is released.
 * 
 * This function performs the following actions:
 * - Sets the `UP` property of the `keyboard` object in the `world` to `false`.
 * - Calls `checkSwimmingForStopSound` to check if the swimming sound should be stopped.
 * - Clears the interval for `isSwimUp`.
 * - If mobile buttons are available and the shark is not currently in a hurt animation:
 *   - Stops the "snore" sound.
 *   - If the shark is not currently performing a fin slap, resets the shark's state.
 */
export function keyArrowUpUp() {
    this.world.keyboard.UP = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimUp);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) this.resetSharkyState();
    }
  }

/**
 * Handles the event when the down arrow key is released.
 * 
 * This function performs the following actions:
 * - Sets the `DOWN` property of the `keyboard` object in the `world` to `false`.
 * - Calls the `checkSwimmingForStopSound` method.
 * - Clears the interval set for `isSwimDown`.
 * - If mobile buttons are available and the shark is not currently hurt:
 *   - Stops the "snore" sound.
 *   - If the shark is not currently performing a fin slap, resets the shark's state.
 */
export function keyArrowDownUp() {
  this.world.keyboard.DOWN = false;
  this.checkSwimmingForStopSound();
  clearInterval(this.isSwimDown);
  if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
    stopSound("snore");
    if (!this.isCurrentlyFinSlap) this.resetSharkyState();
  }
}

/**
 * Handles the key up event for the space key.
 * Sets the SPACE property of the keyboard object in the world to false.
 *
 * @function keySpaceUp
 */
export function keySpaceUp() {
  this.world.keyboard.SPACE = false;
}

/**
 * Handles the 'D' key release event by setting the corresponding
 * keyboard property to false in the world object.
 *
 * @function keyDUp
 */
export function keyDUp() {
  this.world.keyboard.DKey = false;
}

/**
 * Handles the state of all keys being released.
 * 
 * If the shark is currently in an attack animation, it sets a timeout to reset the attack animation state after 600 milliseconds.
 * If the shark is not in any special animation state (hurt, attack, bubble attack, or fin slap), it resets the shark's state immediately.
 * 
 * @function allKeysUp
 */
export function allKeysUp() {
  if (this.isCurrentlyAttackAnimation) {
    setTimeout(() => {
      if (this.isCurrentlyAttackAnimation) this.isCurrentlyAttackAnimation = false;
      this.resetSharkyState();
    }, 600);
  }
  if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyAttackAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.resetSharkyState();
}