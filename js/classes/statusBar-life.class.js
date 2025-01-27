/**
 * @module "statusBar-life.class.js"
 */

import { StatusBar } from "./statusBar.class.js";

export class StatusBarLife extends StatusBar {
  imgArrayStatusBar = [
    "../../assets/img/4. Marcadores/green/Life/0_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/20_ copia 4.png",
    "../../assets/img/4. Marcadores/green/Life/40_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/60_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/80_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/100_  copia 2.png",
  ];

  world;
  lifeEnergyInterval;

  /**
   * Creates an instance of the status bar for life.
   * 
   * @constructor
   * @param {number} x - The x-coordinate of the status bar.
   * @param {number} y - The y-coordinate of the status bar.
   */
  constructor(x, y) {
    super();
    this.loadImgArrayStatBar();
    this.checkImagesCacheLoaded();
    this.percentage = 100;
    this.img = this.imageCache["../../assets/img/4. Marcadores/green/Life/100_  copia 2.png"];
    this.x = x;
    this.y = y;
    this.updatePercentageStatBar(0);
    this.checkLifeEnergy();
  }

  /**
   * Clears the interval that updates the life energy.
   * This method stops the periodic execution of the function assigned to `this.lifeEnergyInterval`.
   */
  clearLifeEnergyIntertval() {
    clearInterval(this.lifeEnergyInterval);
  }

  /**
   * Continuously checks the life energy of the sharky character in the world.
   * If the life energy is 100, updates the image to the corresponding green life indicator.
   * The check is performed every 500 milliseconds.
   */
  checkLifeEnergy() {
    this.lifeEnergyInterval = setInterval(() => {
      if (this.world.sharky.lifeEnergy == 100) {
        this.img = this.imageCache["../../assets/img/4. Marcadores/green/Life/100_  copia 2.png"];
      } 
    }, 500);
  }
}
