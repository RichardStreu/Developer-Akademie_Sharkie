import { Sharky } from "./sharky.class.js";
import { EndBoss } from "./endboss.class.js";
import { Level1 } from "./level1.class.js";
import { StatusBarLife } from "./statusBar-life.class.js";
import { StatusBarCoin } from "./statusBar-coin.class.js";
import { StatusBarPoison } from "./statusBar-poison.class.js";

export class World {
  constructor(canvas, keyboard) {
    this.sharky = new Sharky();
    this.level1 = new Level1();
    this.landscape = this.level1.landscape;
    this.enemies = this.level1.enemies;
    this.statBars = [new StatusBarCoin(10, 0), new StatusBarLife(10, 40), new StatusBarPoison(10, 80)];
    this.bubbles = [];
    this.canvas;
    this.ctx;
    this.camera_x = 0;
    this.checkCollisionsInterval;
    this.isDrawing;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.isDrawing = false;
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.sharky.world = this;
    this.landscape[2].world = this;
    this.landscape[3].world = this;
    this.landscape[4].world = this;
    this.landscape[5].world = this;
    this.level1.enemies.forEach((enemy) => {
      if (enemy instanceof EndBoss) {
        enemy.world = this;
      }
    });
    this.statBars.forEach((statBar) => {
      if (statBar instanceof StatusBarLife) {
        statBar.world = this;
      }
    });
  }

  clearWorld() {
    this.enemies.forEach((enemy) => {
      if (enemy.clearIntervalsAnimationMove) {
        enemy.clearIntervalsAnimationMove();
      }
    });
    this.bubbles = [];
    this.enemies = [];
    this.landscape = [];
    this.statBars = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearCheckCollisionsInterval() {
    clearInterval(this.checkCollisionsInterval);
  }

  checkCollisions() {
    this.checkCollisionsInterval = setInterval(() => {
      for (let index = 0; index < this.level1.enemies.length; index++) {
        const enemy = this.level1.enemies[index];
        if (this.sharky.isColliding(enemy)) {
          this.sharky.hurtSharky(enemy.constructor.name, enemy);
          if (!this.sharky.isCurrentlyHurt) this.sharky.isCurrentlyHurt = true;
          break;
        } else {
          this.sharky.isCurrentlyHurt = false;
        }
      }
    }, 100);
  }

  startDrawing() {
    this.isDrawing = true;
    this.draw();
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  draw() {
    if (!this.isDrawing) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.landscape);
    if (this.sharky) this.addToMap(this.sharky);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.bubbles);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statBars);
    this.checkBubblePosition();
    requestAnimationFrame(() => this.draw());
  }

  checkBubblePosition() {
    this.bubbles.forEach((bubble, index) => {
      if (bubble.y < -40) this.bubbles.splice(index, 1);
    });
  }

  addToMap(object) {
    if (object.otherDirection) this.flipImage(object);
    object.draw(this.ctx);
    object.drawFrame(this.ctx);
    if (object.otherDirection) this.flipImageBack(object);
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  addObjectsToMap(arry) {
    arry.forEach((element) => {
      this.addToMap(element);
    });
  }
}
