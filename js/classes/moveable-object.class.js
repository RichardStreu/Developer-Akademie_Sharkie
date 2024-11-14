import { imgCachesObject, areImgCachesReady, loadedCachsArray, canvasHeight } from "../script.js";

export class MoveableObject {
  img;
  x = 100;
  y = 100;
  width = 100;
  height = 100;
  imageCache = {};
  otherDirection = false;
  speedY = 2;
  lifeEnergy;

  constructor() {
    this.lifeEnergy = 100;
  }

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

  drawSharkyFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x + 40, this.y + 125, this.width - 80, this.height - 190);
    ctx.stroke();
  }

  drawPufferGreenFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height - 10);
    ctx.stroke();
  }

  drawPufferOrangeFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height - 17);
    ctx.stroke();
  }

  drawPufferRedFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y + 4, this.width - 10, this.height - 30);
    ctx.stroke();
  }

  drawJellyGreen(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y + 5, this.width, this.height - 15);
    ctx.stroke();
  }

  drawJellyPink(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y + 5, this.width, this.height - 15);
    ctx.stroke();
  }

  drawJellyLila(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  drawJellyYellow(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y + 5, this.width, this.height - 15);
    ctx.stroke();
  }

  drawEndbossFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    ctx.rect(this.x + 10, this.y + 180, this.width - 35, this.height - 250);
    ctx.stroke();
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

  floatToSurface(item) {
    this.currentMovement = setInterval(() => {
      if (this.y > -20 - this.height) {
        this.y -= this.speedY;
      } else {
        if (item == "Sharky") this.gameOver();
        clearInterval(this.currentMovement);
      }
    }, 1000 / 40);
  }

  sinkToGround(item) {
    this.currentMovement = setInterval(() => {
      if (this.y < canvasHeight - this.height - 10) {
        this.y += this.speedY;
      } else {
        if (item == "Sharky") {
          setTimeout(() => {
            this.gameOver();
          }, 1500);
        } 
        clearInterval(this.currentMovement);
      }
    }, 1000 / 40);
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

  isColliding(obj) {
    if (obj.constructor.name == "PufferFishGreen") return this.isCollPufferGreen(obj);
    if (obj.constructor.name == "PufferFishOrange") return this.isCollPufferOrange(obj);
    if (obj.constructor.name == "PufferFishRed") return this.isCollPufferRed(obj);
    if (obj.constructor.name == "JellyFishGreenSD") return this.isCollJellyGreen(obj);
    if (obj.constructor.name == "JellyFishPinkSD") return this.isCollJellyPink(obj);
    if (obj.constructor.name == "JellyFishLilaRD") return this.isCollJellyLila(obj);
    if (obj.constructor.name == "JellyFishYellowRD") return this.isCollJellyYellow(obj);
    if (obj.constructor.name == "EndBoss") return this.isCollEndBoss(obj);
  }

  isCollPufferGreen(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + (obj.height - 10)) {
      return true;
    }
  }

  isCollPufferOrange(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + (obj.height - 17)) {
      return true;
    }
  }

  isCollPufferRed(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + (obj.width - 10) && this.y + 125 + (this.height - 190) > obj.y + 4 && this.y + 125 < obj.y + 4 + (obj.height - 30)) {
      return true;
    }
  }

  isCollJellyGreen(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y + 5 && this.y + 125 < obj.y + 5 + (obj.height - 15)) {
      return true;
    }
  }

  isCollJellyPink(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y + 5 && this.y + 125 < obj.y + 5 + (obj.height - 15)) {
      return true;
    }
  }

  isCollJellyLila(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + obj.height) {
      return true;
    }
  }

  isCollJellyYellow(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y + 5 && this.y + 125 < obj.y + 5 + (obj.height - 15)) {
      return true;
    }
  }

  isCollEndBoss(obj) {
    if (
      this.x + 40 + (this.width - 80) > obj.x + 10 &&
      this.x + 40 < obj.x + 10 + (obj.width - 35) &&
      this.y + 125 + (this.height - 190) > obj.y + 180 &&
      this.y + 125 < obj.y + 180 + (obj.height - 250)
    ) {
      return true;
    }
  }
}
