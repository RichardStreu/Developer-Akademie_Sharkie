export class MoveableObject {
  x = 100;
  y = 100;
  img;

  constructor(x, y, img) {
    if (x) this.x = x;
    if (y) this.y = y;
    if (img) this.img = img;
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
