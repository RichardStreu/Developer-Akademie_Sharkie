import { World } from "./classes/world.class.js";

import { Keyboard } from "./classes/keyboard.class.js";

import { shootBubble } from "./classes/sharky.action.movement.js";
window.shootBubble = shootBubble;

import { letSharkySleep } from "./classes/sharky.action.movement.js";

import { showSubMenu, toggleFullscreen, isFullscreen } from "./settings.js";
window.showSubMenu = showSubMenu;
window.toggleFullscreen = toggleFullscreen;

import { playSfxSound, initFirstSound, muteUnmuteSound, stopSound, stopAllLoopSounds } from "./sound.js";
window.playSfxSound = playSfxSound;
window.initFirstSound = initFirstSound;
window.muteUnmuteSound = muteUnmuteSound;
window.stopSound = stopSound;
window.stopAllLoopSounds = stopAllLoopSounds;

export let moveObjRatio = 1;
export let staticObjRatio = 0.8;
export let canvasWidth = 853;
export let canvasHeight = 480;
export let enemyStartX = 200;
export let enemyStartDistX = 2400;
export let enemyStartY = 0;
export let enemyEndY = 460;
export let keyboard = new Keyboard();
export let imgCachesObject = {};
export let areImgCachesReady = false;
export let loadedCachsArray = [];
let isControlScreenVisible = false;
let isControlFirstShown = false;
let isImprintVisible = false;
let isImprintSliding = false;
let canvas;
let world;

export function showHideControlScreen() {
  removeButtonPulse();
  !isControlScreenVisible
    ? (document.getElementById("controlScreen").classList.remove("transformControlScreen"),
      document.getElementById("controlButtonImg").setAttribute("src", "./assets/img/arrow-up.png"),
      (isControlScreenVisible = true))
    : (document.getElementById("controlScreen").classList.add("transformControlScreen"),
      document.getElementById("controlButtonImg").setAttribute("src", "./assets/img/menu.png"),
      (isControlScreenVisible = false));
  document.getElementById("controlButton").blur();
  Array.from(document.querySelectorAll(".homeBtn")).forEach((btn) => btn.blur());
}
window.showHideControlScreen = showHideControlScreen;

function removeButtonPulse() {
  if (!isControlFirstShown) document.getElementById("controlButton").classList.remove("buttonPulse"), (isControlFirstShown = true);
}

function showImprint() {
  isImprintSliding = true;
  document.getElementById("imprint").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("imprint").classList.add("transformImprint");
    document.getElementById("arrowUp").classList.remove("opacity_zero");
    document.getElementById("arrowDown").classList.add("opacity_zero");
  }, 10);
}

function hideImprint() {
  isImprintSliding = true;
  document.getElementById("imprint").classList.remove("transformImprint");
  document.getElementById("arrowUp").classList.add("opacity_zero");
  document.getElementById("arrowDown").classList.remove("opacity_zero");
  setTimeout(() => document.getElementById("imprint").classList.add("d_none"), 610);
}

export function showHideImprint() {
  if (isImprintSliding) return;
  !isImprintVisible && !isImprintSliding ? showImprint() : hideImprint();
  isImprintVisible = !isImprintVisible;
  setTimeout(() => isImprintSliding = false, 610);
}
window.showHideImprint = showHideImprint;

function init() {
  if (world) clearGlobalGame();
  canvas = document.getElementById("canvas");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  world = new World(canvas, keyboard);
  window.world = world;
  world.sharky.setSharkyWindowEventListeners();
  if (!areImgCachesReady && world) {
    let cacheStatus = setInterval(() => {
      checkImgChachStatus();
      if (areImgCachesReady) clearInterval(cacheStatus);
    }, 200);
  }
}
window.init = init;

export function clearGlobalGame() {
  world.level1.enemies[17].clearAllEndBossIntervals();
  world.sharky.clearAllSharkyIntervals();
  world.sharky.removeSharkyWindowEventListeners();
  world.clearCheckCollisionsInterval();
  world.statBars[1].clearLifeEnergyIntertval();
  world.clearWorld();
  world = null;
}

