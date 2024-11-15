import { DrawableObject } from "./drawable-object.class";

export class StatusBarCoin extends DrawableObject {
  imgStatBarCoin = [
    "../../assets/img/4. Marcadores/green/Coin/0_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/20_  copia 2.png",
    "../../assets/img/4. Marcadores/green/Coin/40_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/60_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/80_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/100_  copia 4.png",
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadStatBarCoinImg();
  }

  async loadStatBarCoinImg() {
    await this.loadImageCache(this.imgStatBarCoin, this.constructor.name);
  }
}
