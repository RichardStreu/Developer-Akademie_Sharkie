import { PufferFish } from "./pufferFish.class.js";
import { moveObjRatio, enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

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

  currentAnimation = "swim"; // "swim" "transition" "bubbleSwim" "stop"

  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
    this.enemieIndex = index;
    this.width = 86 * moveObjRatio;
    this.height = 69 * moveObjRatio;
    this.loadImageCache(this.imagesSwim, this.constructor.name);
    this.loadImageCache(this.imagesTransition, this.constructor.name);
    this.loadImageCache(this.imagesBubbleSwim, this.constructor.name);
    this.checkImagesCacheLoaded();
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        // this.doCurrentAnimationAndMovement();
        clearInterval(this.firstInterval);
      }
    }, 100);
  }

  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") {
      this.checkImagesForSwimAnimation(this.imagesSwim, this.img, 650);
      // this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
    }
    if (this.currentAnimation == "transition") {
    }
    if (this.currentAnimation == "bubbleSwim") {
    }
    if (this.currentAnimation == "stop") {
    }
  }
}
