/**
 * @module "sharky.action.animations.js"
 */

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

/**
 * Triggers the standing animation for the sharky character.
 * Utilizes the `doImageAnimation` method to animate the sharky character
 * using the `imagesStand` array and the current image (`this.img`).
 * The animation duration is set to 180 milliseconds.
 */
export function sharkyStandAnimation() {
  this.doImageAnimation(imagesStand, this.img, 180);
}

/**
 * Triggers the sleep animation for the sharky character.
 * Utilizes the doImageAnimation method to animate the sharky character with the provided sleep images.
 *
 * @function sharkySleepAnimation
 * @this {Object} The context in which the function is called, expected to have a doImageAnimation method.
 */
export function sharkySleepAnimation() {
  this.doImageAnimation(imagesSleep, this.img, 200);
}

/**
 * Triggers the swimming animation for the sharky character.
 * Utilizes the `doImageAnimation` method to animate the sharky character
 * using the provided swimming images.
 *
 * @function sharkySwimAnimation
 * @this {Object} The context in which the function is called, expected to have a `doImageAnimation` method.
 */
export function sharkySwimAnimation() {
  this.doImageAnimation(imagesSwim, this.img, 80);
}

/**
 * Triggers the regular bubble animation for the sharky character.
 * Utilizes the `doImageAnimation` method to animate the sharky character with the provided image sequence.
 *
 * @function sharkyBubbleRegularAnimation
 * @this {Object} The context in which the function is called, expected to have a `doImageAnimation` method and `img` property.
 */
export function sharkyBubbleRegularAnimation() {
  this.doImageAnimation(imagesAttackBubbleRegular, this.img, 75);
}

/**
 * Triggers the poison bubble animation for the sharky character.
 * Utilizes the `doImageAnimation` method to animate the poison bubble attack.
 *
 * @function sharkyBubblePoisonAnimation
 * @this {Object} The context in which the function is called, expected to have `doImageAnimation` method and `img` property.
 */
export function sharkyBubblePoisonAnimation() {
  this.doImageAnimation(imagesAttackBubblePoison, this.img, 75);
}

/**
 * Executes the fin slap animation for the sharky character.
 * Utilizes the `doImageAnimation` method to animate the fin slap.
 *
 * @function sharkyFinSlapAnimation
 * @this {Object} The context in which the function is called, expected to have a `doImageAnimation` method and `img` property.
 */
export function sharkyFinSlapAnimation() {
  this.doImageAnimation(imagesAttackFinSlap, this.img, 100);
}

/**
 * Triggers the regular hurt animation for the sharky character.
 * 
 * This function uses the `doImageAnimation` method to animate the sharky character
 * with the `imagesHurtRegular` image set and a duration of 150 milliseconds.
 * 
 * @function sharkyHurtRegularAnimation
 */
export function sharkyHurtRegularAnimation() {
  this.doImageAnimation(imagesHurtRegular, this.img, 150);
}

/**
 * Triggers the hurt shock animation for the sharky character.
 * Utilizes the `doImageAnimation` method to animate the sharky character
 * with the `imagesHurtShock` image set and a duration of 150 milliseconds.
 *
 * @function sharkyHurtShockAnimation
 */
export function sharkyHurtShockAnimation() {
  this.doImageAnimation(imagesHurtShock, this.img, 150);
}

/**
 * Triggers the regular dead animation for the sharky character.
 *
 * This function uses the `doImageAnimation` method to animate the sharky character
 * with the provided `imagesDeadRegular` array, the current image (`this.img`), and
 * a duration of 130 milliseconds.
 *
 * @returns {void}
 */
export function sharkyDeadRegularAnimation() {
  return this.doImageAnimation(imagesDeadRegular, this.img, 130);
}

/**
 * Triggers the dead shock animation for the sharky character.
 * 
 * This function uses the `doImageAnimation` method to animate the sharky character
 * with the `imagesDeadShock` image set and the current image (`this.img`), 
 * running the animation at a speed of 160 milliseconds per frame.
 * 
 * @returns {void}
 */
export function sharkyDeadShockAnimation() {
  return this.doImageAnimation(imagesDeadShock, this.img, 160);
}
