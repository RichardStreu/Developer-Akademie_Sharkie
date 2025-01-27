/**
 * @module "jellyFishYellowRD.class.js"
 */

import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesObject } from "../script.js";

export class JellyFishYellowRD extends JellyFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];
  imagesDead = [
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];

  currentAnimation = "swim";

  currentAnimationIntervall;

  currentMovement;
  isEnemyDead = false;

  /**
   * Creates an instance of the JellyFishYellowRD class.
   * 
   * @constructor
   * @param {number} index - The index of the jellyfish enemy.
   * 
   * @property {number} enemieIndex - The index of the jellyfish enemy.
   * @property {number} width - The width of the jellyfish enemy, scaled by moveObjRatio.
   * @property {number} height - The height of the jellyfish enemy, scaled by moveObjRatio.
   * @property {boolean} isImageCacheLoaded - Indicates whether the image cache is loaded.
   * @property {number} firstInterval - The interval ID for checking if the image cache is loaded.
   * 
   * @method loadImage - Loads the image for the jellyfish enemy.
   * @method loadAllImagesCacheJellyFish - Loads all images for the jellyfish enemy into the cache.
   * @method checkImagesCacheLoaded - Checks if all images are loaded into the cache.
   * @method doCurrentAnimationAndMovement - Executes the current animation and movement for the jellyfish enemy.
   */
  constructor(index) {
    super(index).loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");
    this.enemieIndex = index;
    this.width = 60 * moveObjRatio;
    this.height = 90 * moveObjRatio;
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
   * Handles the current animation and movement of the jellyfish based on its state.
   * 
   * - If the current animation is "swim", it clears any existing movement and animation intervals,
   *   then initiates the up and down movement and image animation for swimming.
   * - If the current animation is "dead", no action is taken.
   * - If the current animation is "stop", it clears any existing movement and animation intervals.
   */
  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
      this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
      this.doImageAnimation(this.imagesSwim, this.img, 250);
    }
    if (this.currentAnimation == "dead") {
    }
    if (this.currentAnimation == "stop") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
    }
  }

  /**
   * Handles the death of the jellyfish.
   * 
   * This method clears the current movement and animation intervals,
   * and then initiates the death image animation.
   * 
   * @method jellyDead
   */
  jellyDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.doImageAnimation(this.imagesDead, this.img, 250);
  }

  /**
   * Handles the death of the enemy.
   * 
   * This method performs the following actions:
   * - Clears the current movement and animation intervals.
   * - Sets the enemy's dead status to true.
   * - Initiates the jellyDead and floatToSurface methods.
   * - Starts an interval to check if the enemy has floated above a certain threshold (y < -1500),
   *   and if so, clears the movement and animation intervals again.
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
