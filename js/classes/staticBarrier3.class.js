import { MoveableObject } from "./moveable-object.class.js";
import { staticObjRatio } from "../script.js";

export class Barrier3 extends MoveableObject {
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Barrier/3.png");
    this.x = x;
    this.y = y;
    this.width = 180 * staticObjRatio;
    this.height = 221 * staticObjRatio;
  }
}