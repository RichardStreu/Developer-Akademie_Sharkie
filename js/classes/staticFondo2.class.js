import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";
import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class Fondo2 extends MoveableObject {
  sharkyX;
  sharkyY;

  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/4.Fondo 2/L.png");
    // this.img;
    this.x = x;
    this.y = y;
    this.width = canvasWidth * 2;
    this.height = canvasHeight;
    this.sharkyMidPoint = canvasWidth / 2 - sharkyWidth / 2 - 50;
    this.getSharkyPosition(this.x, this.sharkyMidPoint);
  }

  getSharkyPosition(x, sharkyMidPoint) {
    setInterval(() => {
      this.sharkyX = sharkyXPosition;
      this.moveFondo1(this.sharkyX, x, sharkyMidPoint);
    }, 50);
  }

  moveFondo1(sharkyX, x, sharkyMidPoint) {
    if (x < 1 && sharkyX > sharkyMidPoint && sharkyX < canvasWidth * 3.5 - sharkyWidth) {
      this.x = sharkyX * 0.1 - 30;
    } else if (x > 1 && sharkyX > sharkyMidPoint && sharkyX < canvasWidth * 3.5 - sharkyWidth) {
      this.x = sharkyX * 0.1 + x - 30;
    }
  }
}
