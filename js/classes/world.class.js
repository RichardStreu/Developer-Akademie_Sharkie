import { Sharky } from "./sharky.class.js";
import { PufferFishGreen } from "./pufferFishGreen.class.js";
import { PufferFishOrange } from "./pufferFishOrange.class.js";
import { PufferFishRed } from "./pufferFishRed.class.js";
import { JellyFishLilaRD } from "./jellyFishLilaRD.class.js";
import { JellyFishYellowRD } from "./jellyFishYellowRD.class.js";
import { JellyFishGreenSD } from "./jellyFishGreenSD.class.js";
import { JellyFishPinkSD } from "./jellyFishPinkSD.class.js";
import { EndBoss } from "./endboss.class.js";

export class World {
  sharky = new Sharky();
  enemies = [new PufferFishGreen(), new PufferFishOrange(), new PufferFishRed(), new JellyFishLilaRD(), new JellyFishYellowRD(), new JellyFishGreenSD(), new JellyFishPinkSD()];

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

    let self = this;
    requestAnimationFrame(() => self.draw());
  }
}
