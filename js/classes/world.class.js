import { Sharky } from "./sharky.class.js";
import { PufferFish } from "./pufferFish.class.js";
import { JellyFish } from "./jellyFish.class.js";
import { EndBoss } from "./endboss.class.js";

export class World {
  sharky = new Sharky();
  enemies = [new PufferFish(), new PufferFish(), new JellyFish(), new JellyFish()];

  draw() {}
}
