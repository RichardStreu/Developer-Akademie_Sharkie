import { canvasHeight, canvasWidth } from "../script.js";

import { MoveableObject } from "./moveable-object.class.js";

import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class SharkyBubble extends MoveableObject {
  world;
  direction;
  bubbleMoveInterval;
  hasBubbleHit = false;
  startPositionX;
  isFloatToSurface = false;
  factor = 1;

  constructor(world, direction) {
    super();
    this.direction = direction;
    this.world = world;
    if (!this.world.sharky.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    if (this.world.sharky.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    if (direction == "left") {
      this.x = sharkyXPosition + 20;
      this.y = sharkyYPosition + 151;
    } else {
      this.x = sharkyXPosition + 169;
      this.y = sharkyYPosition + 151;
    }
    this.width = 25;
    this.height = 25;
    this.startPositionX = this.x;
    this.moveBubble();
    this.checkCollisions();
  }

  moveBubble() {
    this.bubbleMoveInterval = setInterval(() => {
      if (this.direction == "left" && this.x > -this.width && !this.hasBubbleHit) {
        this.moveBubbleTopLeft();
      }
      if (this.direction == "right" && this.x < canvasWidth * 4 && !this.hasBubbleHit) {
        this.moveBubbleToRight();
      }
    }, 10);
  }

  moveBubbleTopLeft() {
    if (this.x <= this.startPositionX - 100 && !this.isFloatToSurface) {
      this.floatToSurface();
      this.isFloatToSurface = true;
    }
    if (!this.isFloatToSurface) {
      this.x -= 5;
    } else {
      this.x -= 5 * this.factor;
      this.factor = this.factor * 0.95;
    }
  }

  moveBubbleToRight() {
    if (this.x >= this.startPositionX + 100 && !this.isFloatToSurface) {
      this.floatToSurface();
      this.isFloatToSurface = true;
    }
    if (!this.isFloatToSurface) {
      this.x += 5;
    } else {
      this.x += 5 * this.factor;
      this.factor = this.factor * 0.95;
    }
  }

  checkCollisions() {
    setInterval(() => {
      for (let index = 0; index < this.world.level1.enemies.length; index++) {
        const enemy = this.world.level1.enemies[index];
        if (this.isColliding(enemy)) {
          this.y = 2000;
          break;
        } else {
        }
      }
    }, 100);
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
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y && this.y < obj.y + (obj.height - 10)) {
      let demageFactor = 35;
      this.bubbleHit(obj, demageFactor);
      return true;
    }
  }

  isCollPufferOrange(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y && this.y < obj.y + (obj.height - 17)) {
      let demageFactor = 35;
      this.bubbleHit(obj, demageFactor);
      return true;
    }
  }

  isCollPufferRed(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + (obj.width - 10) && this.y + this.height > obj.y + 4 && this.y < obj.y + 4 + (obj.height - 30)) {
      let demageFactor = 35;
      this.bubbleHit(obj, demageFactor);
      return true;
    }
  }

  isCollJellyGreen(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 30;
      this.bubbleHit(obj, demageFactor);
      return true;
    }
  }

  isCollJellyPink(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 30;
      this.bubbleHit(obj, demageFactor);
      return true;
    }
  }

  isCollJellyLila(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y && this.y < obj.y + obj.height) {
      let demageFactor = 30;
      this.bubbleHit(obj, demageFactor);
      return true;
    }
  }

  isCollJellyYellow(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 30;
      this.bubbleHit(obj, demageFactor);
      return true;
    }
  }

  isCollEndBoss(obj) {
    if (this.x + this.width > obj.x + 10 && this.x < obj.x + 10 + (obj.width - 35) && this.y + this.height > obj.y + 180 && this.y < obj.y + 180 + (obj.height - 250)) {
      let demageFactor = 10;
      if (this.world.sharky.isEnoughPoison == true) this.bubbleHit(obj, demageFactor);
      return true;
    }
  }

  bubbleHit(obj, demageFactor) {
    this.y = canvasHeight + 2000;
    obj.lifeEnergy -= demageFactor;
    if (obj.lifeEnergy <= demageFactor) {
      obj.enemyIsDead();
    }
  }
}
