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
  }
 
}