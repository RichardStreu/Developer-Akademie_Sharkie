export function handleKeyDown(event) {
  if (
    this.lifeEnergy > 0 &&
    !this.isCurrentlyAttackAnimation &&
    document.getElementById("winScreen").classList.contains("d_none") &&
    document.getElementById("looseScreen").classList.contains("d_none")
  ) {
    if (event.key == "ArrowLeft") this.moveSharkyLeft();
    if (event.key == "ArrowRight") this.moveSharkyRight();
    if (event.key == "ArrowUp") this.moveSharkyUp();
    if (event.key == "ArrowDown") this.moveSharkyDown();
    if (event.key == " ") this.sharkyAttackSpace();
    if (event.key == "d") this.sharkyAttackDKey();
    stopSound("snore");
  }
}

export function setAllKeyDownsToFalse() {
  this.world.keyboard.LEFT = false;
  this.world.keyboard.RIGHT = false;
  this.world.keyboard.UP = false;
  this.world.keyboard.DOWN = false;
  this.world.keyboard.SPACE = false;
  this.world.keyboard.DKey = false;
} 

export function handleKeyUp(event) {
    if (this.lifeEnergy > 0) {
      if (event.key == "ArrowLeft") this.keyArrowLeftUp();
      if (event.key == "ArrowRight") this.keyArrowRightUp();
      if (event.key == "ArrowUp") this.keyArrowUpUp();
      if (event.key == "ArrowDown") this.keyArrowDownUp();
      if (event.key == " ") this.keySpaceUp();
      if (event.key == "d") this.keyDUp();
      if (Object.values(this.world.keyboard).every((value) => value === false)) this.allKeysUp();
    }
  }

export function keyArrowLeftUp() {
    this.world.keyboard.LEFT = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimLeft);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) this.resetSharkyState();
    }
  }

export function keyArrowRightUp() {
    this.world.keyboard.RIGHT = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimRight);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) this.resetSharkyState();
    }
  }

export function keyArrowUpUp() {
    this.world.keyboard.UP = false;
    this.checkSwimmingForStopSound();
    clearInterval(this.isSwimUp);
    if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
      stopSound("snore");
      if (!this.isCurrentlyFinSlap) this.resetSharkyState();
    }
  }

export function keyArrowDownUp() {
  this.world.keyboard.DOWN = false;
  this.checkSwimmingForStopSound();
  clearInterval(this.isSwimDown);
  if (this.areMobileButtonsAvailable && !this.isCurrentlyHurtAnimation) {
    stopSound("snore");
    if (!this.isCurrentlyFinSlap) this.resetSharkyState();
  }
}

export function keySpaceUp() {
  this.world.keyboard.SPACE = false;
}

export function keyDUp() {
  this.world.keyboard.DKey = false;
}

export function allKeysUp() {
  if (this.isCurrentlyAttackAnimation) {
    setTimeout(() => {
      if (this.isCurrentlyAttackAnimation) this.isCurrentlyAttackAnimation = false;
      this.resetSharkyState();
    }, 600);
  }
  if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyAttackAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.resetSharkyState();
}