export class MoveableObject {
  x = 100;
  y = 100;
  img;

  constructor(x, y, img) {
    if (x) this.x = x;
    if (y) this.y = y;
    if (img) this.img = img;
  }

    // hallo welt
  moveRight() {
    console.log("Moving Right");
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
