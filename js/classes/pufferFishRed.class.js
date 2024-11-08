import { PufferFish } from "./pufferFish.class.js";
import { moveObjRatio, enemyStartX, enemyStartDistX, enemyStartY, enemyEndY } from "../script.js";

export class PufferFishRed extends PufferFish {
  imagesSwim = [
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Swim/3.swim1.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Swim/3.swim2.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Swim/3.swim3.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Swim/3.swim4.png",
    "../../assets/img/2.Enemy/1.Puffer fish (3 color options)/3.Swim/3.swim5.png",
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

  currentAnimation = "swim"; // "swim" "transition" "bubbleSwim" "stop"

  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png");
    this.enemieIndex = index;
    this.width = 120 * moveObjRatio;
    this.height = 96 * moveObjRatio;
  }

  doCurrentAnimationAndMovement() {
    if (this.currentAnimation == "swim") {
      this.checkImagesForSwimAnimation(this.imagesSwim, this.img, 650);
      this.upDownJellyFish(this.minY, this.maxY, this.upDownSpeed);
    }
    if (this.currentAnimation == "transition") {
    }
    if (this.currentAnimation == "bubbleSwim") {
    }
    if (this.currentAnimation == "stop") {
    }
  }
}
