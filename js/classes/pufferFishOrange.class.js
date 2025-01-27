/**
 * @module "pufferFishOrange.class.js"
 */

import { PufferFish } from "./pufferFish.class.js";
import { moveObjRatio } from "../script.js";

export class PufferFishOrange extends PufferFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
  ];

  imagesTransition = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
  ];

  imagesBubbleSwim = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",
  ];

  imagesDie = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png",
  ];

  currentAnimation = "swim";

  currentAnimationIntervall;

  currentMovement;
  isEnemyDead = false;

  /**
   * Creates an instance of the PufferFishOrange class.
   * 
   * @constructor
   * @param {number} index - The index of the enemy.
   * 
   * @extends SomeSuperClass
   * 
   * @property {number} enemieIndex - The index of the enemy.
   * @property {number} width - The width of the puffer fish, adjusted by moveObjRatio.
   * @property {number} height - The height of the puffer fish, adjusted by moveObjRatio.
   * @property {boolean} isImageCacheLoaded - Indicates if the image cache is loaded.
   * @property {number} firstInterval - The interval ID for checking image cache loading.
   * 
   * @method loadImage - Loads the initial image for the puffer fish.
   * @method loadAllImagesCachePuffer - Loads all images for the puffer fish into cache.
   * @method checkImagesCacheLoaded - Checks if all images are loaded into cache.
   * @method doCurrentAnimationAndMovement - Executes the current animation and movement for the puffer fish.
   */
  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
    this.enemieIndex = index;
    this.width = 86 * moveObjRatio;
    this.height = 69 * moveObjRatio;
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
   * Executes the current animation and movement for the puffer fish based on the value of `this.currentAnimation`.
   * 
   * - If `this.currentAnimation` is "swim", it clears any existing intervals, moves the puffer fish back and forth, and performs the swim image animation.
   * - If `this.currentAnimation` is "transition", it clears any existing intervals and performs the transition image animation.
   * - If `this.currentAnimation` is "bubbleSwim", it clears any existing intervals and performs the bubble swim image animation.
   * - If `this.currentAnimation` is "stop", it clears any existing intervals.
   */
  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") {
      this.clearIntervalsAnimationMove();
      this.forBackMovePufferFish(this.minX, this.maxX, this.forBackSpeed);
      this.doImageAnimation(this.imagesSwim, this.img, 170);
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
