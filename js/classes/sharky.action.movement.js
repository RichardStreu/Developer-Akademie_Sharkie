/**
 * @module "sharky.action.movement.js"
 */

import { canvasHeight, canvasWidth } from "../script.js";
import { SharkyBubble } from "./sharky.bubble.class.js";
import { playSfxSound, playSwimSound } from "../sound.js";

/**
 * Puts Sharky to sleep if there is no movement for a certain period.
 * 
 * This function sets an interval to check if Sharky has been unmoved for more than 5 seconds.
 * If so, it clears the current movement intervals, triggers the sleep animation, and plays a snoring sound.
 * 
 * @function letSharkySleep
 * @memberof Sharky
 * @example
 * letSharkySleep();
 */
export function letSharkySleep() {
  let timeOfUnmoved = 0;
  this.currentMovement = setInterval(() => {
    timeOfUnmoved++;
    if (
      timeOfUnmoved > 5 &&
      document.getElementById("startScreen").classList.contains("d_none") &&
      document.getElementById("winScreen").classList.contains("d_none") &&
      document.getElementById("looseScreen").classList.contains("d_none")
    ) {
      this.clearIntervalsAnimationMove();
      this.sharkySleepAnimation();
      playSfxSound("snore", 0, true);
    }
  }, 1000);
}

/**
 * Moves the Sharky character to the left.
 * 
 * This function checks if the left arrow key is pressed and initiates the movement
 * of the Sharky character to the left. It also handles the animation and camera
 * movement accordingly.
 * 
 * @function moveSharkyLeft
 * @memberof Sharky
 * @instance
 * @example
 * // Call this function to move Sharky to the left
 * moveSharkyLeft();
 * 
 * @description
 * - Plays the swimming sound.
 * - Clears any ongoing animation intervals if Sharky is not hurt, attacking with bubbles, or slapping with fins.
 * - Sets the left arrow key state to true.
 * - Sets the direction to left.
 * - Starts the swimming animation if Sharky is not hurt, attacking with bubbles, or slapping with fins.
 * - Moves Sharky to the left at a constant interval if Sharky is within the canvas bounds and has life energy.
 * - Adjusts the camera position based on Sharky's position.
 */
export function moveSharkyLeft() {
  if (!this.world.keyboard.LEFT) {
    playSwimSound();
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.clearIntervalsAnimationMove();
    this.world.keyboard.LEFT = true;
    this.otherDirection = true;
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.sharkySwimAnimation();
    this.isSwimLeft = setInterval(() => {
      if (this.x > -30 && this.lifeEnergy > 0) {
        this.x -= 4;
        const sharkyMidPoint = canvasWidth / 2 - this.width / 2 - 50;
        if (this.x > sharkyMidPoint && this.x > 0 && this.x < canvasWidth * 3.5 - this.width) {
          this.world.camera_x = sharkyMidPoint - this.x;
        } else if (this.x <= 0) this.world.camera_x = 0;
      }
    }, 10);
  }
}

/**
 * Moves the sharky character to the right.
 * 
 * This function checks if the right arrow key is pressed and if certain animations are not currently playing.
 * If the conditions are met, it plays the swim sound, sets the right arrow key as pressed, and starts the sharky swim animation.
 * It then moves the sharky character to the right at a set interval, updating the camera position if necessary.
 * 
 * @function moveSharkyRight
 * @memberof Sharky
 * @instance
 */
export function moveSharkyRight() {
  if (!this.world.keyboard.RIGHT) {
    playSwimSound();
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.clearIntervalsAnimationMove();
    this.world.keyboard.RIGHT = true;
    this.otherDirection = false;
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.sharkySwimAnimation();
    this.isSwimRight = setInterval(() => {
      if (this.x < canvasWidth * 4 - this.width && this.lifeEnergy > 0) {
        this.x += 4;
        let sharkyMidPoint = canvasWidth / 2 - this.width / 2 - 50;
        if (this.x >= sharkyMidPoint && this.x < canvasWidth * 3.5 - this.width) this.world.camera_x = sharkyMidPoint - this.x;
      }
    }, 10);
  }
}

/**
 * Moves the Sharky character upwards if the UP key is pressed.
 * Plays the swim sound and initiates the swim animation if Sharky is not currently hurt, attacking with bubbles, or performing a fin slap.
 * Sets an interval to continuously move Sharky upwards while the UP key is pressed, as long as Sharky's y-coordinate is greater than -95 and life energy is greater than 0.
 * Clears any existing movement animation intervals before starting a new one.
 */
