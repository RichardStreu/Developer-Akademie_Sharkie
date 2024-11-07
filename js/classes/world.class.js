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

export class World {
  sharky = new Sharky();
  enemies = [
    new PufferFishGreen(),
    new JellyFishYellowRD(),
    new PufferFishOrange(),
    new JellyFishLilaRD(),
    new JellyFishGreenSD(),
    new JellyFishPinkSD(),
    new PufferFishRed(),
    // new EndBoss(),
  ];

  landscape = [new Water(), new Fondo1(), new Fondo2(), new Floor(), new Light()];

  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    // clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw landscape
    this.landscape.forEach((elment) => {
      this.ctx.drawImage(elment.img, elment.x, elment.y, elment.width, elment.height);
    });

    // draw Sharky and Enemys for first time
    this.ctx.drawImage(this.sharky.img, this.sharky.x, this.sharky.y, this.sharky.width, this.sharky.height);
    this.enemies.forEach((elment) => {
      this.ctx.drawImage(elment.img, elment.x, elment.y, elment.width, elment.height);
    });

    // let self = this;
    requestAnimationFrame(() => this.draw());
  }
}
