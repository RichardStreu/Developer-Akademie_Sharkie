/**
 * @module "settings.js"
 */

import { showHideControlScreen } from "./script.js";

/**
 * Displays the submenu corresponding to the specified group number.
 * 
 * This function updates the UI by activating the button and showing the div
 * associated with the given group number, while deactivating and hiding
 * all other buttons and divs.
 *
 * @param {number} groupNumber - The number of the group to display.
 */
export function showSubMenu(groupNumber) {
  const controlScreen = document.getElementById("controlScreen");
  Array.from(controlScreen.querySelectorAll("button[data-group]")).forEach((button) => button.classList.remove("btnActive"));
  Array.from(controlScreen.querySelectorAll("div[data-group]")).forEach((div) => div.classList.add("d_none"));
  document.querySelector(`button[data-group="${groupNumber}"]`).classList.add("btnActive");
  document.querySelector(`div[data-group="${groupNumber}"]`).classList.remove("d_none");
}

/**
 * A boolean flag indicating whether the application is in fullscreen mode.
 * @type {boolean}
 */
export let isFullscreen = false;
document.addEventListener("fullscreenchange", () => {
  if (isFullscreen) {
    isFullscreen = false;
  }
});

/**
 * Toggles the fullscreen mode for the canvas element.
 * 
 * This function checks the current fullscreen state and either requests
 * fullscreen mode for the canvas element or exits fullscreen mode.
 * It also updates the `isFullscreen` variable accordingly and calls
 * `showHideControlScreen()` when entering fullscreen mode.
 * 
 * @function toggleFullscreen
 */
export function toggleFullscreen() {
  const canvas = document.getElementById("canvas");
  if (!isFullscreen) {
    canvas.requestFullscreen();
    showHideControlScreen();
    setTimeout(() => {
      isFullscreen = true;
    }, 250);
  } else if (isFullscreen) {
    document.exitFullscreen();
    isFullscreen = false;
  }
}
