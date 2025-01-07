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
import { Coin } from "./coin.class.js";
import { Poison } from "./poison.class.js";

export class Level1 {

  world;

  constructor() {

    // this.world = world;

    this.landscape = [
      new Water(),
      new Water(canvasWidth * 2, 0),
      new Fondo1(0),
      new Fondo2(0),
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
      new EndBoss(17),
      new Poison(450, 350, 18),
      new Poison(800, 390, 19),
      new Poison(1400, 380, 20),
      new Poison(1670, 360, 21),
      new Poison(2090, 370, 22),
      new Coin(320, 270, 23),
      new Coin(380, 100, 24),
      new Coin(500, 160, 25),
      new Coin(800, 300, 26),
      new Coin(800, 200, 27),
      new Coin(800, 100, 28),
      new Coin(1200, 300, 29),
      new Coin(1500, 25, 30),
      new Coin(1600, 10, 31),
      new Coin(2000, 100, 32),
    ];
  }
}