export function checkImgChachStatus() {
  if (!areImgCachesReady) {
    if (imgCachesObject) {
      let imagesReady = Object.values(imgCachesObject).every((value) => value === true);
      if (imagesReady) areImgCachesReady = true;
    } else {
      throw new Error("Images cant be loaded");
    }
  }
}

window.addEventListener("load", () => {
  document.getElementById("startScreen").classList.remove("d_none");
  document.getElementById("loadingScreen").classList.add("d_none");
});

export function switchScreens() {
  document.getElementById("blackScreen").classList.remove("d_none");
  setTimeout(() => document.getElementById("blackScreen").classList.remove("opacity_zero"), 10);
  setTimeout(() => document.getElementById("blackScreen").classList.add("opacity_zero"), 590);
  setTimeout(() => document.getElementById("blackScreen").classList.add("d_none"), 990);
}
window.switchScreens = switchScreens;

export function startGame() {
  init();
  removeButtonPulse();
  switchScreens();
  setTimeout(() => {
    document.getElementById("startScreen").classList.add("d_none");
    document.getElementById("canvas").classList.remove("d_none");
    world.startDrawing();
    world.sharky.setSharkyMobileEventListeners();
    letSharkySleep.call(world.sharky);
    playSfxSound("backgroundRetroArcade", 500, true);
  }, 500);
}
window.startGame = startGame;

function resetGameUI() {
  document.getElementById("winScreen").classList.add("d_none");
  document.getElementById("looseScreen").classList.add("d_none");
  document.getElementById("innerLifeBar").style.width = `100%`;
  document.getElementById("endBossLifeBar").classList.add("d_none");
}

function startGameActions() {
  world.sharky.setSharkyWindowEventListeners();
  world.startDrawing();
  world.sharky.setSharkyMobileEventListeners();
  playSfxSound("backgroundRetroArcade", 500, true);
}

export function restartGame(para) {
  if (para !== "homeBtn") switchScreens();
  setTimeout(() => {
    resetGameUI();
    setTimeout(() => {
      world.sharky.x = 0;
      world.sharky.lifeEnergy = 0;
      setTimeout(() => {
        init();
        startGameActions();
      }, 10);
    }, 50);
  }, 500);
}
window.restartGame = restartGame;

export function goToStartScreen(para) {
  if (!document.getElementById("startScreen").classList.contains("d_none")) {
    showHideControlScreen();
    return;
  } else {
    Array.from(document.getElementById("display").querySelectorAll("[data-group='screens']")).forEach((screen) => {
      if (screen.id !== "startScreen" && screen.id !== "controlScreen") {
        if (para == "homeBtn") screen.classList.add("d_none");
        if (para == "winLose")
          setTimeout(() => {
            screen.classList.add("d_none");
          }, 500);
      } else {
        if (para == "homeBtn") screen.classList.remove("d_none");
        if (para == "winLose")
          setTimeout(() => {
            screen.classList.remove("d_none");
          }, 500);
      }
    });

    init();

    document.getElementById("innerLifeBar").style.width = `100%`;
    document.getElementById("endBossLifeBar").classList.add("d_none");
    if (isControlScreenVisible)
      setTimeout(() => {
        showHideControlScreen();
      }, 500);
  }
}
window.goToStartScreen = goToStartScreen;

export function youWin() {
  document.getElementById("winScreen").classList.remove("d_none");
  setTimeout(() => {
    if (isFullscreen) toggleFullscreen();
    document.getElementById("winScreen").classList.remove("opacity_zero");
  }, 20);
}

export function youLoose() {
  document.getElementById("looseScreen").classList.remove("d_none");
  setTimeout(() => {
    if (isFullscreen) toggleFullscreen();
    document.getElementById("looseScreen").classList.remove("opacity_zero");
  }, 20);
}
