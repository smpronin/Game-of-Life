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
  maxWidth: 400
}

let mouse = {
  click: {
    x: null,
    y: null,
    handled: true
  },
  x: null,
  y: null,
  down: false,
  moved: false
}

let game = {
  started: false,
  frameDuration: 500,
  frameStartTime: Date.now(),
  stepRequest: false
}

// console.log(game.frameStartTime);

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
  ctx.fillStyle = color;
  ctx.strokeStyle = 'blue';
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

let brick = [];
let brickinit = {
  rowCount: 30,
  lineCount: 30,
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

  // Выставление первоначальных условий
  if (game.started == false) {

    if (mouse.click.handled == false) {
      let r = Math.floor(mouse.click.x / brickinit.width);
      let l = Math.floor(mouse.click.y / brickinit.height);
      brick[r][l].alive == true ? brick[r][l].alive = false : brick[r][l].alive = true;
      mouse.click.handled = true;
    }

    if (mouse.down == true && mouse.moved == true) {
      let r = Math.floor(mouse.x / brickinit.width);
      let l = Math.floor(mouse.y / brickinit.height);
      brick[r][l].alive = true;
      mouse.moved = false;
    }
    if (mouse.moved == true) {
      mouse.moved = false
    }

  }

  // Расчёт времени кадра
  if (Date.now() - game.frameStartTime >= game.frameDuration) {
    game.stepRequest = true;
    game.frameStartTime = Date.now();
  }

  if (game.started == true) {
    mouse.click.handled = true;
  }

  // Подсчёт количества соседей у каждой клетки
  if (game.stepRequest == true) {

    game.stepRequest = false;

    for (let r = 0; r < brickinit.rowCount; r++) {
      for (let l = 0; l < brickinit.lineCount; l++) {
        brick[r][l].neighborCount = 0;

        /* if (r - 1 >= 0 && l - 1 >= 0) {
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
        } */

        let R_1 = r - 1;
        let R1 = r + 1
        let L_1 = l - 1;
        let L1 = l + 1;

        if (R_1 == -1) { R_1 = brickinit.rowCount - 1 }
        if (R1 == brickinit.rowCount) { R1 = 0 }
        if (L_1 == -1) { L_1 = brickinit.lineCount - 1 }
        if (L1 == brickinit.rowCount) { L1 = 0 }

        if (brick[R_1][L_1].alive == true) { brick[r][l].neighborCount++ }
        if (brick[r][L_1].alive == true) { brick[r][l].neighborCount++ }
        if (brick[R1][L_1].alive == true) { brick[r][l].neighborCount++ }
        if (brick[R_1][l].alive == true) { brick[r][l].neighborCount++ }
        if (brick[R1][l].alive == true) { brick[r][l].neighborCount++ }
        if (brick[R_1][L1].alive == true) { brick[r][l].neighborCount++ }
        if (brick[r][L1].alive == true) { brick[r][l].neighborCount++ }
        if (brick[R1][L1].alive == true) { brick[r][l].neighborCount++ }


      }
    }

    // Просчёт логики игры
    if (game.started == true) {

      for (let r = 0; r < brickinit.rowCount; r++) {
        for (let l = 0; l < brickinit.lineCount; l++) {
          if (brick[r][l].alive == false && brick[r][l].neighborCount == 3) {
            brick[r][l].changeState = true
            // console.log('1', r, l, brick[r][l].neighborCount);
          }
          if (brick[r][l].alive == true && (brick[r][l].neighborCount == 3 || brick[r][l].neighborCount == 2)) {
            brick[r][l].changeState = false
            // console.log('2', r, l, brick[r][l].neighborCount);
          }
          if (brick[r][l].alive == true && (brick[r][l].neighborCount != 3 && brick[r][l].neighborCount != 2)) {
            brick[r][l].changeState = true
            // console.log('3', r, l, brick[r][l].neighborCount);
          }
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
    }

    // console.log({ brick });
  }

  // Отрисовка игры и интерфейса
  for (let r = 0; r < brickinit.rowCount; r++) {
    for (let l = 0; l < brickinit.lineCount; l++) {
      brick[r][l].alive == true ? brick[r][l].color = brickinit.color.alive : brick[r][l].color = brickinit.color.dead;
      brick[r][l].draw(brick[r][l].color);
    }
  }

  if (game.started == false) {
    drawText('Select Cells and press Space to Start', textStyle);
  }

  requestAnimationFrame(draw);

}

draw();