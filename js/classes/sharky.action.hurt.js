import { playHurtSound, stopSwimSound, playSfxSound } from "../sound.js";

export function getCoins(enemy) {
  this.coin += 1;
  playSfxSound("coin", 0, false, 0.3);
  if (this.coin >= 20) {
    this.lifeEnergy = 100;
  }
}

export function getPoison(enemy) {
  this.poison += 1;
  playSfxSound("bottle", 0 , false, 0.2);
  if (this.poison >= 10) this.isEnoughPoison = true;
}

export function hurtedByPufferFish() {
  if (!this.isCurrentlyFinSlap) {
    let demageFactor = -4;
    this.lifeEnergy += demageFactor;
    this.world.statBars[1].updatePercentageStatBar(demageFactor);
    if (!this.isCurrentlyHurtAnimation) {
      this.clearIntervalsAnimationMove();
      this.sharkyHurtRegularAnimation();
      this.isCurrentlyHurtAnimation = true;
      this.isCurrentlyAttackAnimation = false;
      playHurtSound("hurt1");
      setTimeout(() => {
        this.clearIntervalsAnimationMove();
        this.sharkyStandAnimation();
        this.isSharkyDead("regular");
        this.isCurrentlyHurtAnimation = false;
      }, 600);
    }
  }
}

export function hurtedByJellyFishRD() {
  if (!this.isCurrentlyFinSlap) {
    let demageFactor = -6;
    this.lifeEnergy += demageFactor;
    this.world.statBars[1].updatePercentageStatBar(demageFactor);
    if (!this.isCurrentlyHurtAnimation) {
      this.clearIntervalsAnimationMove();
      this.sharkyHurtRegularAnimation();
      this.isCurrentlyHurtAnimation = true;
      this.isCurrentlyAttackAnimation = false;
      playHurtSound("hurt2");
      setTimeout(() => {
        this.clearIntervalsAnimationMove();
        this.sharkyStandAnimation();
        this.isSharkyDead("regular");
        this.isCurrentlyHurtAnimation = false;
      }, 600);
    }
  }
}

export function hurtedByJellyFishSD() {
  if (!this.isCurrentlyFinSlap) {
    let demageFactor = -10;
    this.lifeEnergy += demageFactor;
    this.world.statBars[1].updatePercentageStatBar(demageFactor);
    if (!this.isCurrentlyHurtAnimation) {
      this.clearIntervalsAnimationMove();
      this.sharkyHurtShockAnimation();
      this.isCurrentlyHurtAnimation = true;
      this.isCurrentlyAttackAnimation = false;
      playHurtSound("electroShock");
      setTimeout(() => {
        this.clearIntervalsAnimationMove();
        this.sharkyStandAnimation();
        this.isSharkyDead("electric");
        this.isCurrentlyHurtAnimation = false;
      }, 600);
    }
  }
}

export function hurtedByEndBoss() {
  let demageFactor = -20;
  this.lifeEnergy += demageFactor;
  this.world.statBars[1].updatePercentageStatBar(demageFactor);
  if (!this.isCurrentlyHurtAnimation) {
    this.clearIntervalsAnimationMove();
    this.sharkyHurtRegularAnimation();
    this.isCurrentlyHurtAnimation = true;
    this.isCurrentlyAttackAnimation = false;
    playHurtSound("hurt4");
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.sharkyStandAnimation();
      this.isSharkyDead("regular");
      this.isCurrentlyHurtAnimation = false;
    }, 600);
  }
}

export function isSharkyDead(kindOfDead) {
  if (this.lifeEnergy <= 0) {
    stopSwimSound();
    let isRegularDead = kindOfDead == "regular";
    isRegularDead ? this.regularDead() : this.electricDead();
  }
}

export function regularHurt() {}

export function electricHurt() {}

export function regularDead() {
  this.clearIntervalsAnimationMove();
  this.sharkyDeadRegularAnimation();
  setTimeout(() => {
    this.clearIntervalsAnimationMove();
    this.floatToSurface("Sharky");
  }, 1560);
}

export function electricDead() {
  this.clearIntervalsAnimationMove();
  this.sharkyDeadShockAnimation();
  setTimeout(() => {
    this.clearIntervalsAnimationMove();
    this.sinkToGround("Sharky");
  }, 1600);
}
