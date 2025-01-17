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

  imagesDie = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png"
  ];

  currentAnimation = "swim";

  currentAnimationIntervall;

  currentMovement;
  isEnemyDead = false;

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
    if (this.currentAnimation == "stop") {
      this.clearIntervalsAnimationMove();
    }
  }
}
