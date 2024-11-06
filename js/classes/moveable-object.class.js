export class MoveableObject {
  x = 100;
  y = 100;
  img;

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
