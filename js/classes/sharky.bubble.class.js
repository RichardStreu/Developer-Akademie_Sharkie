import { canvasHeight, canvasWidth } from "../script.js";

import { MoveableObject } from "./moveable-object.class.js";

import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class SharkyBubble extends MoveableObject {

  direction;
  bubbleMoveInterval;
  hasBubbleHit = false;

  constructor(direction) {
    super();
    this.direction = direction;
    if (!this.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    if (this.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    if (direction == "left") {
      this.x = sharkyXPosition + 20;
      this.y = sharkyYPosition + 151;
    } else {
      this.x = sharkyXPosition + 169;
      this.y = sharkyYPosition + 151;
    }
    this.width = 25;
    this.height = 25;
    this.moveBubble();
  }

  moveBubble() {
    this.bubbleMoveInterval = setInterval(() => {
      if (this.direction == "left" && this.x > -this.width && !this.hasBubbleHit) this.x -= 5;
      if (this.direction == "right" && this.x < canvasWidth * 4 && !this.hasBubbleHit) this.x += 5;
    }, 10);
  }
}
