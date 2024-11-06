import { MoveableObject } from "./moveable-object.class.js";

export class Sharky extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
  }

  attackBubble() {}

  attackFinSlap() {}

  attackPoisonBubble() {}

  sleep() {}

  goHurt() {}

  goDefeated() {}
}
