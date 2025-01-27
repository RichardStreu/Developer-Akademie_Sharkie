/**
 * @module "jellyFishLilaRD.class.js"
 */

import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio, imgCachesObject } from "../script.js";

export class JellyFishLilaRD extends JellyFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];
  imagesDead = [
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  currentAnimation = "swim"; 

  currentAnimationIntervall;

  currentMovement;

  isEnemyDead = false;

  /**
   * Creates an instance of the JellyFishLilaRD class.
   * 
   * @param {number} index - The index of the enemy.
   * 
   * @class JellyFishLilaRD
   * @extends SomeSuperClass
   * 
   * @property {number} enemieIndex - The index of the enemy.
   * @property {number} width - The width of the jellyfish, adjusted by moveObjRatio.
   * @property {number} height - The height of the jellyfish, adjusted by moveObjRatio.
   * @property {boolean} isImageCacheLoaded - Indicates whether the image cache is loaded.
   * @property {number} firstInterval - The interval ID for checking image cache loading.
   * 
   * @method loadImage - Loads the image for the jellyfish.
   * @method loadAllImagesCacheJellyFish - Loads all images for the jellyfish and caches them.
   * @method checkImagesCacheLoaded - Checks if the images are loaded in the cache.
   * @method doCurrentAnimationAndMovement - Performs the current animation and movement of the jellyfish.
   */
  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
    this.enemieIndex = index;
    this.width = 66 * moveObjRatio;
    this.height = 99 * moveObjRatio;
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
      this.doImageAnimation(this.imagesSwim, this.img, 350);
    }
    if (this.currentAnimation == "dead") {
    }
    if (this.currentAnimation == "stop") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
    }
  }

  /**
   * Handles the death of the jellyfish by clearing movement and animation intervals,
   * and starting the death image animation.
   */
  jellyDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.doImageAnimation(this.imagesDead, this.img, 250);
  }


  /**
   * Handles the death of the enemy.
   * 
   * This function performs the following actions:
   * - Clears the current movement and animation intervals.
   * - Sets the enemy's dead status to true.
   * - Calls the `jellyDead` method.
   * - Initiates the floating to surface process.
   * - Sets an interval to check if the enemy has floated above a certain point,
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
