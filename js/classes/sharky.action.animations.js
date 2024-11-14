import {
  imagesStand,
  imagesFallAsleep,
  imagesSleep,
  imagesSwim,
  imagesAttackBubbleWithout,
  imagesAttackBubbleRegular,
  imagesAttackBubblePoison,
  imagesAttackFinSlap,
  imagesHurtRegular,
  imagesHurtShock,
  imagesDeadRegular,
  imagesDeadShock,
} from "./sharky.class.images.js";

export function sharkyStandAnimation() {
  this.doImageAnimation(imagesStand, this.img, 180);
}
export function sharkyFallAsleepAnimation() {
  this.doImageAnimation(imagesFallAsleep, this.img, 150);
}
export function sharkySleepAnimation() {
  this.doImageAnimation(imagesSleep, this.img, 200);
}
export function sharkySwimAnimation() {
  this.doImageAnimation(imagesSwim, this.img, 80);
}
export function sharkyBubbleWithoutAnimation() {
  this.doImageAnimation(imagesAttackBubbleWithout, this.img, 110);
}
export function sharkyBubbleRegularAnimation() {
  this.doImageAnimation(imagesAttackBubbleRegular, this.img, 110);
}
export function sharkyBubblePoisonAnimation() {
  this.doImageAnimation(imagesAttackBubblePoison, this.img, 110);
}
export function sharkyFinSlapAnimation() {
  this.doImageAnimation(imagesAttackFinSlap, this.img, 100);
}
export function sharkyHurtRegularAnimation() {
  this.doImageAnimation(imagesHurtRegular, this.img, 110);
}
export function sharkyHurtShockAnimation() {
  this.doImageAnimation(imagesHurtShock, this.img, 110);
}
export function sharkyDeadRegularAnimation() {
  this.doImageAnimation(imagesDeadRegular, this.img, 130);
}
export function sharkyDeadShockAnimation() {
  this.doImageAnimation(imagesDeadShock, this.img, 130);
}
