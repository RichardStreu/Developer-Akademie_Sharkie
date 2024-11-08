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
  // !assign moveUpDownFactor as first parameter to new JellyFish...() --> it has to be smaller than 1 !
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  sharky = new Sharky();

  landscape = [new Water(), new Fondo1(), new Fondo2(), new Floor(), new Light()];

  enemies = [
    new PufferFishGreen(0),
    new JellyFishYellowRD(1),
    new PufferFishOrange(2),
    new JellyFishLilaRD(3),
    new JellyFishGreenSD(4),
    new JellyFishPinkSD(5),
    new PufferFishRed(6),
    // new EndBoss(),
  ];

  canvas;
  ctx;

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.landscape);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.sharky);

    requestAnimationFrame(() => this.draw());
  }

  addToMap(object) {
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  }

  addObjectsToMap(arry) {
    arry.forEach((element) => {
      this.addToMap(element);
    });
  }
}
