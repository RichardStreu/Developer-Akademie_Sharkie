import { MoveableObject } from "./moveable-object.class.js";
import { staticObjRatio } from "../script.js";

export class Barrier3 extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/3. Background/Barrier/3.png");
    // this.img;
    this.x = 0;
    this.y = 0;
    this.width = 180 * staticObjRatio;
    this.height = 221 * staticObjRatio;
  }
}