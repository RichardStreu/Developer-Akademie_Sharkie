import { moveObjRatio } from "../script.js";

export class MoveableObject {
  img;
  x = 100;
  y = 100;
  width = 100;
  height = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving RightNow");
  }
  moveLeft() {
    console.log("Moving Left");
  }

  moveUp() {
    console.log("Moving Up");
  }

  moveDown() {
    console.log("Moving Down");
  }
}
