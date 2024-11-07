import { Sharky } from "./sharky.class.js";
import { PufferFishGreen } from "./pufferFishGreen.class.js";
import { PufferFishOrange } from "./pufferFishOrange.class.js";
import { PufferFishRed } from "./pufferFishRed.class.js";
import { JellyFishLilaRD } from "./jellyFishLilaRD.class.js";
import { JellyFishYellowRD } from "./jellyFishYellowRD.class.js";
import { JellyFishGreenSD } from "./jellyFishGreenSD.class.js";
import { JellyFishPinkSD } from "./jellyFishPinkSD.class.js";
import { EndBoss } from "./endboss.class.js";
import { moveObjRatio } from "../script.js";

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

  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.sharky.img, this.sharky.x, this.sharky.y, this.sharky.width, this.sharky.height);
    this.enemies.forEach((elment) => {
      this.ctx.drawImage(elment.img, elment.x, elment.y, elment.width, elment.height);
    });

    // let self = this;
    requestAnimationFrame(() => this.draw());
  }
}
