import { canvasHeight, canvasWidth } from "../script.js";

import { MoveableObject } from "./moveable-object.class.js";

import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class SharkyBubble extends MoveableObject {

  world;
  direction;
  bubbleMoveInterval;
  hasBubbleHit = false;

  constructor(world, direction) {
    super();
    this.direction = direction;
    this.world = world;
    if (!this.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    if (this.isEnoughPoison) this.loadImage("../../assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    if (direction == "left") {
      this.x = sharkyXPosition + 20;
      this.y = sharkyYPosition + 151;
    } else {
      this.x = sharkyXPosition + 169;
      this.y = sharkyYPosition + 151;
    }
    this.width = 25;
    this.height = 25;
    this.moveBubble();
    this.checkCollisions();
  }

  moveBubble() {
    this.bubbleMoveInterval = setInterval(() => {
      if (this.direction == "left" && this.x > -this.width && !this.hasBubbleHit) this.x -= 5;
      if (this.direction == "right" && this.x < canvasWidth * 4 && !this.hasBubbleHit) this.x += 5;
    }, 10);
  }

  checkCollisions() {
    setInterval(() => {
      for (let index = 0; index < this.world.level1.enemies.length; index++) {
        const enemy = this.world.level1.enemies[index];
        
        if (this.isColliding(enemy)) {
          console.log("hit enemy" + enemy);
          
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
