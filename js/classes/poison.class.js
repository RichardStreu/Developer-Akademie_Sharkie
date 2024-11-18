import { DrawableObject } from "./drawable-object.class.js";

export class Poison extends DrawableObject {
  imagesPoison = ["../../assets/img/4. Marcadores/Posión/Light - Left.png", "../../assets/img/4. Marcadores/Posión/Light - Right.png"];

  constructor(x, y) {
    super();
    this.loadImage(this.imagesPoison[Math.floor(Math.random() * 2)]);
    this.height = 68;
    this.width = 50;
    this.x = x;
    this.y = y;
  }
}
