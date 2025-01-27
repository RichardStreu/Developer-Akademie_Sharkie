/**
 * @module "statusBar-poison.class.js"
 */

import { StatusBar } from "./statusBar.class.js";

export class StatusBarPoison extends StatusBar {
  imgArrayStatusBar = [
    "../../assets/img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "../../assets/img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "../../assets/img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "../../assets/img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "../../assets/img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "../../assets/img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];

  /**
   * Creates an instance of the status bar for poison effect.
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
    this.img = this.imageCache["../../assets/img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png"];
    this.x = x;
    this.y = y;
  }
}
