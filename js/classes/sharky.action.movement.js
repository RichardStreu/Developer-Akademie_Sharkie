import { canvasHeight, canvasWidth } from "../script.js";

export function letSharkySleep() {
  let timeOfUnmoved = 0;
  this.currentMovement = setInterval(() => {
    timeOfUnmoved++;
    if (timeOfUnmoved > 7) {
      this.clearIntervalsAnimationMove();
      this.sharkySleepAnimation();
    }
  }, 1000);
}

export function moveSharkyLeft() {
  if (!this.world.keyboard.LEFT) {
    if (!this.isCurrentlyHurtAnimation) this.clearIntervalsAnimationMove();
    this.world.keyboard.LEFT = true;
    this.otherDirection = true;
    if (!this.isCurrentlyHurtAnimation) this.sharkySwimAnimation();
    this.isSwimLeft = setInterval(() => {
      if (this.x > -30 && this.lifeEnergy > 0) {
        this.x -= 4;
        const sharkyMidPoint = canvasWidth / 2 - this.width / 2 - 50;
        if (this.x > sharkyMidPoint && this.x > 0 && this.x < canvasWidth * 3.5 - this.width) {
          this.world.camera_x = sharkyMidPoint - this.x;
        } else if (this.x <= 0) {
          this.world.camera_x = 0;
        }
      }
    }, 10);
  }
}

export function moveSharkyRight() {
  if (!this.world.keyboard.RIGHT) {
    if (!this.isCurrentlyHurtAnimation) this.clearIntervalsAnimationMove();
    this.world.keyboard.RIGHT = true;
    this.otherDirection = false;
    if (!this.isCurrentlyHurtAnimation) this.sharkySwimAnimation();
    this.isSwimRight = setInterval(() => {
      if (this.x < canvasWidth * 4 - this.width && this.lifeEnergy > 0) {
        this.x += 4;
        let sharkyMidPoint = canvasWidth / 2 - this.width / 2 - 50;
        if (this.x >= sharkyMidPoint && this.x < canvasWidth * 3.5 - this.width) this.world.camera_x = sharkyMidPoint - this.x;
      }
    }, 10);
  }
}

export function moveSharkyUp() {
  if (!this.world.keyboard.UP) {
    if (!this.isCurrentlyHurtAnimation) this.clearIntervalsAnimationMove();
    this.world.keyboard.UP = true;
    if (!this.isCurrentlyHurtAnimation) this.sharkySwimAnimation();
    this.isSwimUp = setInterval(() => {
      if (this.y > -120 && this.lifeEnergy > 0) this.y -= 4;
    }, 10);
  }
}

export function moveSharkyDown() {
  if (!this.world.keyboard.DOWN) {
    if (!this.isCurrentlyHurtAnimation) this.clearIntervalsAnimationMove();
    this.world.keyboard.DOWN = true;
    if (!this.isCurrentlyHurtAnimation) this.sharkySwimAnimation();
    this.isSwimDown = setInterval(() => {
      if (this.y < canvasHeight - 262 && this.lifeEnergy > 0) {
        this.y += 4;
      }
    }, 10);
  }
}

export function sharkyAttackSpace() {
  if (!this.world.keyboard.SPACE) {
    this.world.keyboard.SPACE = true;
    if (!this.isCurrentlyHurtAnimation && !this.iscurrentlyAttackAnimation) {
      this.clearIntervalsAnimationMove();
      this.sharkyBubbleRegularAnimation();
      // call attack animation
      console.log("Bubble Attack");
      this.iscurrentlyAttackAnimation = true;
      setTimeout(() => {
        this.clearIntervalsAnimationMove();
        this.sharkyStandAnimation();
        this.iscurrentlyAttackAnimation = false;
      }, 600);
    }
  }
}

export function sharkyAttackDKey() {
  if (!this.world.keyboard.DKey) {
    this.world.keyboard.DKey = true;
    if (!this.isCurrentlyHurtAnimation && !this.iscurrentlyAttackAnimation) {
      this.clearIntervalsAnimationMove();
      this.sharkyFinSlapAnimation();
      // call attack animation
      console.log("Fin Slap Attack");
      this.iscurrentlyAttackAnimation = true;
      setTimeout(() => {
        this.clearIntervalsAnimationMove();
        this.sharkyStandAnimation();
        this.iscurrentlyAttackAnimation = false;
      }, 600);
    }
  }
}
