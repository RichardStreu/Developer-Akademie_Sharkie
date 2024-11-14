import { DrawableObject } from "./drawable-object.class";

export class StatusBarLife extends DrawableObject {
  imgStatBarLife = [
    "../../assets/img/4. Marcadores/green/Life/0_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/20_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Life/40_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/60_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/80_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/100_  copia 2.png",
  ];

  constructor() {
    super();
    this.loadStatBarLifeImg();
  }

  async loadStatBarLifeImg() {
    await this.loadImageCache(this.imgStatBarLife, this.constructor.name);
  }
}
