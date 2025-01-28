/**
 * @module "pufferFishGreen.class.js"
 */

import { PufferFish } from "./pufferFish.class.js";
import { moveObjRatio } from "../script.js";

export class PufferFishGreen extends PufferFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  imagesTransition = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
  ];

  imagesBubbleSwim = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
  ];

  imagesDie = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
  ];

  currentAnimation = "swim";
  currentAnimationIntervall;
  currentMovement;
  isEnemyDead = false;

  /**
   * Creates an instance of the PufferFishGreen class.
   * 
   * @class PufferFishGreen
   * @extends {ParentClass} // Replace with the actual parent class name
   * @param {number} index - The index of the enemy.
   * @property {number} enemieIndex - The index of the enemy.
   * @property {number} width - The width of the puffer fish, adjusted by moveObjRatio.
   * @property {number} height - The height of the puffer fish, adjusted by moveObjRatio.
   * @property {boolean} isImageCacheLoaded - Indicates if the image cache is loaded.
   * @property {number} firstInterval - The interval ID for checking image cache loading.
   * @method loadImage - Loads the initial image of the puffer fish.
   * @method loadAllImagesCachePuffer - Loads all images of the puffer fish into the cache.
   * @method checkImagesCacheLoaded - Checks if all images are loaded into the cache.
   * @method doCurrentAnimationAndMovement - Executes the current animation and movement of the puffer fish.
   */
  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
    this.enemieIndex = index;
    this.width = 56 * moveObjRatio;
    this.height = 45 * moveObjRatio;
    this.loadAllImagesCachePuffer();
    this.checkImagesCacheLoaded();
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.doCurrentAnimationAndMovement();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  /**
   * Handles the current animation and movement of the puffer fish based on its current state.
   * 
   * The method performs different actions depending on the value of `this.currentAnimation`:
   * - "swim": Clears any existing intervals, moves the puffer fish back and forth, and performs the swim animation.
   * - "transition": Clears any existing intervals and performs the transition animation.
   * - "bubbleSwim": Clears any existing intervals and performs the bubble swim animation.
   * - "stop": Clears any existing intervals.
   */
  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") {
      this.clearIntervalsAnimationMove();
      this.forBackMovePufferFish(this.minX, this.maxX, this.forBackSpeed);
      this.doImageAnimation(this.imagesSwim, this.img, 120);
    }
    if (this.currentAnimation == "transition") {
      this.clearIntervalsAnimationMove();
      this.doImageAnimation(this.imagesTransition, this.img, 200);
    }
    if (this.currentAnimation == "bubbleSwim") {
      this.clearIntervalsAnimationMove();
      this.doImageAnimation(this.imagesBubbleSwim, this.img, 200);
    }
    if (this.currentAnimation == "stop") this.clearIntervalsAnimationMove();
  }
}
