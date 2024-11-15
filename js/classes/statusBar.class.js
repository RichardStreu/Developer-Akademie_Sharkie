import { DrawableObject } from "./drawable-object.class";

export class StatusBar extends DrawableObject {

  constructor() {
    super();
  }

  async loadImgArrayStatBar() {
    await this.loadImageCache(this.imgArrayStatusBar, this.constructor.name);
  }

  setPercantageStatBar(percent) {
    this.percentage += percent;
  }
 
}