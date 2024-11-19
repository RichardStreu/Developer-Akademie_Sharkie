import { StatusBar } from "./statusBar.class.js";

export class StatusBarLife extends StatusBar {
  imgArrayStatusBar = [
    "../../assets/img/4. Marcadores/green/Life/0_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/20_ copia 4.png",
    "../../assets/img/4. Marcadores/green/Life/40_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/60_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/80_  copia 3.png",
    "../../assets/img/4. Marcadores/green/Life/100_  copia 2.png",
  ];

  world;

  constructor(x, y, world) {
    super();
    this.loadImgArrayStatBar();
    this.checkImagesCacheLoaded();
    this.percentage = 100;
    this.img = this.imageCache["../../assets/img/4. Marcadores/green/Life/100_  copia 2.png"];
    this.x = x;
    this.y = y;
    this.world = world;
    this.updatePercentageStatBar(0);
    this.checkLifeEnergy();
  }

  checkLifeEnergy() {
    setInterval(() => {
      if (this.world.sharky.lifeEnergy == 100) this.img = this.imageCache["../../assets/img/4. Marcadores/green/Life/100_  copia 2.png"];
    }, 500);
  }
}
