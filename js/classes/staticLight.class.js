import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";
import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class Light extends MoveableObject {
  sharkyX;
  sharkyY;

  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/1. Light/1.png");
    this.x = x;
    this.y = y;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.sharkyMidPoint = canvasWidth / 2 - sharkyWidth / 2 - 50;
    this.getSharkyPosition(x, this.sharkyMidPoint);
  }

  getSharkyPosition(x, sharkyMidPoint) {
    setInterval(() => {
      this.sharkyX = sharkyXPosition;
      this.sharkyY = sharkyYPosition;
      this.moveLightLeft(this.sharkyX, x, sharkyMidPoint);
    }, 50);
  }

  moveLightLeft(sharkyX, x, sharkyMidPoint) {
    const interpolation = (start, end, amount) => (1 - amount) * start + amount * end;
    const smoothFactor = 0.1;

    if (x < 1 && sharkyX > sharkyMidPoint && sharkyX > 0 && sharkyX < canvasWidth * 3.5 - sharkyWidth) {
      this.x = interpolation(this.x, sharkyX - sharkyMidPoint, smoothFactor);
    } else if (x > 1 && sharkyX <= 0) {
      this.x = interpolation(this.x, 0, smoothFactor);
    }
  }
}
