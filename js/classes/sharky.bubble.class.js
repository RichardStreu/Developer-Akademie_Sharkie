import { MoveableObject } from "./moveable-object.class";

import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";


export class SharkyBubble extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
  }

  updateBubblePosition() {}
}
