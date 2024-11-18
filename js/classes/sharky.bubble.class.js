import { canvasHeight, canvasWidth } from "../script.js";

import { MoveableObject } from "./moveable-object.class.js";

import { sharkyXPosition, sharkyYPosition, sharkyWidth, sharkyHeight } from "./sharky.class.js";

export class SharkyBubble extends MoveableObject {

  direction;
  bubbleMoveInterval;
  hasBubbleHit = false;

  constructor(direction) {
    super();
    this.direction = direction;
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
  }

  moveBubble() {
    this.bubbleMoveInterval = setInterval(() => {
      if (this.direction == "left" && this.x > -this.width && !this.hasBubbleHit) this.x -= 5;
      if (this.direction == "right" && this.x < canvasWidth * 4 && !this.hasBubbleHit) this.x += 5;
    }, 10);
  }

  checkCollisions() {
    setInterval(() => {
      for (let index = 0; index < this.level1.enemies.length; index++) {
        const enemy = this.level1.enemies[index];
        if (this.sharky.isColliding(enemy)) {
          this.sharky.hurtSharky(enemy.constructor.name);
          if (!this.sharky.isCurrentlyHurt) this.sharky.isCurrentlyHurt = true;
          break;
        } else {
          this.sharky.isCurrentlyHurt = false;
        }
      }
    }, 100);
  }

}
