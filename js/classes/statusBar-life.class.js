import { StatusBar } from "./statusBar.class.js";

export class StatusBarLife extends StatusBar {
  imgArrayStatusBar = [
    "../../assets/img/4. Marcadores/green/Life/0_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/20_  copia 4.png",
    "../../assets/img/4. Marcadores/green/Life/40_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/60_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/80_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/100_  copia 2.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImgArrayStatBar();
  }

}
