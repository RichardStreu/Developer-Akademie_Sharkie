import { MoveableObject } from "./moveable-object.class.js";

export class Sharky extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
    // this.img;
    this.x = 100;
    this.y = 100;
    this.width = 100;
    this.height = 100;
  }

  attackBubble() {}

  attackFinSlap() {}

  attackPoisonBubble() {}

  sleep() {}

  goHurt() {}

  goDefeated() {}
}
