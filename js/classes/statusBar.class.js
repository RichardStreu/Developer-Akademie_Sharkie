import { DrawableObject } from "./drawable-object.class";

export class StatusBar extends DrawableObject {

  constructor() {
    super();
  }

  setPercantageStatBar(percent) {
    this.percentage += percent;
  }
}