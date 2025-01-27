/**
 * @module "coin.class.js"
 */

import { MoveableObject } from "./moveable-object.class.js";

export class Coin extends MoveableObject {
  imagesCoin = [
    "../../assets/img/4. Marcadores/1. Coins/1.png",
    "../../assets/img/4. Marcadores/1. Coins/2.png",
    "../../assets/img/4. Marcadores/1. Coins/3.png",
    "../../assets/img/4. Marcadores/1. Coins/4.png",
  ];

  /**
   * Creates an instance of Coin.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   * @param {number} index - The index of the coin.
   */
  constructor(x, y, index) {
    super().loadImage("../../assets/img/4. Marcadores/1. Coins/1.png");
    this.loadImageCache(this.imagesCoin, this.constructor.name);
    this.checkImagesCacheLoaded();
    this.height = 25;
    this.width = 25;
    this.x = x;
    this.y = y;
    this.index = index;
    this.coinAnimationAfterCacheLoading();
  }

  /**
   * Starts the coin animation after the image cache is loaded.
   * @private
   */
  coinAnimationAfterCacheLoading() {
    this.firstInterval = setInterval(() => {
      if (this.isImageCacheLoaded) {
        this.doImageAnimation(this.imagesCoin, this.img, 300);
        clearInterval(this.firstInterval);
      }
    }, 100);
  }
}