export function moveSharkyUp() {
  if (!this.world.keyboard.UP) {
    playSwimSound();
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.clearIntervalsAnimationMove();
    this.world.keyboard.UP = true;
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.sharkySwimAnimation();
    this.isSwimUp = setInterval(() => {
      if (this.y > -95 && this.lifeEnergy > 0) this.y -= 4;
    }, 10);
  }
}

/**
 * Moves the sharky character downwards on the canvas.
 * 
 * This function checks if the DOWN key is pressed on the keyboard and if certain animations are not currently playing.
 * If the conditions are met, it plays the swim sound, sets the DOWN key state to true, and starts the sharky swim animation.
 * It then sets an interval to move the sharky character downwards by 4 units every 10 milliseconds, as long as the character's
 * y-coordinate is less than the canvas height minus 220 and the life energy is greater than 0.
 * 
 * @function moveSharkyDown
 */
export function moveSharkyDown() {
  if (!this.world.keyboard.DOWN) {
    playSwimSound();
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.clearIntervalsAnimationMove();
    this.world.keyboard.DOWN = true;
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.sharkySwimAnimation();
    this.isSwimDown = setInterval(() => {
      if (this.y < canvasHeight - 220 && this.lifeEnergy > 0) this.y += 4;
    }, 10);
  }
}

/**
 * Initiates the sharky's attack sequence with a bubble.
 * If the sharky is currently performing a bubble attack or hurt animation, the function exits early.
 * Sets the sharky to bubble attack mode, clears any movement animation intervals, and stops the snore sound.
 * Depending on the poison status, it triggers either the regular or poison bubble animation.
 * After a delay, it shoots the bubble, plays the bubble sound effect, clears movement animation intervals,
 * resets the bubble attack mode, and returns to the standing animation.
 */
export function sharkyAttackSpace() {
  if (this.isCurrentlyBubbleAttack || this.isCurrentlyHurtAnimation) return;
  this.isCurrentlyBubbleAttack = true;
  this.clearIntervalsAnimationMove();
  stopSound("snore");
  if (!this.isEnoughPoison) this.sharkyBubbleRegularAnimation();
  if (this.isEnoughPoison) this.sharkyBubblePoisonAnimation();
  setTimeout(() => {
    this.shootBubble();
    playSfxSound("blub");
    this.clearIntervalsAnimationMove();
    this.isCurrentlyBubbleAttack = false;
    this.sharkyStandAnimation();
  }, 600);
}

/**
 * Shoots a bubble in the direction the shark is facing.
 * If the shark is facing the other direction, it shoots a bubble to the left.
 * Otherwise, it shoots a bubble to the right.
 *
 * @function shootBubble
 */
export function shootBubble() {
  if (this.otherDirection) this.world.bubbles.push(new SharkyBubble(this.world, "left"));
  if (!this.otherDirection) this.world.bubbles.push(new SharkyBubble(this.world, "right"));
}

/**
 * Handles the sharky's attack action when the 'D' key is pressed.
 * 
 * This function checks if the sharky is currently performing a fin slap or hurt animation.
 * If not, it clears any existing movement animation intervals, stops the snoring sound,
 * initiates the fin slap action, and sets the `isCurrentlyFinSlap` flag to true.
 * 
 * After 600 milliseconds, it clears the movement animation intervals again,
 * resets the `currentFinSlap` to "none", sets the `isCurrentlyFinSlap` flag to false,
 * and triggers the sharky's standing animation.
 * 
 * @returns {void}
 */
export function sharkyAttackDKey() {
  if (this.isCurrentlyFinSlap || this.isCurrentlyHurtAnimation) return;
  this.clearIntervalsAnimationMove();
  stopSound("snore");
  this.doFinSlap();
  this.isCurrentlyFinSlap = true;
  setTimeout(() => {
    this.clearIntervalsAnimationMove();
    this.currentFinSlap = "none";
    this.isCurrentlyFinSlap = false;
    this.sharkyStandAnimation();
  }, 600);
}

/**
 * Executes the fin slap action for the shark character.
 * Determines the direction of the fin slap based on the `otherDirection` property,
 * sets the `currentFinSlap` property accordingly, triggers the fin slap animation,
 * and plays the slap sound effect.
 *
 * @function doFinSlap
 * @this {Object} The context object, expected to have `otherDirection`, `currentFinSlap`, and `sharkyFinSlapAnimation` properties.
 */
export function doFinSlap() {
  this.otherDirection ? (this.currentFinSlap = "left") : (this.currentFinSlap = "right");
  this.sharkyFinSlapAnimation();
  playSfxSound("slap1", 300);
}
