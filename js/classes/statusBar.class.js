/**
 * @module "statusBar.class.js"
 */

import { DrawableObject } from "./drawable-object.class.js";
import { staticObjRatio } from "../script.js";

export class StatusBar extends DrawableObject {
  /**
   * Creates an instance of the StatusBar class.
   * Initializes the height and width properties based on a static object ratio.
   */
  constructor() {
    super();
    this.height = 50 * staticObjRatio;
    this.width = 175 * staticObjRatio;
  }

  /**
   * Asynchronously loads an array of images for the status bar.
   * Utilizes the loadImageCache method to cache the images.
   * 
   * @async
   * @returns {Promise<void>} A promise that resolves when the images are loaded.
   */
  async loadImgArrayStatBar() {
    await this.loadImageCache(this.imgArrayStatusBar, this.constructor.name);
  }

  /**
   * Updates the percentage of the status bar and changes the image accordingly.
   * 
   * @param {number} percent - The percentage to add to the current status bar percentage.
   * @throws {Error} Throws an error if the percentage is not within the range of 0 to 100.
   */
  updatePercentageStatBar(percent) {
    if (this.percentage >= 0 && this.percentage <= 100) {
      this.percentage += percent;
      this.img = this.imageCache[this.imgArrayStatusBar[this.updateStatBarImage()]];
    }
  }

  /**
   * Updates the status bar image based on the current percentage.
   * 
   * @returns {number} The image index corresponding to the current percentage.
   * - 0: if percentage is less than or equal to 0
   * - 1: if percentage is greater than 0 and less than 20
   * - 2: if percentage is between 20 and 39
   * - 3: if percentage is between 40 and 59
   * - 4: if percentage is between 60 and 79
   * - 5: if percentage is 80 or greater
   */
  updateStatBarImage() {
    if (this.percentage <= 0) return 0;
    if (this.percentage > 0 && this.percentage < 20) return 1;
    if (this.percentage >= 20 && this.percentage < 40) return 2;
    if (this.percentage >= 40 && this.percentage < 60) return 3;
    if (this.percentage >= 60 && this.percentage < 80) return 4;
    if (this.percentage >= 80) return 5;
  }
}
