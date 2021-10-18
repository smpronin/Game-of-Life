'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

console.log(canvas);

class Cell {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.alive = false;
    this.color = null;
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
  rowNo: 10,
  lineNo: 10,
  width: null,
  height: null,
  color: {
    dead: 'black',
    alive: 'white'
  }
};

brickinit.width = Math.floor(width / brickinit.rowNo);
brickinit.height = Math.floor(height / brickinit.lineNo);


for (let r = 0; r < brickinit.rowNo; r++) {
  brick[r] = [];
  for (let l = 0; l < brickinit.lineNo; l++) {
    brick[r][l] = new Cell(brickinit.width * r, brickinit.height * l, brickinit.width, brickinit.height);
    /* if(brick[r][l].alive==true) {
      brick[r][l].color = brickinit.color.alive;
    } else {
      brick[r][l] = brickinit.color.dead
    } */
    // brick[r][l].alive==true ? brick[r][l].color = brickinit.color.alive : brick[r][l].color = brickinit.color.dead;
    // brick[r][l].draw(brick[r][l].color);
  }
}

// console.log({ brickinit });
// console.log(brickinit.color.alive);
/*
let testBrick = new Cell(0,0,brickinit.width, brickinit.height);
console.log(testBrick);
testBrick.draw();
console.log({Cell}); */
// console.log(brick);
// console.log({document});
// console.log({window})

// brick[9][0].alive = true;

function draw() {

  for (let r = 0; r < brickinit.rowNo; r++) {
    for (let l = 0; l < brickinit.lineNo; l++) {
      brick[r][l].alive == true ? brick[r][l].color = brickinit.color.alive : brick[r][l].color = brickinit.color.dead;
      brick[r][l].draw(brick[r][l].color);
    }
  }

requestAnimationFrame(draw);

}

draw();