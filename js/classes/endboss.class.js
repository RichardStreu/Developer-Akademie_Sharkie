import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio } from "../script.js";

export class EndBoss extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/2.Enemy/3 Final Enemy/2.floating/1.png");
    this.x = 300;
    this.y = 100;
    this.width = 320 * moveObjRatio;
    this.height = 365 * moveObjRatio;
  }
}
