import { DrawableObject } from "./drawable-object.class";

export class StatusBar extends DrawableObject {
  constructor() {
    super();
  }

  async loadImgArrayStatBar() {
    await this.loadImageCache(this.imgArrayStatusBar, this.constructor.name);
  }

  updatePercentageStatBar(percent) {
    this.percentage += percent;
    this.img = this.imageCache[imgArrayStatusBar[this.updateStatBarImage()]];
  }

  updateStatBarImage() {
    if (this.percentage < 16.66) return 0;
    if (this.percentage > 16.66 && this.percentage < 33.33) return 1;
    if (this.percentage > 33.33 && this.percentage < 50) return 2;
    if (this.percentage > 50 && this.percentage < 66.66) return 3;
    if (this.percentage > 66.66 && this.percentage < 83.33) return 4;
    if (this.percentage > 83.33) return 5;
  }
}
