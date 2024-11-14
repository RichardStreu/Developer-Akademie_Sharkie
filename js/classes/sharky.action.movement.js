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
    this.clearIntervalsAnimationMove();
    this.world.keyboard.LEFT = true;
    this.otherDirection = true;
    this.sharkySwimAnimation();
    this.isSwimLeft = setInterval(() => {
      if (this.x > -30) {
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
    this.clearIntervalsAnimationMove();
    this.world.keyboard.RIGHT = true;
    this.otherDirection = false;
    this.sharkySwimAnimation();
    this.isSwimRight = setInterval(() => {
      if (this.x < canvasWidth * 4 - this.width) {
        this.x += 4;
        let sharkyMidPoint = canvasWidth / 2 - this.width / 2 - 50;
        if (this.x >= sharkyMidPoint && this.x < canvasWidth * 3.5 - this.width) this.world.camera_x = sharkyMidPoint - this.x;
      }
    }, 10);
  }
}

export function moveSharkyUp() {
  if (!this.world.keyboard.UP) {
    this.clearIntervalsAnimationMove();
    this.world.keyboard.UP = true;
    this.sharkySwimAnimation();
    this.isSwimUp = setInterval(() => {
      if (this.y > -120) this.y -= 4;
    }, 10);
  }
}

export function moveSharkyDown() {
  if (!this.world.keyboard.DOWN) {
    this.clearIntervalsAnimationMove();
    this.world.keyboard.DOWN = true;
    this.sharkySwimAnimation();
    this.isSwimDown = setInterval(() => {
      if (this.y < canvasHeight - 262) {
        this.y += 4;
      }
    }, 10);
  }
}

export function sharkyAttackSpace() {
  if (!this.world.keyboard.SPACE) {
    this.world.keyboard.SPACE = true;
    this.clearIntervalsAnimationMove();
    console.log("Bubble Attack");
  }
}

export function sharkyAttackDKey() {
  if (!this.world.keyboard.DKey) {
    this.world.keyboard.DKey = true;
    this.clearIntervalsAnimationMove();
    console.log("Fin Slap Attack");
  }
}
