const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool")
ctx = canvas.getContext("2d");

// Global variables with Default values
let prevMouseX, prevMouseY, snapshot,
isDrawing,
selectedTool = "brush",
brushWidth = 5

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

const starDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath() //create new path to draw
    ctx.lineWidth = brushWidth; // line width
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}
const stopDraw = () => {
    isDrawing = false;
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    
    if(selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY); //Create line according to mouse
        ctx.stroke(); //draw line with color
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    }
    
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", ()=>{
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool)
    })
})

canvas.addEventListener("mousedown", starDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", drawing);