'use strict';

// document.addEventListener('click', clickHandler, false);
document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('mousedown', mouseDownHandler, false);
document.addEventListener('mouseup', mouseUpHandler, false);


/* function clickHandler(e) {
    click.x = e.x;
    click.y = e.y;
    click.handled = false;
} */

function keyDownHandler(e) {
    // console.log(e);
    if (e.code == 'Space') {
        game.started == true ? game.started = false : game.started = true;
    }

    if (e.code == 'ArrowRight') {
        game.stepRequest = true;
    }
}

function mouseMoveHandler(e) {
    // console.log(e);
    mouse.x = e.x;
    mouse.y = e.y;
    mouse.moved = true;
}

function mouseDownHandler(e) {
    // console.log(e);
    mouse.click.x = e.x;
    mouse.click.y = e.y;
    mouse.click.handled = false;
    mouse.down = true;
}

function mouseUpHandler(e) {
    // console.log(e);
    mouse.down = false;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function drawText(text, textStyle) {
    ctx.font = textStyle.font;
    ctx.fillStyle = textStyle.fillStyle;
    ctx.fillText(text, textStyle.x, textStyle.y, textStyle.maxWidth);
    // console.log({ctx});
}