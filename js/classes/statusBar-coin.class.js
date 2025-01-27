/**
 * @module "statusBar-coin.class.js"
 */

import { StatusBar } from "./statusBar.class.js";

export class StatusBarCoin extends StatusBar {
  imgArrayStatusBar = [
    "../../assets/img/4. Marcadores/green/Coin/0_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/20_  copia 2.png",
    "../../assets/img/4. Marcadores/green/Coin/40_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/60_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/80_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/100_ copia 4.png",
  ];

  /**
   * Creates an instance of the status bar for coins.
   * 
   * @constructor
   * @param {number} x - The x-coordinate of the status bar.
   * @param {number} y - The y-coordinate of the status bar.
   */
  constructor(x, y) {
    super();
    this.loadImgArrayStatBar();
    this.checkImagesCacheLoaded();
    this.percentage = 0;
    this.img = this.imageCache["../../assets/img/4. Marcadores/green/Coin/0_  copia 4.png"];
    this.x = x;
    this.y = y;
  }
}
