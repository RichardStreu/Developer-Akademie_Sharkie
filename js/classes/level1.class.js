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


export class Level1 {
  constructor() {
    this.landscape = [
      new Water(),
      new Water(canvasWidth * 2, 0),
      new Fondo1(),
      new Fondo2(),
      new Fondo1(canvasWidth * 2, 0),
      new Fondo2(canvasWidth * 2, 0),
      new Floor(),
      new Floor(canvasWidth * 2, 0),
      new Light(),
    ];

    this.enemies = [
      new PufferFishGreen(0),
      new JellyFishYellowRD(1),
      new PufferFishOrange(2),
      new JellyFishLilaRD(3),
      new JellyFishGreenSD(4),
      new JellyFishPinkSD(5),
      new PufferFishRed(6),
      new PufferFishOrange(7),
      new JellyFishGreenSD(8),
      new PufferFishGreen(9),
      new PufferFishGreen(10),
      new PufferFishGreen(11),
      new PufferFishRed(12),
      new JellyFishPinkSD(13),
      new JellyFishYellowRD(14),
      new PufferFishGreen(15),
      new PufferFishGreen(16),
      // new EndBoss(),
    ];
  }
}