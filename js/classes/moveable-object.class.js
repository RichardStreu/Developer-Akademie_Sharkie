import { imgCachesObject, areImgCachesReady, loadedCachsArray, canvasHeight, youLoose } from "../script.js";

import { DrawableObject } from "./drawable-object.class.js";

export class MoveableObject extends DrawableObject {
  otherDirection = false;
  speedY = 2;
  lifeEnergy;
  isEnoughPoison = false;

  constructor() {
    super();
    this.lifeEnergy = 100;
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

  floatToSurface(item) {
    this.currentMovement = setInterval(() => {
      if (this.y > -200 - this.height) {
        this.y -= this.speedY;
      } else {
        if (item == "Sharky") youLoose();
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
            youLoose();
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
    let hitboxX = this.currentFinSlap === "left" ? this.x - 50 : this.currentFinSlap === "right" ? this.x + 50 : this.x;
    let currentFinSlap = this.currentFinSlap;
    if (obj.constructor.name == "Coin") return this.isCollCoin(obj);
    if (obj.constructor.name == "Poison") return this.isCollPoison(obj);
    if (obj.constructor.name == "PufferFishGreen") return this.isCollPufferGreen(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "PufferFishOrange") return this.isCollPufferOrange(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "PufferFishRed") return this.isCollPufferRed(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "JellyFishGreenSD") return this.isCollJellyGreen(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "JellyFishPinkSD") return this.isCollJellyPink(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "JellyFishLilaRD") return this.isCollJellyLila(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "JellyFishYellowRD") return this.isCollJellyYellow(obj, hitboxX, currentFinSlap);
    if (obj.constructor.name == "EndBoss") return this.isCollEndBoss(obj);
  }

  isCollCoin(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + obj.height) {
      let enemyIndex = this.world.enemies.findIndex((element) => element.index === obj.index);
      this.world.enemies.splice(enemyIndex, 1);
      this.coin += 1;
      this.world.statBars[0].updatePercentageStatBar(9.1);
      return true;
    }
  }

  isCollPoison(obj) {
    if (this.x + 40 + (this.width - 80) > obj.x && this.x + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + obj.height) {
      let enemyIndex = this.world.enemies.findIndex((element) => element.index === obj.index);
      this.world.enemies.splice(enemyIndex, 1);
      this.poison += 1;
      this.world.statBars[2].updatePercentageStatBar(17);
      return true;
    }
  }

  isCollPufferGreen(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y &&
      this.y + 125 < obj.y + (obj.height - 10) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollPufferOrange(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y &&
      this.y + 125 < obj.y + (obj.height - 17) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollPufferRed(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + (obj.width - 10) &&
      this.y + 125 + (this.height - 190) > obj.y + 4 &&
      this.y + 125 < obj.y + 4 + (obj.height - 30) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollJellyGreen(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y + 5 &&
      this.y + 125 < obj.y + 5 + (obj.height - 15) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollJellyPink(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y + 5 &&
      this.y + 125 < obj.y + 5 + (obj.height - 15) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollJellyLila(obj, hitboxX, currentFinSlap) {
    if (hitboxX + 40 + (this.width - 80) > obj.x && hitboxX + 40 < obj.x + obj.width && this.y + 125 + (this.height - 190) > obj.y && this.y + 125 < obj.y + obj.height && obj.isEnemyDead == false) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  isCollJellyYellow(obj, hitboxX, currentFinSlap) {
    if (
      hitboxX + 40 + (this.width - 80) > obj.x &&
      hitboxX + 40 < obj.x + obj.width &&
      this.y + 125 + (this.height - 190) > obj.y + 5 &&
      this.y + 125 < obj.y + 5 + (obj.height - 15) &&
      obj.isEnemyDead == false
    ) {
      if (currentFinSlap == "left") this.hitEnemyToLeft(obj);
      if (currentFinSlap == "right") this.hitEnemyToRight(obj);
      return true;
    }
  }

  hitEnemyToRight(obj) {
    setTimeout(() => {
      let endX = obj.x + 60;
      let speed = 6;
      let factor = 0.85;
      let interval = setInterval(() => {
        if (obj.x < endX) {
          obj.x += speed;
          speed = speed * factor;
        } else {
          clearInterval(interval);
        }
      }, 150);
    }, 300);
  }

  hitEnemyToLeft(obj) {
    setTimeout(() => {
      let endX = obj.x - 60;
      let speed = 6;
      let factor = 0.85;
      let interval = setInterval(() => {
        if (obj.x > endX) {
          obj.x -= speed;
          speed = speed * factor;
        } else {
          clearInterval(interval);
        }
      }, 150);
    }, 300);
  }

  isCollEndBoss(obj) {
    if (
      this.x + 40 + (this.width - 80) > obj.x + 10 &&
      this.x + 40 < obj.x + 10 + (obj.width - 35) &&
      this.y + 125 + (this.height - 190) > obj.y + 180 &&
      this.y + 125 < obj.y + 180 + (obj.height - 250) &&
      obj.isEnemyDead == false
    ) {
      return true;
    }
  }
}
