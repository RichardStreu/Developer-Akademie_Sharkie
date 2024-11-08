import { MoveableObject } from "./moveable-object.class.js";
import { enemyStartX, enemyStartDistX, enemyStartY, enemyEndY, areImgCachesReady, loadedCachsArray } from "../script.js";

export class PufferFish extends MoveableObject {
  constructor() {
    super();
    this.x = enemyStartX + Math.random() * enemyStartDistX;
    this.y = enemyStartY + Math.random() * (enemyEndY - this.height);
  }

  async loadAllImagesCachePuffer() {
    await this.loadImageCache(this.imagesSwim, this.constructor.name);
    await this.loadImageCache(this.imagesTransition, this.constructor.name);
    await this.loadImageCache(this.imagesBubbleSwim, this.constructor.name);
  }
}
