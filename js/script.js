/**
 * @module "script.js"
 */

import { World } from "./classes/world.class.js";
import { Keyboard } from "./classes/keyboard.class.js";
import { letSharkySleep } from "./classes/sharky.action.movement.js";
import { shootBubble } from "./classes/sharky.action.movement.js";
window.shootBubble = shootBubble;
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

/**
 * Toggles the visibility of the control screen and updates the control button image accordingly.
 * 
 * This function performs the following actions:
 * - Removes the pulse effect from the button.
 * - Toggles the visibility of the control screen by adding/removing the "transformControlScreen" class.
 * - Updates the control button image source based on the visibility state.
 * - Blurs the control button and all elements with the class "homeBtn".
 * 
 * @global {boolean} isControlScreenVisible - A global variable that tracks the visibility state of the control screen.
 */
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

/**
 * Removes the pulse effect from the control button.
 */
function removeButtonPulse() {
  if (!isControlFirstShown) document.getElementById("controlButton").classList.remove("buttonPulse"), (isControlFirstShown = true);
}

/**
 * Toggles the visibility of the imprint screen.
 */
function showImprint() {
  isImprintSliding = true;
  document.getElementById("imprint").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("imprint").classList.add("transformImprint");
    document.getElementById("arrowUp").classList.remove("opacity_zero");
    document.getElementById("arrowDown").classList.add("opacity_zero");
  }, 10);
}

/**
 * Hides the imprint screen.
 */
function hideImprint() {
  isImprintSliding = true;
  document.getElementById("imprint").classList.remove("transformImprint");
  document.getElementById("arrowUp").classList.add("opacity_zero");
  document.getElementById("arrowDown").classList.remove("opacity_zero");
  setTimeout(() => document.getElementById("imprint").classList.add("d_none"), 610);
}

/**
 * Toggles the visibility of the imprint section.
 * If the imprint is currently sliding, the function will return early.
 * Depending on the current visibility state, it will either show or hide the imprint.
 * The visibility state is then toggled.
 * A timeout is set to reset the sliding state after 610 milliseconds.
 *
 * @global {boolean} isImprintSliding - Indicates if the imprint is currently sliding.
 * @global {boolean} isImprintVisible - Indicates if the imprint is currently visible.
 * @function showImprint - Function to show the imprint.
 * @function hideImprint - Function to hide the imprint.
 */
export function showHideImprint() {
  if (isImprintSliding) return;
  !isImprintVisible && !isImprintSliding ? showImprint() : hideImprint();
  isImprintVisible = !isImprintVisible;
  setTimeout(() => (isImprintSliding = false), 610);
}
window.showHideImprint = showHideImprint;

/**
 * Initializes the game environment.
 * 
 * This function sets up the game canvas, initializes the game world, and sets event listeners for the sharky character.
 * It also checks the status of image caches and ensures they are ready before proceeding.
 * 
 * @global
 * @function init
 */
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

/**
 * Clears all global game intervals, event listeners, and resets the world object.
 * 
 * This function performs the following actions:
 * - Clears all intervals related to the end boss.
 * - Clears all intervals related to the sharky character.
 * - Removes all event listeners associated with the sharky character.
 * - Clears the interval responsible for checking collisions.
 * - Clears the life energy interval of the second status bar.
 * - Clears the world object and sets it to null.
 */
export function clearGlobalGame() {
  world.level1.enemies[17].clearAllEndBossIntervals();
  world.sharky.clearAllSharkyIntervals();
  world.sharky.removeSharkyWindowEventListeners();
  world.clearCheckCollisionsInterval();
  world.statBars[1].clearLifeEnergyIntertval();
  world.clearWorld();
  world = null;
}

/**
 * Checks the status of image caches and updates the readiness flag.
 * 
 * This function verifies if all image caches are ready. If the image caches
 * object is defined, it checks if every value in the object is `true`, indicating
 * that all images are ready. If so, it sets the `areImgCachesReady` flag to `true`.
 * If the image caches object is not defined, it throws an error indicating that
 * images can't be loaded.
 * 
 * @throws {Error} If the image caches object is not defined.
 */
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
/**
 * hides the loading screen and shows the start screen if the window and all data are loaded.
 */
window.addEventListener("load", () => {
  document.getElementById("startScreen").classList.remove("d_none");
  document.getElementById("loadingScreen").classList.add("d_none");
});


/**
 * Switches screens by manipulating the visibility and opacity of the element with the ID "blackScreen".
 * 
 * This function performs the following steps:
 * 1. Removes the "d_none" class from the element to make it visible.
 * 2. After 10 milliseconds, removes the "opacity_zero" class to make the element opaque.
 * 3. After 590 milliseconds, adds the "opacity_zero" class to make the element transparent.
 * 4. After 990 milliseconds, adds the "d_none" class to hide the element.
 */
