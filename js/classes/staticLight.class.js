import { MoveableObject } from "./moveable-object.class.js";
import { canvasWidth, canvasHeight } from "../script.js";
import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class Light extends MoveableObject {
  sharkyX;
  sharkyY;

  constructor(x = 0, y = 0) {
    super().loadImage("../../assets/img/3. Background/Layers/1. Light/1.png");
    // this.img;
    this.x = x;
    this.y = y;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.getSharkyPosition();
  }

  getSharkyPosition() {
    setInterval(() => {
      this.sharkyX = sharkyXPosition;
      this.sharkyY = sharkyYPosition;
      this.moveLightLeft();
    }, 50);
  }

  moveLightLeft() {
    const sharkyMidPoint = canvasWidth / 2 - sharkyWidth / 2 - 50;
    if (this.sharkyX > sharkyMidPoint && this.sharkyX > 0) {
      this.x = this.sharkyX - sharkyMidPoint;
    } else if (this.sharkyX <= 0) {
      this.x = 0;
    }
  }
}
