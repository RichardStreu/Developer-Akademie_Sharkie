import { imgCachesReady, checkImgChachStatus } from "../script.js";

export class MoveableObject {
  img;
  x = 100;
  y = 100;
  width = 100;
  height = 100;
  imageCache = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  async getImages(pathArray) {
    pathArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  changeCachStatus(className) {
    imgCachesReady[`${className}`] = true;
  }

  async loadImageCache(arr, className) {
    await this.getImages(arr);
    this.changeCachStatus(className)
    checkImgChachStatus();
  }

}
