import { DrawableObject } from "./drawable-object.class.js";

import { staticObjRatio } from "../script.js";

export class StatusBar extends DrawableObject {
  constructor() {
    super();
    this.height = 50 * staticObjRatio;
    this.width = 175 * staticObjRatio;
  }

  async loadImgArrayStatBar() {
    await this.loadImageCache(this.imgArrayStatusBar, this.constructor.name);
  }

  updatePercentageStatBar(percent) {
    if (this.percentage >= 0 && this.percentage <= 100) {
      this.percentage += percent;
      this.img = this.imageCache[this.imgArrayStatusBar[this.updateStatBarImage()]];
    }
  }

  updateStatBarImage() {
    if (this.percentage <= 0) return 0;
    if (this.percentage > 0 && this.percentage < 20) return 1;
    if (this.percentage >= 20 && this.percentage < 40) return 2;
    if (this.percentage >= 40 && this.percentage < 60) return 3;
    if (this.percentage >= 60 && this.percentage < 90) return 4;
    if (this.percentage >= 90) return 5;
  }
}
