/**
 * @module "drawable-object.class.js"
 */

import { imgCachesObject, areImgCachesReady } from "../script.js";

/**
 * Represents a drawable object with properties for image, position, size, and image caching.
 */
export class DrawableObject {
  img;
  x = 100;
  y = 100;
  width = 100;
  height = 100;
  imageCache = {};

  /**
   * Loads an image from the specified path and assigns it to the `img` property.
   * 
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Asynchronously loads images from the provided array of paths and caches them.
   * 
   * @param {string[]} pathArray - An array of image paths to be loaded and cached.
   * @returns {Promise<void>} A promise that resolves when all images are loaded and cached.
   */
  async getImages(pathArray) {
    pathArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the image of the object onto the provided canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the image will be drawn.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    // if (this.constructor.name == "Sharky") this.drawSharkyFrame(ctx);
    // if (this.constructor.name == "PufferFishGreen") this.drawPufferGreenFrame(ctx);
    // if (this.constructor.name == "PufferFishOrange") this.drawPufferOrangeFrame(ctx);
    // if (this.constructor.name == "PufferFishRed") this.drawPufferRedFrame(ctx);
    // if (this.constructor.name == "JellyFishGreenSD") this.drawJellyGreen(ctx);
    // if (this.constructor.name == "JellyFishPinkSD") this.drawJellyPink(ctx);
    // if (this.constructor.name == "JellyFishLilaRD") this.drawJellyPink(ctx);
    // if (this.constructor.name == "JellyFishYellowRD") this.drawJellyYellow(ctx);
    // if (this.constructor.name == "EndBoss") this.drawEndbossFrame(ctx);
  }

  /**
   * Changes the cache status of the specified class to false.
   *
   * @param {string} className - The name of the class whose cache status is to be changed.
   */
  changeCacheStatusToFalse(className) {
    imgCachesObject[className] = false;
  }

  /**
   * Changes the cache status of the specified class to true.
   * 
   * @param {string} className - The name of the class whose cache status is to be changed.
   */
  changeCachStatusToTrue(className) {
    imgCachesObject[className] = true;
  }

  /**
   * Asynchronously loads a cache of images.
   *
   * @param {Array} arr - An array of image URLs to be loaded.
   * @param {string} className - The class name associated with the cache.
   * @returns {Promise<void>} A promise that resolves when the images are loaded.
   */
  async loadImageCache(arr, className) {
    this.changeCacheStatusToFalse(className);
    await this.getImages(arr);
    this.changeCachStatusToTrue(className);
  }

  /**
   * Periodically checks if the image caches are ready and sets the 
   * `isImageCacheLoaded` property to true once they are. The check 
   * is performed every 100 milliseconds until the caches are ready.
   * 
   * @function checkImagesCacheLoaded
   * @memberof DrawableObject
   */
  checkImagesCacheLoaded() {
    let checkInterval = setInterval(() => {
      if (areImgCachesReady) {
        this.isImageCacheLoaded = true;
        clearInterval(checkInterval);
      }
    }, 100);
  }
}
