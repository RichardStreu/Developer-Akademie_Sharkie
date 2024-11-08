import { imgCachesObject, checkImgChachStatus, areImgCachesReady } from "../script.js";

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

  changeCacheStatusToFalse(className) {
    imgCachesObject[`${className}`] = false;
  }

  changeCachStatusToTrue(className) {
    imgCachesObject[`${className}`] = true;
  }

  async loadImageCache(arr, className) {
    this.changeCacheStatusToFalse(className);
    await this.getImages(arr);
    this.changeCachStatusToTrue(className);
    checkImgChachStatus();
  }

  checkImagesCacheLoaded() {
    let checkInterval = setInterval(() => {
      if (areImgCachesReady) {
        this.isImageCacheLoaded = true;
        clearInterval(checkInterval);
      }
    }, 100);
  }

  doImageAnimation(imageArray, imgRef, intervall) {
    let imagesArray = imageArray;
    let currentIndex = 0;
    this.currentAnimationIntervall = setInterval(() => {
      imgRef.src = imagesArray[currentIndex];
      currentIndex = (currentIndex + 1) % imagesArray.length;
    }, intervall);
  }
}
