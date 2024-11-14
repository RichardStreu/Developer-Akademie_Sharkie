export function hurtedByPufferFish() {
  this.lifeEnergy -= 2;
  this.isSharkyDead("regular");
  console.log(this.lifeEnergy);
  // if (this.isCurrentlyHurt === false) this.isCurrentlyHurt = true;
}

export function hurtedByJellyFishRD() {
  this.lifeEnergy -= 5;
  this.isSharkyDead("regular");
  console.log(this.lifeEnergy);
  // if (this.isCurrentlyHurt === false) this.isCurrentlyHurt = true;
}

export function hurtedByJellyFishSD() {
  this.lifeEnergy -= 10;
  this.isSharkyDead("electric");
  console.log(this.lifeEnergy);
  // if (this.isCurrentlyHurt === false) this.isCurrentlyHurt = true;
}

export function hurtedByEndBoss() {
  this.lifeEnergy -= 25;
  this.isSharkyDead("regular");
  console.log(this.lifeEnergy);
  // if (this.isCurrentlyHurt === false) this.isCurrentlyHurt = true;
}

export function isSharkyDead(kindOfDead) {
  if (this.lifeEnergy <= 0) {
    let isRegularDead = kindOfDead == "regular";
    isRegularDead ? this.regularDead() : this.electricDead();
  }
}

export function regularDead() {
  this.clearIntervalsAnimationMove();
  this.sharkyDeadRegularAnimation();
  setTimeout(() => {
    this.clearIntervalsAnimationMove();
    this.floatToSurface();
  }, 1560);
}

export function electricDead() {
  this.clearIntervalsAnimationMove();
  this.sharkyDeadShockAnimation();
  setTimeout(() => {
    this.clearIntervalsAnimationMove();
    this.sinkToGround();
  }, 1600);
}
