export function hurtedByPufferFish() {
  this.lifeEnergy -= 2;
  console.log(this.lifeEnergy);
  
  // if (this.isCurrentlyHurt === false) this.isCurrentlyHurt = true;
}

export function hurtedByJellyFishRD() {
  this.lifeEnergy -= 5;
  console.log(this.lifeEnergy);
  
  // if (this.isCurrentlyHurt === false) this.isCurrentlyHurt = true;
}

export function hurtedByJellyFishSD() {
  this.lifeEnergy -= 10;
  console.log(this.lifeEnergy);
  
  // if (this.isCurrentlyHurt === false) this.isCurrentlyHurt = true;
}

export function hurtedByEndBoss() {
  this.lifeEnergy -= 25;
  console.log(this.lifeEnergy);
  
  // if (this.isCurrentlyHurt === false) this.isCurrentlyHurt = true;
}