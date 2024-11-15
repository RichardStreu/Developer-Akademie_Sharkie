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
    this.updateStatBarImage();
  }

  updateStatBarImage() {
    if (this.percentage < 16.66) this.img.src = this.imgArrayStatusBar[0];
    if (this.percentage > 16.66 && this.percentage < 33.33) this.img.src = this.imgArrayStatusBar[1];
    if (this.percentage > 33.33 && this.percentage < 50) this.img.src = this.imgArrayStatusBar[2];
    if (this.percentage > 50 && this.percentage < 66.66) this.img.src = this.imgArrayStatusBar[3];
    if (this.percentage > 66.66 && this.percentage < 83.33) this.img.src = this.imgArrayStatusBar[4];
    if (this.percentage > 83.33) this.img.src = this.imgArrayStatusBar[5];
  }
 
}