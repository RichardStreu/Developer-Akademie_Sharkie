import { MoveableObject } from "./moveable-object.class.js";

import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class SharkyBubble extends MoveableObject {

  isEnoughPoison = false;

  constructor() {
    super();
    if (!this.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    if (this.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    this.x = sharkyXPosition + 170;
    this.y = sharkyYPosition + 100;
    this.width = 25;
    this.height = 25;
  }

  updateBubblePosition() {}
}
