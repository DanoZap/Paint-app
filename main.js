const canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

let isDrawing;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const starDraw = () => {
    isDrawing = true;
    ctx.beginPath() //create new path to draw
}
const stopDraw = () => {
    isDrawing = false;
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY); //Create line according to mouse
    ctx.stroke(); //draw line with color
}

canvas.addEventListener("mousedown", starDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", drawing);