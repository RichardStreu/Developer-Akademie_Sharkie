import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio } from "../script.js";

export class Sharky extends MoveableObject {
  constructor() {
    super().loadImage("../../assets/img/1.Sharkie/1.IDLE/1.png");
    // this.img;
    this.x = 0;
    this.y = 200;
    this.width = 180 * moveObjRatio;
    this.height = 221 * moveObjRatio;
  }


  
}
