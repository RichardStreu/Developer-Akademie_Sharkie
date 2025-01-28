/**
 * @module "pufferFishRed.class.js"
 */

import { PufferFish } from "./pufferFish.class.js";
import { moveObjRatio } from "../script.js";

export class PufferFishRed extends PufferFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];

  imagesTransition = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
  ];

  imagesBubbleSwim = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",
  ];

  imagesDie = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png",
  ];

  currentAnimation = "swim";
  currentAnimationIntervall;
  currentMovement;
  isEnemyDead = false;

  /**
   * Creates an instance of the PufferFishRed class.
   * 
   * @constructor
   * @param {number} index - The index of the enemy.
   * @property {number} enemieIndex - The index of the enemy.
   * @property {number} width - The width of the puffer fish, scaled by moveObjRatio.
   * @property {number} height - The height of the puffer fish, scaled by moveObjRatio.
   * @property {boolean} isImageCacheLoaded - Indicates whether the image cache is loaded.
   * @property {number} firstInterval - The interval ID for checking if the image cache is loaded.
   * @method loadImage - Loads the initial image of the puffer fish.
   * @method loadAllImagesCachePuffer - Loads all images of the puffer fish into the cache.
   * @method checkImagesCacheLoaded - Checks if all images are loaded into the cache.
   * @method doCurrentAnimationAndMovement - Executes the current animation and movement of the puffer fish.
   */
  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png");
    this.enemieIndex = index;
    this.width = 120 * moveObjRatio;
    this.height = 96 * moveObjRatio;
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
   * - If the current animation is "swim", it clears any existing intervals, moves the puffer fish
   *   back and forth between minX and maxX at the specified speed, and performs the swim image animation.
   * - If the current animation is "transition", it clears any existing intervals and performs the transition image animation.
   * - If the current animation is "bubbleSwim", it clears any existing intervals and performs the bubble swim image animation.
   * - If the current animation is "stop", it clears any existing intervals.
   */
  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") {
      this.clearIntervalsAnimationMove();
      this.forBackMovePufferFish(this.minX, this.maxX, this.forBackSpeed);
      this.doImageAnimation(this.imagesSwim, this.img, 220);
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
