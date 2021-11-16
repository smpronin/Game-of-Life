document.addEventListener('click', clickHandler, false);
document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener('keyup', keyUpHandler, false);

function clickHandler(e) {

    click.x = e.x;
    click.y = e.y;
    click.handled = false;

}

function keyDownHandler(e) {
    // console.log(e);
    if (e.code == 'Space') {
        game.started == true ? game.started = false : game.started = true;
    }

    if (e.code == 'ArrowRight') {
        game.stepRequest = true;
    }
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