export function switchScreens() {
  document.getElementById("blackScreen").classList.remove("d_none");
  setTimeout(() => document.getElementById("blackScreen").classList.remove("opacity_zero"), 10);
  setTimeout(() => document.getElementById("blackScreen").classList.add("opacity_zero"), 590);
  setTimeout(() => document.getElementById("blackScreen").classList.add("d_none"), 990);
}
window.switchScreens = switchScreens;

/**
 * Starts the game by initializing the world, removing button pulse, switching screens,
 * and setting up the game actions and background sound.
 * 
 * - Resets the sharky's position and life energy if the world object exists.
 * - Initializes the game.
 * - Removes the pulse effect from the start button.
 * - Switches the screens from the start screen to the game canvas.
 * - Starts the game actions after a delay of 500ms.
 * - Puts sharky to sleep.
 * - Plays the background retro arcade sound.
 */
export function startGame() {
  if (world) world.sharky.x = 0, world.sharky.lifeEnergy = 0;
  init();
  removeButtonPulse();
  switchScreens();
  setTimeout(() => {
    document.getElementById("startScreen").classList.add("d_none");
    document.getElementById("canvas").classList.remove("d_none");
    startGameActions();
    letSharkySleep.call(world.sharky);
    playSfxSound("backgroundRetroArcade", 500, true);
  }, 500);
}
window.startGame = startGame;

/**
 * Resets the game UI by hiding the win screen, loose screen, and end boss life bar.
 * Also, sets the width of the inner life bar to 100%.
 */
function resetGameUI() {
  document.getElementById("winScreen").classList.add("d_none");
  document.getElementById("looseScreen").classList.add("d_none");
  document.getElementById("endBossLifeBar").classList.add("d_none");
  document.getElementById("innerLifeBar").style.width = `100%`;
}

/**
 * Initializes and starts the game actions.
 * 
 * This function sets up the necessary event listeners for the sharky character,
 * starts the drawing process for the game world, and plays the background sound.
 * 
 * Actions performed:
 * - Sets window event listeners for sharky.
 * - Starts the drawing process for the game world.
 * - Sets mobile event listeners for sharky.
 * - Plays the background sound with a retro arcade theme.
 */
function startGameActions() {
  world.sharky.setSharkyWindowEventListeners();
  world.startDrawing();
  world.sharky.setSharkyMobileEventListeners();
  playSfxSound("backgroundRetroArcade", 500, true);
}

/**
 * Restarts the game by resetting the game UI and initializing game actions.
 * 
 * @param {string} para - A parameter to determine if the home button was pressed.
 *                        If the parameter is not "homeBtn", the screen will be switched.
 */
export function restartGame(para) {
  if (para !== "homeBtn") switchScreens();
  setTimeout(() => {
    resetGameUI();
    setTimeout(() => {
      world.sharky.x = 0;
      world.sharky.lifeEnergy = 0;
      setTimeout(() => (init(), startGameActions()), 10);
    }, 50);
  }, 500);
}
window.restartGame = restartGame;

/**
 * Navigates to the start screen and controls the visibility of other screens based on the provided parameter.
 * 
 * @param {string} para - The parameter that determines the visibility of screens. 
 *                        It can be "homeBtn" or "winLose".
 *                        - "homeBtn": Immediately shows the start screen and hides other screens.
 *                        - "winLose": Shows the start screen and hides other screens after a delay of 500ms.
 */
export function goToStartScreen(para) {
  !document.getElementById("startScreen").classList.contains("d_none")
    ? showHideControlScreen()
    : (Array.from(document.getElementById("display").querySelectorAll("[data-group='screens']")).forEach((screen) => {
        if (screen.id !== "startScreen" && screen.id !== "controlScreen") {
          if (para == "homeBtn") screen.classList.add("d_none");
          if (para == "winLose") setTimeout(() => screen.classList.add("d_none"), 500);
        } else {
          if (para == "homeBtn") screen.classList.remove("d_none");
          if (para == "winLose") setTimeout(() => screen.classList.remove("d_none"), 500);
        }
      }),
      (document.getElementById("innerLifeBar").style.width = `100%`),
      document.getElementById("endBossLifeBar").classList.add("d_none"),
      isControlScreenVisible ? setTimeout(() => showHideControlScreen(), 500) : null);
}
window.goToStartScreen = goToStartScreen;

/**
 * Displays a win or lose message by removing specific CSS classes from an element.
 *
 * @param {string} para - The ID of the HTML element to display.
 */
export function youWinOrLose(para) {
  document.getElementById(para).classList.remove("d_none");
  setTimeout(() => {
    if (isFullscreen) toggleFullscreen();
    document.getElementById(para).classList.remove("opacity_zero");
  }, 20);
}
