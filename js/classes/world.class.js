import { Sharky } from "./sharky.class.js";
import { PufferFishGreen } from "./pufferFishGreen.class.js";
import { PufferFishOrange } from "./pufferFishOrange.class.js";
import { PufferFishRed } from "./pufferFishRed.class.js";
import { JellyFishLilaRD } from "./jellyFishLilaRD.class.js";
import { JellyFishYellowRD } from "./jellyFishYellowRD.class.js";
import { JellyFishGreenSD } from "./jellyFishGreenSD.class.js";
import { JellyFishPinkSD } from "./jellyFishPinkSD.class.js";
import { EndBoss } from "./endboss.class.js";

import { Water } from "./staticWater.class.js";
import { Fondo1 } from "./staticFondo1.class.js";
import { Fondo2 } from "./staticFondo2.class.js";
import { Floor } from "./staticFloor.class.js";
import { Light } from "./staticLight.class.js";
import { Barrier1 } from "./staticBarrier1.class.js";
import { Barrier2 } from "./staticBarrier2.class.js";
import { Barrier3 } from "./staticBarrier3.class.js";

import { canvasWidth } from "../script.js";

import { Level1 } from "./level1.class.js";

export class World {
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.sharky.world = this;
  }

  level1 = new Level1();

  sharky = new Sharky();

  landscape = this.level1.landscape;
  enemies = this.level1.enemies;

  // give each enemy its index of enemies as parameter

  canvas;
  ctx;
  camera_x = 0;

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.landscape);
    this.addToMap(this.sharky);
    this.addObjectsToMap(this.enemies);

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
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
