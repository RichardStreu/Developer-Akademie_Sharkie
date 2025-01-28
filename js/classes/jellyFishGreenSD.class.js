/**
 * @module "jellyFishGreenSD.class.js"
 */

import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio } from "../script.js";

export class JellyFishGreenSD extends JellyFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  imagesDead = [
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];

  currentAnimation = "swim"; 
  currentAnimationIntervall;
  currentMovement;
  isEnemyDead = false;

  /**
   * Creates an instance of the JellyFishGreenSD class.
   * 
   * @constructor
   * @param {number} index - The index of the enemy.
   * @property {number} enemieIndex - The index of the enemy.
   * @property {number} width - The width of the jellyfish, scaled by moveObjRatio.
   * @property {number} height - The height of the jellyfish, scaled by moveObjRatio.
   * @property {boolean} isImageCacheLoaded - Indicates if the image cache is loaded.
   * @property {number} firstInterval - The interval ID for checking image cache loading.
   * @method loadImage - Loads the image for the jellyfish.
   * @method loadAllImagesCacheJellyFish - Loads all images for the jellyfish into the cache.
   * @method checkImagesCacheLoaded - Checks if the images are loaded into the cache.
   * @method doCurrentAnimationAndMovement - Executes the current animation and movement of the jellyfish.
   */
  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png");
    this.enemieIndex = index;
    this.width = 90 * moveObjRatio;
    this.height = 135 * moveObjRatio;
    this.loadAllImagesCacheJellyFish();
    this.checkImagesCacheLoaded();
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.doCurrentAnimationAndMovement();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  /**
   * Executes the current animation and movement based on the value of `this.currentAnimation`.
   * 
   * Animations:
   * - "swim": Calls the `jellySwim` method.
   * - "dead": Calls the `jellyDead` method.
   * - "stop": Calls the `jellyStop` method.
   */
  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") this.jellySwim();
    if (this.currentAnimation == "dead") this.jellyDead();
    if (this.currentAnimation == "stop") this.jellyStop();
  }

  /**
   * Controls the swimming behavior of the jellyfish.
   * 
   * This method stops any current movement and animation intervals,
   * then initiates the up and down movement of the jellyfish and starts
   * the swimming image animation.
   * 
   * @method jellySwim
   */
  jellySwim() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
    this.doImageAnimation(this.imagesSwim, this.img, 650);
  }

  /**
   * Stops the current movement and animation intervals of the jellyfish,
   * and initiates the dead image animation sequence.
   */
  jellyDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.doImageAnimation(this.imagesDead, this.img, 250);
  }

  /**
   * Stops the jellyfish movement and animation.
   * Clears the intervals for the current movement and animation.
   */
  jellyStop() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  /**
   * Handles the death of the enemy.
   * - Stops the current movement and animation intervals.
   * - Sets the enemy's dead status to true.
   * - Initiates the jellyfish death sequence and floating to the surface.
   * - Periodically checks if the enemy has floated beyond a certain point and stops intervals if so.
   */
  enemyIsDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.isEnemyDead = true;
    this.jellyDead();
    this.floatToSurface();
    setInterval(() => {
      if (this.y < -1500) {
        clearInterval(this.currentMovement);
        clearInterval(this.currentAnimationIntervall);
      }
    }, 200);
  }

}
