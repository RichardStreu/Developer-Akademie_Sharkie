import { MoveableObject } from "./moveable-object.class.js";
import { enemyStartX, enemyStartDistX, enemyStartY, enemyEndY, areImgCachesReady } from "../script.js";

export class PufferFish extends MoveableObject {
  constructor() {
    super();
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + Math.random() * (enemyEndY - this.height);
  }

  loadAllImagesCachePuffer() {
    this.loadImageCache(this.imagesSwim, this.constructor.name);
    this.loadImageCache(this.imagesTransition, this.constructor.name);
    this.loadImageCache(this.imagesBubbleSwim, this.constructor.name);
  }
}
