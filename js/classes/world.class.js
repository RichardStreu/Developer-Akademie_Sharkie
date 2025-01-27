/**
 * @module "world.class.js"
 */

import { Sharky } from "./sharky.class.js";
import { EndBoss } from "./endboss.class.js";
import { Level1 } from "./level1.class.js";
import { StatusBarLife } from "./statusBar-life.class.js";
import { StatusBarCoin } from "./statusBar-coin.class.js";
import { StatusBarPoison } from "./statusBar-poison.class.js";

export class World {
  /**
   * Creates an instance of the World class.
   * 
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element where the world will be drawn.
   * @param {Object} keyboard - The keyboard input handler.
   * 
   * @property {Sharky} sharky - The main character of the game.
   * @property {Level1} level1 - The first level of the game.
   * @property {Array} landscape - The landscape elements of the level.
   * @property {Array} enemies - The enemies present in the level.
   * @property {Array} statBars - The status bars for coins, life, and poison.
   * @property {Array} bubbles - The bubbles in the game.
   * @property {HTMLCanvasElement} canvas - The canvas element.
   * @property {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
   * @property {number} camera_x - The x-coordinate of the camera.
   * @property {number} checkCollisionsInterval - The interval for checking collisions.
   * @property {boolean} isDrawing - Indicates whether the world is currently being drawn.
   */
  constructor(canvas, keyboard) {
    this.sharky = new Sharky();
    this.level1 = new Level1();
    this.landscape = this.level1.landscape;
    this.enemies = this.level1.enemies;
    this.statBars = [new StatusBarCoin(10, 0), new StatusBarLife(10, 40), new StatusBarPoison(10, 80)];
    this.bubbles = [];
    this.canvas;
    this.ctx;
    this.camera_x = 0;
    this.checkCollisionsInterval;
    this.isDrawing;
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.isDrawing = false;
    this.setWorld();
    this.checkCollisions();
  }

  /**
   * Sets the world context for various game elements.
   * 
   * This method assigns the current world instance to the `sharky` object,
   * specific landscape elements, enemies in level 1, and status bars.
   * 
   * - Assigns the world to `sharky`.
   * - Assigns the world to landscape elements at indices 2, 3, 4, and 5.
   * - Assigns the world to each enemy in `level1.enemies` if the enemy is an instance of `EndBoss`.
   * - Assigns the world to each status bar in `statBars` if the status bar is an instance of `StatusBarLife`.
   */
  setWorld() {
    this.sharky.world = this;
    this.landscape[2].world = this;
    this.landscape[3].world = this;
    this.landscape[4].world = this;
    this.landscape[5].world = this;
    this.level1.enemies.forEach((enemy) => {
      if (enemy instanceof EndBoss) enemy.world = this;
    });
    this.statBars.forEach((statBar) => {
      if (statBar instanceof StatusBarLife) statBar.world = this;
    });
  }

  /**
   * Clears the game world by removing all enemies, bubbles, landscape elements, and status bars.
   * Also clears the canvas.
   * 
   * @method clearWorld
   */
  clearWorld() {
    this.enemies.forEach((enemy) => {
      if (enemy.clearIntervalsAnimationMove) enemy.clearIntervalsAnimationMove();
    });
    this.bubbles = [];
    this.enemies = [];
    this.landscape = [];
    this.statBars = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Clears the interval that checks for collisions.
   * This method stops the periodic execution of the collision check function.
   */
  clearCheckCollisionsInterval() {
    clearInterval(this.checkCollisionsInterval);
  }

  /**
   * Checks for collisions between the sharky character and enemies in the level.
   * This method sets up an interval that repeatedly checks if the sharky character
   * is colliding with any enemies. If a collision is detected, it triggers the 
   * hurtSharky method on the sharky character and sets the isCurrentlyHurt flag.
   * 
   * @method
   */
  checkCollisions() {
    this.checkCollisionsInterval = setInterval(() => {
      for (let index = 0; index < this.level1.enemies.length; index++) {
        const enemy = this.level1.enemies[index];
        if (this.sharky.isColliding(enemy)) {
          this.sharky.hurtSharky(enemy.constructor.name, enemy);
          if (!this.sharky.isCurrentlyHurt) this.sharky.isCurrentlyHurt = true;
          break;
        } else {
          this.sharky.isCurrentlyHurt = false;
        }
      }
    }, 100);
  }

  /**
   * Starts the drawing process by setting the isDrawing flag to true
   * and initiating the draw method.
   */
  startDrawing() {
    this.isDrawing = true;
    this.draw();
  }

  /**
   * Stops the drawing process by setting the isDrawing flag to false.
   */
  stopDrawing() {
    this.isDrawing = false;
  }

  /**
   * Draws the game world on the canvas.
   * Clears the canvas, translates the context based on the camera position,
   * and adds various objects (landscape, sharky, enemies, bubbles, stat bars) to the map.
   * Continuously calls itself using requestAnimationFrame for smooth animation.
   * 
   * @method
   * @memberof World
   * @returns {void}
   */
  draw() {
    if (!this.isDrawing) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.landscape);
    if (this.sharky) this.addToMap(this.sharky);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.bubbles);
    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statBars);
    this.checkBubblePosition();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Checks the position of each bubble in the `bubbles` array.
   * If a bubble's `y` coordinate is less than -40, it removes the bubble from the array.
   */
  checkBubblePosition() {
    this.bubbles.forEach((bubble, index) => {
      if (bubble.y < -40) this.bubbles.splice(index, 1);
    });
  }

  /**
   * Adds an object to the map by drawing it on the canvas context.
   * If the object has the `otherDirection` property set to true, 
   * it flips the image before drawing and flips it back after drawing.
   *
   * @param {Object} object - The object to be added to the map.
   * @param {boolean} object.otherDirection - Indicates if the object should be flipped.
   * @param {function} object.draw - Function to draw the object on the canvas context.
   * @param {function} object.drawFrame - Function to draw the object's frame on the canvas context.
   * @param {CanvasRenderingContext2D} this.ctx - The canvas rendering context where the object will be drawn.
   */
  addToMap(object) {
    if (object.otherDirection) this.flipImage(object);
    object.draw(this.ctx);
    object.drawFrame(this.ctx);
    if (object.otherDirection) this.flipImageBack(object);
  }

  /**
   * Flips the given object's image horizontally.
   *
   * This method saves the current state of the canvas context, translates the context to the width of the object,
   * scales the context horizontally by -1 to flip the image, and then adjusts the object's x-coordinate.
   *
   * @param {Object} object - The object whose image is to be flipped.
   * @param {number} object.width - The width of the object.
   * @param {number} object.x - The x-coordinate of the object, which will be adjusted.
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  /**
   * Flips the image of the given object back to its original orientation.
   * 
   * @param {Object} object - The object whose image is to be flipped back.
   * @param {number} object.x - The x-coordinate of the object.
   */
  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  /**
   * Adds an array of objects to the map.
   * 
   * @param {Array} arry - The array of objects to be added to the map.
   */
  addObjectsToMap(arry) {
    arry.forEach((element) => {
      this.addToMap(element);
    });
  }
}
