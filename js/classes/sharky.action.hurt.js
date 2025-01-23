import { playHurtSound, stopSwimSound, playSfxSound } from "../sound.js";

export function getCoins(enemy) {
  this.coin += 1;
  playSfxSound("coin", 0, false, 0.3);
  if (this.coin >= 20) {
    this.lifeEnergy = 100;
    this.coin = 0;
  }
}

export function getPoison(enemy) {
  this.poison += 1;
  playSfxSound("bottle", 0, false, 0.2);
  if (this.poison >= 10) this.isEnoughPoison = true;
}

export function handleHurtAnimation() {
  this.clearIntervalsAnimationMove();
  this.isCurrentlyHurtAnimation = true;
  this.isCurrentlyAttackAnimation = false;
}

export function resetHurtAnimation() {
  this.clearIntervalsAnimationMove();
  this.sharkyStandAnimation();
  this.isCurrentlyHurtAnimation = false;
}

export function hurtedByPufferFish() {
  if (!this.isCurrentlyFinSlap) {
    let demageFactor = -4;
    this.lifeEnergy += demageFactor;
    this.world.statBars[1].updatePercentageStatBar(demageFactor);
    if (!this.isCurrentlyHurtAnimation) {
      this.handleHurtAnimation();
      this.sharkyHurtRegularAnimation();
      playHurtSound("hurt1");
      setTimeout(() => {
        this.resetHurtAnimation();
        this.isSharkyDead("regular");
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
      this.handleHurtAnimation();
      this.sharkyHurtRegularAnimation();
      playHurtSound("hurt2");
      setTimeout(() => {
        this.resetHurtAnimation();
        this.isSharkyDead("regular");
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
      this.handleHurtAnimation();
      this.sharkyHurtShockAnimation();
      playHurtSound("electroShock");
      setTimeout(() => {
        this.resetHurtAnimation();
        this.isSharkyDead("electric");
      }, 600);
    }
  }
}

export function hurtedByEndBoss() {
  let demageFactor = -20;
  this.lifeEnergy += demageFactor;
  this.world.statBars[1].updatePercentageStatBar(demageFactor);
  if (!this.isCurrentlyHurtAnimation) {
    this.handleHurtAnimation();
    this.sharkyHurtRegularAnimation();
    playHurtSound("hurt4");
    setTimeout(() => {
      this.resetHurtAnimation();
      this.isSharkyDead("regular");
    }, 600);
  }
}

export function isSharkyDead(kindOfDead) {
  if (this.lifeEnergy <= 0) {
    stopSwimSound();
    this.removeSharkyMobileListeners();
    let isRegularDead = kindOfDead == "regular";
    isRegularDead ? this.regularDead() : this.electricDead();
  }
}

export function regularDead() {
  stopSound("backgroundRetroArcade");
  stopSound("backgroundMetal");
  playSfxSound("backgroundLose");
  this.clearIntervalsAnimationMove();
  this.sharkyDeadRegularAnimation();
  setTimeout(() => {
    this.clearIntervalsAnimationMove();
    this.floatToSurface("Sharky");
  }, 1560);
}

export function electricDead() {
  stopSound("backgroundRetroArcade");
  stopSound("backgroundMetal");
  playSfxSound("backgroundLose");
  this.clearIntervalsAnimationMove();
  this.sharkyDeadShockAnimation();
  setTimeout(() => {
    this.clearIntervalsAnimationMove();
    this.sinkToGround("Sharky");
  }, 1600);
}

