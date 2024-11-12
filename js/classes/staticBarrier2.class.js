import { MoveableObject } from "./moveable-object.class.js";
import { staticObjRatio } from "../script.js";

export class Barrier2 extends MoveableObject {
  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Barrier/2.png");
    // this.img;
    this.x = x;
    this.y = y;
    this.width = 180 * staticObjRatio;
    this.height = 221 * staticObjRatio;
  }
}