import { StatusBar } from "./statusBar.class.js";

export class StatusBarCoin extends StatusBar {
  imgArrayStatusBar = [
    "../../assets/img/4. Marcadores/green/Coin/0_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/20_  copia 2.png",
    "../../assets/img/4. Marcadores/green/Coin/40_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/60_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/80_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Coin/100_  copia 4.png",
  ];

  constructor() {
    super();
    this.loadImgArrayStatBar();
    this.percentage = 0;
    this.img = this.imageCache["../../assets/img/4. Marcadores/green/Coin/0_  copia 4.png"];
  }

}
