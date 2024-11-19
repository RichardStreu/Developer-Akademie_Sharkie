import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio, loadedCachsArray, youWin } from "../script.js";
import { imagesBossIntroduce, imagesBossSwim, imagesBossAttack, imagesBossDead, imagesBossHurt } from "./endboss.class.images.js";

export class EndBoss extends MoveableObject {
  // currentAnimation = "introduce"; //"introduce""swim""attack""dead""hurt" / "stop"

  currentAnimationIntervall;

  currentMovement;

  currentlyMoveUp = true;

  world;

  bossIsVisible = false;

  sharkyX;
  sharkyY;

  constructor(index, world) {
    super().loadImage("../../assets/img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.x = 2450;
    this.y = -1000;
    this.width = 300 * moveObjRatio;
    this.height = 342 * moveObjRatio;
    this.world = world;
    this.loadAllImagesEndboss();
    this.checkImagesCacheLoaded();
    this.checkSharkyPosition();
  }

  checkSharkyPosition() {
    setInterval(() => {
      this.sharkyX = this.world.sharky.x;
      this.sharkyY = this.world.sharky.y;
      if (this.sharkyX >= 2000 && !this.bossIsVisible) this.doBossIntroduce();
    }, 100);
  }

  doBossIntroduce() {
    this.bossIsVisible = true;
    this.y = -50;
    this.bossIntroduce();
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.bossSwim();
    }, 1500);
    this.moveBossUpDown();
  }

  moveBossUpDown() {
    let minY = -120;
    let maxY = 50;
    setInterval(() => {
      if (this.currentlyMoveUp && this.y > minY) this.y -= 6;
      if (this.currentlyMoveUp && this.y < minY) this.currentlyMoveUp = false;
      if (!this.currentlyMoveUp && this.y < maxY) this.y += 6;
      if (!this.currentlyMoveUp && this.y > maxY) this.currentlyMoveUp = true;
    }, 100);
    }

  async loadAllImagesEndboss() {
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
    this.doImageAnimation(imagesBossIntroduce, this.img, 150);
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
    this.doImageAnimation(imagesBossDead, this.img, 150);
  }

  bossHurt() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossHurt, this.img, 180);
  }

  bossStop() {
    this.clearIntervalsAnimationMove();
  }

  enemyIsDead() {
    this.bossDead();

    setTimeout(() => {
      clearInterval(this.currentAnimationIntervall);
      this.loadImage("../../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png");
    }, 600);

    setTimeout(() => {
      this.floatToSurface();
      setInterval(() => {
        if (this.y < 0 - (this.height + 400)) {
          clearInterval(this.currentMovement);
          clearInterval(this.currentAnimationIntervall);
          youWin();
        }
      }, 200);
    }, 1500);
  }
}
