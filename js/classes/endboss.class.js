import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio, loadedCachsArray } from "../script.js";
import { imagesBossIntroduce, imagesBossSwim, imagesBossAttack, imagesBossDead, imagesBossHurt } from "./endboss.class.images.js";

export class EndBoss extends MoveableObject {
  currentAnimation = "swim"; //"introduce""swim""attack""dead""hurt" / "stop"

  currentAnimationIntervall;

  currentMovement;

  constructor() {
    super().loadImage("../../assets/img/2.Enemy/3 Final Enemy/2.floating/1.png");
    this.x = 300;
    this.y = 100;
    this.width = 320 * moveObjRatio;
    this.height = 365 * moveObjRatio;
  }

  async loadAllImagesCacheSharky() {
    await this.loadImageCache(imagesBossIntroduce, this.constructor.name);
    await this.loadImageCache(imagesBossSwim, this.constructor.name);
    await this.loadImageCache(imagesBossAttack, this.constructor.name);
    await this.loadImageCache(imagesBossDead, this.constructor.name);
    await this.loadImageCache(imagesBossHurt, this.constructor.name);
  }

  doCurrentBossAnimation() {
    if (this.currentAnimation == "introduce") this.bossIntroduce();
    if (this.currentAnimation == "swim") this.bossSwim();
    if (this.currentAnimation == "attack") this.bossAttack();
    if (this.currentAnimation == "dead") this.bossDead();
    if (this.currentAnimation == "hurt") this.bossHurt();
    if (this.currentAnimation == "stop") this.bossStop();
  }

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  bossIntroduce() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossIntroduce, this.img, 180);
  }

  bossSwim() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossSwim, this.img, 180);
  }

  bossAttack() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossAttack, this.img, 180);
  }

  bossDead() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossDead, this.img, 180);
  }

  bossHurt() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossHurt, this.img, 180);
  }

  bossStop() {
    this.clearIntervalsAnimationMove();
  }
}
