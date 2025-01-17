import { canvasHeight, canvasWidth } from "../script.js";
import { MoveableObject } from "./moveable-object.class.js";
import { playSfxSound } from "../sound.js";

export class SharkyBubble extends MoveableObject {
  world;
  direction;
  bubbleMoveInterval;
  hasBubbleHit = false;
  startPositionX;
  isFloatToSurface = false;
  collidingInterval;
  factor = 1;

  constructor(world, direction) {
    super();
    this.direction = direction;
    this.world = world;
    if (!this.world.sharky.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    if (this.world.sharky.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    if (direction == "left") {
      this.x = world.sharky.x + 20;
      this.y = world.sharky.y + 131;
    } else {
      this.x = world.sharky.x + 169;
      this.y = world.sharky.y + 131;
    }
    this.width = 25;
    this.height = 25;
    this.startPositionX = this.x;
    this.moveBubble();
    this.checkCollisions();
    this.checkPosition();
    playSfxSound("blub");
  }

  checkPosition() {
    this.checkPositionInterval = setInterval(() => {
      if (this.y < -40) {
        this.clearBubbleIntervals();
      }
    }, 50);
  }

  clearBubbleIntervals() {
    clearInterval(this.bubbleMoveInterval);
    clearInterval(this.collidingInterval);
    clearInterval(this.checkPositionInterval);
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
    if (this.x <= this.startPositionX - 80 && !this.isFloatToSurface) {
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
    if (this.x >= this.startPositionX + 80 && !this.isFloatToSurface) {
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
    this.collidingInterval = setInterval(() => {
      for (let index = 0; index < this.world.level1.enemies.length; index++) {
        const enemy = this.world.level1.enemies[index];
        if (this.isColliding(enemy)) {
          this.y = -40;
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
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollPufferOrange(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y && this.y < obj.y + (obj.height - 17)) {
      let demageFactor = 35;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollPufferRed(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + (obj.width - 10) && this.y + this.height > obj.y + 4 && this.y < obj.y + 4 + (obj.height - 30)) {
      let demageFactor = 35;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollJellyGreen(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 0;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollJellyPink(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 0;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollJellyLila(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y && this.y < obj.y + obj.height) {
      let demageFactor = 30;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollJellyYellow(obj) {
    if (this.x + this.width > obj.x && this.x < obj.x + obj.width && this.y + this.height > obj.y + 5 && this.y < obj.y + 5 + (obj.height - 15)) {
      let demageFactor = 30;
      this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
      return true;
    }
  }

  isCollEndBoss(obj) {
    if (this.x + this.width > obj.x + 10 && this.x < obj.x + 10 + (obj.width - 35) && this.y + this.height > obj.y + 180 && this.y < obj.y + 180 + (obj.height - 250)) {
      let demageFactor = 10;
      if (this.world.sharky.isEnoughPoison == true) this.bubbleHit(obj, demageFactor);
      clearInterval(this.collidingInterval);
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
