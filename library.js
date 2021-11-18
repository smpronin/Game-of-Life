'use strict';

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('mousedown', mouseDownHandler, false);
document.addEventListener('mouseup', mouseUpHandler, false);

document.addEventListener('touchmove', touchMoveHandler, false);


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
    mouse.x = e.layerX;
    mouse.y = e.layerY;
    mouse.targetId = e.target.id;
    mouse.moved = true;
}

function mouseDownHandler(e) {
    // console.log(e);
    mouse.click.x = e.layerX;
    mouse.click.y = e.layerY;
    mouse.click.targetId = e.target.id;
    mouse.click.handled = false;
    mouse.down = true;
}

function mouseUpHandler(e) {
    // console.log(e);
    mouse.down = false;
}

function touchMoveHandler(e) {
    // console.log(e.targetTouches);
    mouse.x = e.targetTouches[0].clientX;
    mouse.y = e.targetTouches[0].clientY;
    mouse.targetId = e.target.id;
    if (coordinateIsOnCanvas(mouse.x, mouse.y) == true) {
        mouse.down = true;
        mouse.moved = true;
    }
}


function drawText(text, textStyle) {
    ctx.font = textStyle.font;
    ctx.fillStyle = textStyle.fillStyle;
    ctx.fillText(text, textStyle.x, textStyle.y/* , textStyle.maxWidth */);
}


function button1Handler() {
    game.started == true ? game.started = false : game.started = true;
}

function coordinateIsOnCanvas(x, y) {
    if (y > canvas.offsetTop && y < canvas.offsetTop + canvas.height && x > canvas.offsetLeft && x < canvas.offsetLeft + canvas.width) {
        // console.log(true, y);
        return true;
    }
    // else { console.log(false, y, canvas.offsetTop) }
    return false;
}