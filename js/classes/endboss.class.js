import { MoveableObject } from "./moveable-object.class.js";
import { moveObjRatio, youWin } from "../script.js";
import { imagesBossIntroduce, imagesBossSwim, imagesBossAttack, imagesBossDead } from "./endboss.class.images.js";
import { playSfxSound, stopSound } from "../sound.js";

export class EndBoss extends MoveableObject {
  currentAnimationIntervall;
  currentSharkyPositionInterval;
  countSecondsInterval;
  endBossLifeBarInterval;
  currentMovement;
  currentlyMoveUp = true;
  floating;
  world;
  bossUpDown;
  bossIsVisible = false;
  bossIsDead = false;
  moveBossForward;
  sprintForwardTime = this.getRandomCooldown();
  sprintForwardInterval;
  currentPlaytime = 0;
  sharkyX;
  sharkyY;
  isEnemyDead = false;

  constructor(index) {
    super().loadImage("../../assets/img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.x = 2750;
    this.y = -1000;
    this.width = 300 * moveObjRatio;
    this.height = 342 * moveObjRatio;
    this.loadAllImagesEndboss();
    this.checkImagesCacheLoaded();
    this.checkSharkyPosition();
    this.countSeconds();
  }

  clearAllEndBossIntervals() {
    clearInterval(this.bossUpDown);
    clearInterval(this.moveBossForward);
    clearInterval(this.sprintForwardInterval);
    clearInterval(this.currentAnimationIntervall);
    clearInterval(this.currentSharkyPositionInterval);
    clearInterval(this.countSecondsInterval);
    clearInterval(this.endBossLifeBarInterval);
    this.clearIntervalsAnimationMove();
  }

  setLifeBarInterval() {
    this.endBossLifeBarInterval = setInterval(() => {
      if (this.world.enemies[17].lifeEnergy <= 0) {
        clearInterval(this.endBossLifeBarInterval);
      }
      if (this.world.enemies[17].lifeEnergy > 0) {
        document.getElementById("innerLifeBar").style.width = `${this.world.enemies[17].lifeEnergy}%`;
      }
      if ((this.world.enemies[17].isEnemyDead)) {
        document.getElementById("innerLifeBar").style.width = `0%`;
        clearInterval(this.endBossLifeBarInterval);
      }
    }, 100);
  }

  countSeconds() {
    this.countSecondsInterval = setInterval(() => {
      this.currentPlaytime += 1;
    }, 1000);
  }

  checkSharkyPosition() {
    this.currentSharkyPositionInterval = setInterval(() => {
      this.sharkyX = this.world.sharky.x;
      this.sharkyY = this.world.sharky.y;
      if (this.sharkyX >= 2300 && !this.bossIsVisible) this.doBossIntroduce();
    }, 100);
  }

  doBossIntroduce() {
    this.bossIsVisible = true;
    this.y = -50;
    this.bossIntroduce();
    setTimeout(() => {
      playSfxSound("bossSplash");
      stopSound("backgroundRetroArcade");
      playSfxSound("backgroundMetal");
    }, 500);
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.bossSwim();
    }, 1500);
    this.moveBossUpDown();
    this.moveBossForBackwards();
    this.sprintBossForwards();
  }

  moveBossUpDown() {
    let minY = -110;
    let maxY = 130;
    this.bossUpDown = setInterval(() => {
      if (this.currentlyMoveUp && this.y >= minY) this.y -= 1.5;
      if (this.currentlyMoveUp && this.y < minY) this.currentlyMoveUp = false;
      if (!this.currentlyMoveUp && this.y < maxY) this.y += 1.5;
      if (!this.currentlyMoveUp && this.y >= maxY) this.currentlyMoveUp = true;
    }, 10);
  }

  moveBossForBackwards() {
    this.moveBossForward = setInterval(() => {
      if (this.world.sharky.x <= 2300 && this.lifeEnergy > 0) {
        this.x = this.world.sharky.x + 300;
      }
    }, 10);
  }

  sprintBossForwards() {
    this.sprintForwardInterval = setInterval(() => {
      if (this.world.sharky.lifeEnergy > 0) {
        clearInterval(this.moveBossForward);
        clearInterval(this.currentAnimationIntervall);
        this.bossAttack();
        let direction = "left";
        let xRange = 0;
        let interval = setInterval(() => {
          if (xRange < 300 && direction == "left") {
            this.x -= 5;
            xRange += 5;
          }
          if (xRange >= 300 && direction == "left") {
            direction = "right";
          }
          if (xRange > 0 && direction == "right") {
            this.x += 5;
            xRange -= 5;
          }
          if (xRange <= 0 && direction == "right") {
            direction = "left";
            xRange = 0;
            this.clearIntervalsAnimationMove();
            this.moveBossForBackwards();
            this.bossSwim();
            clearInterval(interval);
          }
        }, 10);
      }
    }, 4500);
  }

  getRandomCooldown() {
    return Math.floor(Math.random() * 4500) + 4500;
  }

  async loadAllImagesEndboss() {
    await this.loadImageCache(imagesBossIntroduce, this.constructor.name);
    await this.loadImageCache(imagesBossSwim, this.constructor.name);
    await this.loadImageCache(imagesBossAttack, this.constructor.name);
    await this.loadImageCache(imagesBossDead, this.constructor.name);
  }

  doCurrentBossAnimation() {
    if (this.currentAnimation == "introduce") this.bossIntroduce();
    if (this.currentAnimation == "swim") this.bossSwim();
    if (this.currentAnimation == "attack") this.bossAttack();
    if (this.currentAnimation == "dead") this.bossDead();
    if (this.currentAnimation == "stop") this.bossStop();
  }

  clearIntervalsAnimationMove() {
    clearInterval(this.currentMovement);
    clearInterval(this.currentAnimationIntervall);
  }

  bossIntroduce() {
    setTimeout(() => {
      document.getElementById("endBossLifeBar").classList.remove("d_none");
      this.setLifeBarInterval();
    }, 1000);
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossIntroduce, this.img, 150);
  }

  bossSwim() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossSwim, this.img, 180);
  }

  bossAttack() {
    playSfxSound("bossScream", 0, false, 0);
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossAttack, this.img, 180);
  }

  bossDead() {
    this.clearIntervalsAnimationMove();
    this.doImageAnimation(imagesBossDead, this.img, 150);
  }

  bossStop() {
    this.clearIntervalsAnimationMove();
  }

  enemyIsDead() {
    if (!this.bossIsDead) {
      clearInterval(this.moveBossForward);
      clearInterval(this.sprintForwardInterval);
      this.bossIsDead = true;
      this.isEnemyDead = true;
      this.bossDead();
      setTimeout(() => {
        this.clearIntervalsAnimationMove();
        clearInterval(this.bossUpDown);
        this.loadImage("../../assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png");
      }, 600);
      setTimeout(() => {
        this.floatToSurface();
        playSfxSound("backgroundWin");
        stopSound("backgroundMetal");
        const floatingInterval = setInterval(() => {
          if (this.y <= -430) {
            clearInterval(this.currentMovement);
            clearInterval(this.currentAnimationIntervall);
            youWin();
            clearInterval(floatingInterval);
          }
        }, 10);
      }, 1500);
    }
  }
}
