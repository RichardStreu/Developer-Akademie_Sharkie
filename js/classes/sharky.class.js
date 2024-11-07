import { MoveableObject } from "./moveable-object.class.js";
import { ratio } from "../script.js"

export class Sharky extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
    // this.img;
    this.x = 50;
    this.y = 200;
    this.width = 180 * ratio;
    this.height = 221 * ratio;
  }

  attackBubble() {}

  attackFinSlap() {}

  attackPoisonBubble() {}

  sleep() {}

  goHurt() {}

  goDefeated() {}
}
