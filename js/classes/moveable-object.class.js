import { imgCachesObject, areImgCachesReady, loadedCachsArray } from "../script.js";

export class MoveableObject {
  img;
  x = 100;
  y = 100;
  width = 100;
  height = 100;
  imageCache = {};
  otherDirection = false;
  speedY = 2;

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this.constructor.name == "Sharky" ||
        this.constructor.name == "PufferFishGreen" ||
        this.constructor.name == "PufferFishOrange" ||
        this.constructor.name == "PufferFishRed" ||
        this.constructor.name == "JellyFishGreenSD" ||
        this.constructor.name == "JellyFishPinkSD" ||
        this.constructor.name == "JellyFishLilaRD" ||
        this.constructor.name == "JellyFishYellowRD" ||
        this.constructor.name == "EndBoss") {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  changeCacheStatusToFalse(className) {
    imgCachesObject[className] = false;
  }

  changeCachStatusToTrue(className) {
    imgCachesObject[className] = true;
  }

  async loadImageCache(arr, className) {
    this.changeCacheStatusToFalse(className);
    await this.getImages(arr);
    this.changeCachStatusToTrue(className);
  }

  checkImagesCacheLoaded() {
    let checkInterval = setInterval(() => {
      if (areImgCachesReady) {
        this.isImageCacheLoaded = true;
        clearInterval(checkInterval);
      }
    }, 100);
  }

  applyGravity() {
    setInterval(() => {
      if (this.y > -100 - this.height) {
        this.y -= this.speedY;
      }
    }, 1000 / 25);
  }

  doImageAnimation(imageArray, imgRef, intervall) {
    let imagesArray = [];
    imageArray.forEach((imgPath) => {
      imagesArray.push(this.imageCache[imgPath]);
    });
    let currentIndex = 0;
    this.currentAnimationIntervall = setInterval(() => {
      this.img = imagesArray[currentIndex];
      currentIndex = (currentIndex + 1) % imagesArray.length;
    }, intervall);
  }
}
