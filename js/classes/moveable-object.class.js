export class MoveableObject {
  x = 100;
  y = 100;
  img;

  constructor(x, y, img) {
    if (x) this.x = x;
    if (y) this.y = y;
    if (img) this.img = img;
  }

  // ergänzung im feature branch
  // hallo welt
  moveRight() {
    // move to right
    console.log("Moving Right");
  }
  // testesttest
  moveLeft() {
    // move to left
    console.log("Moving Left");
  }

  moveUp() {
    // move to up
    console.log("Moving Up");
  }

  moveDown() {
    // move to down
    console.log("Moving Down");
  }
}
