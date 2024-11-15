export function hurtedByPufferFish() {
  let demageFactor = -4;
  this.lifeEnergy += demageFactor;
  this.world.statBars[1].updatePercentageStatBar(demageFactor);
  if (!this.isCurrentlyHurtAnimation) {
    this.clearIntervalsAnimationMove();
    this.sharkyHurtRegularAnimation();
    this.isCurrentlyHurtAnimation = true;
    this.iscurrentlyAttackAnimation = false;
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.sharkyStandAnimation();
      this.isSharkyDead("regular");
      this.isCurrentlyHurtAnimation = false;
    }, 600);
  }
}

export function hurtedByJellyFishRD() {
  let demageFactor = -6;
  this.lifeEnergy += demageFactor;
  this.world.statBars[1].updatePercentageStatBar(demageFactor);
  if (!this.isCurrentlyHurtAnimation) {
    this.clearIntervalsAnimationMove();
    this.sharkyHurtRegularAnimation();
    this.isCurrentlyHurtAnimation = true;
    this.iscurrentlyAttackAnimation = false;
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.sharkyStandAnimation();
      this.isSharkyDead("regular");
      this.isCurrentlyHurtAnimation = false;
    }, 600);
  }
}

export function hurtedByJellyFishSD() {
  let demageFactor = -10;
  this.lifeEnergy += demageFactor;
  this.world.statBars[1].updatePercentageStatBar(demageFactor);
  if (!this.isCurrentlyHurtAnimation) {
    this.clearIntervalsAnimationMove();
    this.sharkyHurtShockAnimation();
    this.isCurrentlyHurtAnimation = true;
    this.iscurrentlyAttackAnimation = false;
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.sharkyStandAnimation();
      this.isSharkyDead("electric");
      this.isCurrentlyHurtAnimation = false;
    }, 600);
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
    this.iscurrentlyAttackAnimation = false;
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

export function gameOver() {
  console.log("GAME OVER");
}
