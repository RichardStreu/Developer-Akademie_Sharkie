import { canvasHeight, canvasWidth } from "../script.js";

import { SharkyBubble } from "./sharky.bubble.class.js";

import { playSfxSound, playSwimSound } from "../sound.js";

export function letSharkySleep() {
  let timeOfUnmoved = 0;
  this.currentMovement = setInterval(() => {
    timeOfUnmoved++;
    if (
      timeOfUnmoved > 5 &&
      document.getElementById("startScreen").classList.contains("d_none") &&
      document.getElementById("winScreen").classList.contains("d_none") &&
      document.getElementById("looseScreen").classList.contains("d_none")
    ) {
      this.clearIntervalsAnimationMove();
      this.sharkySleepAnimation();
      playSfxSound("snore", 0, true);
    }
  }, 1000);
}

export function moveSharkyLeft() {
  if (!this.world.keyboard.LEFT) {
    playSwimSound();
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.clearIntervalsAnimationMove();
    this.world.keyboard.LEFT = true;
    this.otherDirection = true;
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.sharkySwimAnimation();
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
    playSwimSound();
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.clearIntervalsAnimationMove();
    this.world.keyboard.RIGHT = true;
    this.otherDirection = false;
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.sharkySwimAnimation();
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
    playSwimSound();
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.clearIntervalsAnimationMove();
    this.world.keyboard.UP = true;
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.sharkySwimAnimation();
    this.isSwimUp = setInterval(() => {
      if (this.y > -95 && this.lifeEnergy > 0) this.y -= 4;
    }, 10);
  }
}

export function moveSharkyDown() {
  if (!this.world.keyboard.DOWN) {
    playSwimSound();
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.clearIntervalsAnimationMove();
    this.world.keyboard.DOWN = true;
    if (!this.isCurrentlyHurtAnimation && !this.isCurrentlyBubbleAttack && !this.isCurrentlyFinSlap) this.sharkySwimAnimation();
    this.isSwimDown = setInterval(() => {
      if (this.y < canvasHeight - 220 && this.lifeEnergy > 0) {
        this.y += 4;
      }
    }, 10);
  }
}

export function sharkyAttackSpace() {
  if (this.isCurrentlyBubbleAttack || this.isCurrentlyHurtAnimation) return;
  this.isCurrentlyBubbleAttack = true;
  this.clearIntervalsAnimationMove();
  stopSound("snore");
  if (!this.isEnoughPoison) this.sharkyBubbleRegularAnimation();
  if (this.isEnoughPoison) this.sharkyBubblePoisonAnimation();
  setTimeout(() => {
    this.shootBubble();
    playSfxSound("blub");
    this.clearIntervalsAnimationMove();
    this.isCurrentlyBubbleAttack = false;
    this.sharkyStandAnimation();
  }, 600);
}

export function shootBubble() {
  if (this.otherDirection) this.world.bubbles.push(new SharkyBubble(this.world, "left"));
  if (!this.otherDirection) this.world.bubbles.push(new SharkyBubble(this.world, "right"));
}

export function sharkyAttackDKey() {
  if (this.isCurrentlyFinSlap) return;
  if (!this.isCurrentlyHurtAnimation) {
    this.isCurrentlyFinSlap = true;
    this.clearIntervalsAnimationMove();
    stopSound("snore");
    this.doFinSlap();
    this.sharkyFinSlapAnimation();
    playSfxSound("slap1", 300);
    this.isCurrentlyAttackAnimation = true;
    setTimeout(() => {
      this.isCurrentlyFinSlap = false;
      this.currentFinSlap = "none";
      this.isCurrentlyAttackAnimation = false;

      this.clearIntervalsAnimationMove();
      this.sharkyStandAnimation();
      this.isCurrentlyFinSlap = false;
    }, 600);
  }
}

export function doFinSlap() {
  this.isCurrentlyFinSlap = true;
  this.otherDirection ? (this.currentFinSlap = "left") : (this.currentFinSlap = "right");
}
