'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

let textStyle = {
  x: 0,
  y: 20,
  font: '20px serif',
  fillStyle: '#35A1FF',
  maxWidth: 200
}

let click = {
  x: null,
  y: null,
  handled: true
}

let game = {
  started: false,
  frameDuration: 1000,
  frameStartTime: null
}

class Cell {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = null;
    this.alive = false;
    this.neighborCount = 0;
    this.changeState = false;
  }
}

Cell.prototype.draw = function (color) {
  ctx.beginPath();
  ctx.fillStyle = color; //'black';
  ctx.strokeStyle = 'blue';
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

let brick = [];
let brickinit = {
  rowCount: 10,
  lineCount: 10,
  width: null,
  height: null,
  color: {
    dead: 'black',
    alive: 'white'
  }
}

brickinit.width = Math.floor(canvas.width / brickinit.rowCount);
brickinit.height = Math.floor(canvas.height / brickinit.lineCount);


for (let r = 0; r < brickinit.rowCount; r++) {
  brick[r] = [];
  for (let l = 0; l < brickinit.lineCount; l++) {
    brick[r][l] = new Cell(brickinit.width * r, brickinit.height * l, brickinit.width, brickinit.height);
  }
}


function draw() {

  // console.log({brick});

  for (let r = 0; r < brickinit.rowCount; r++) {
    for (let l = 0; l < brickinit.lineCount; l++) {
      brick[r][l].neighborCount = 0;

      if (r - 1 >= 0 && l - 1 >= 0) {
        if (brick[r - 1][l - 1].alive == true) { brick[r][l].neighborCount++ }
      }
      if (l - 1 >= 0) {
        if (brick[r][l - 1].alive == true) { brick[r][l].neighborCount++ }
      }
      if (r + 1 <= brickinit.rowCount - 1 && l - 1 >= 0) {
        if (brick[r + 1][l - 1].alive == true) { brick[r][l].neighborCount++ }
      }
      if (r - 1 >= 0) {
        if (brick[r - 1][l].alive == true) { brick[r][l].neighborCount++ }
      }
      if (r + 1 <= brickinit.rowCount - 1) {
        if (brick[r + 1][l].alive == true) { brick[r][l].neighborCount++ }
      }
      if (r - 1 >= 0 && l + 1 <= brickinit.lineCount - 1) {
        if (brick[r - 1][l + 1].alive == true) { brick[r][l].neighborCount++ }
      }
      if (l + 1 <= brickinit.lineCount - 1) {
        if (brick[r][l + 1].alive == true) { brick[r][l].neighborCount++ }
      }
      if (r + 1 <= brickinit.rowCount - 1 && l + 1 <= brickinit.lineCount - 1) {
        if (brick[r + 1][l + 1].alive == true) { brick[r][l].neighborCount++ }
      }

    }
  }

  for (let r = 0; r < brickinit.rowCount; r++) {
    for (let l = 0; l < brickinit.lineCount; l++) {
      brick[r][l].alive == true ? brick[r][l].color = brickinit.color.alive : brick[r][l].color = brickinit.color.dead;
      brick[r][l].draw(brick[r][l].color);
    }
  }

  if (game.started == true) {

    for (let r = 0; r < brickinit.rowCount; r++) {
      for (let l = 0; l < brickinit.lineCount; l++) {
        if (brick[r][l].alive == false && brick[r][l].neighborCount == 3) { brick[r][l].changeState = true }
        if (brick[r][l].alive == true && brick[r][l].neighborCount == 3) { brick[r][l].changeState = false }
        else { brick[r][l].changeState = true }
      }
    }

    for (let r = 0; r < brickinit.rowCount; r++) {
      for (let l = 0; l < brickinit.lineCount; l++) {
        if (brick[r][l].changeState == true) {
          brick[r][l].alive == true ? brick[r][l].alive = false : brick[r][l].alive = true;
          brick[r][l].changeState = false;
        }
      }
    }

    // sleep(1000);

  } else {

    if (click.handled == false) {
      let r = Math.floor(click.x / brickinit.width);
      let l = Math.floor(click.y / brickinit.height);
      brick[r][l].alive == true ? brick[r][l].alive = false : brick[r][l].alive = true;
      click.handled = true;
    }

    drawText('Press Space', textStyle);
  }

  requestAnimationFrame(draw);

}

draw();