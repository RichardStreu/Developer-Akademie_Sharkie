import { imgCachesObject, areImgCachesReady, loadedCachsArray, canvasHeight } from "../script.js";

export class DrawableObject {
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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this.constructor.name == "Sharky") this.drawSharkyFrame(ctx);
    if (this.constructor.name == "PufferFishGreen") this.drawPufferGreenFrame(ctx);
    if (this.constructor.name == "PufferFishOrange") this.drawPufferOrangeFrame(ctx);
    if (this.constructor.name == "PufferFishRed") this.drawPufferRedFrame(ctx);
    if (this.constructor.name == "JellyFishGreenSD") this.drawJellyGreen(ctx);
    if (this.constructor.name == "JellyFishPinkSD") this.drawJellyPink(ctx);
    if (this.constructor.name == "JellyFishLilaRD") this.drawJellyPink(ctx);
    if (this.constructor.name == "JellyFishYellowRD") this.drawJellyYellow(ctx);
    if (this.constructor.name == "EndBoss") this.drawEndbossFrame(ctx);
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
}
