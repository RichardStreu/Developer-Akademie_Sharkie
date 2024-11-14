export function hurtedByPufferFish() {
  this.lifeEnergy -= 4;
  if (!this.isCurrentlyHurtAnimation) {
    this.clearIntervalsAnimationMove();
    this.sharkyHurtRegularAnimation();
    this.isCurrentlyHurtAnimation = true;
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.sharkyStandAnimation();
      this.isSharkyDead("regular");
      this.isCurrentlyHurtAnimation = false;
    }, 600);
  }
}

export function hurtedByJellyFishRD() {
  this.lifeEnergy -= 6;
  if (!this.isCurrentlyHurtAnimation) {
    this.clearIntervalsAnimationMove();
    this.sharkyHurtRegularAnimation();
    this.isCurrentlyHurtAnimation = true;
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.sharkyStandAnimation();
      this.isSharkyDead("regular");
      this.isCurrentlyHurtAnimation = false;
    }, 600);
  }
}

export function hurtedByJellyFishSD() {
  this.lifeEnergy -= 10;
  if (!this.isCurrentlyHurtAnimation) {
    this.clearIntervalsAnimationMove();
    this.sharkyHurtShockAnimation();
    this.isCurrentlyHurtAnimation = true;
    setTimeout(() => {
      this.clearIntervalsAnimationMove();
      this.sharkyStandAnimation();
      this.isSharkyDead("electric");
      this.isCurrentlyHurtAnimation = false;
    }, 600);
  }
}

export function hurtedByEndBoss() {
  this.lifeEnergy -= 20;
  if (!this.isCurrentlyHurtAnimation) {
    this.clearIntervalsAnimationMove();
    this.sharkyHurtRegularAnimation();
    this.isCurrentlyHurtAnimation = true;
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
