/**
 * @module "jellyFishPinkSD.class.js"
 */

import { JellyFish } from "./jellyFish.class.js";
import { moveObjRatio } from "../script.js";

export class JellyFishPinkSD extends JellyFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];
  imagesDead = [
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png",
    "../../assets/img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png",
  ];

  currentAnimation = "swim"; 
  currentAnimationIntervall;
  currentMovement;
  isEnemyDead = false;

  /**
   * Creates an instance of the JellyFishPinkSD class.
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
   * @method checkImagesCacheLoaded - Checks if all images are loaded into the cache.
   * @method doCurrentAnimationAndMovement - Executes the current animation and movement of the jellyfish.
   */
  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png");
    this.enemieIndex = index;
    this.width = 84 * moveObjRatio;
    this.height = 126 * moveObjRatio;
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
   * - If the current animation is "dead", it currently does nothing.
   * - If the current animation is "stop", it clears any existing movement and animation intervals.
   */
  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
      this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
      this.doImageAnimation(this.imagesSwim, this.img, 550);
    }
    if (this.currentAnimation == "dead") {
    }
    if (this.currentAnimation == "stop") {
      clearInterval(this.currentMovement);
      clearInterval(this.currentAnimationIntervall);
    }
  }

  /**
   * Stops the current movement and animation intervals, and starts the dead image animation.
   * 
   * This method clears the intervals for the current movement and animation, 
   * then initiates an image animation sequence using the dead images.
   */
  jellyDead() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
    this.doImageAnimation(this.imagesDead, this.img, 250);
  }


  /**
   * Handles the death of the enemy jellyfish.
   * 
   * This method performs the following actions:
   * - Clears the current movement and animation intervals.
   * - Sets the enemy's dead status to true.
   * - Initiates the jellyfish death animation.
   * - Starts the process of floating the jellyfish to the surface.
   * - Sets an interval to check the jellyfish's vertical position and clear intervals if it has floated above a certain point.
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
