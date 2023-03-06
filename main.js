const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorsBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

// Global variables with Default values
let prevMouseX, prevMouseY, snapshot,
isDrawing,
selectedTool = "brush",
brushWidth = 5,
selectedColor = "000";

const canvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvasBackground(); 
})

const drawRect = (e) => {
    if (!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);        
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt((Math.pow((prevMouseX - e.offsetX), 2)) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle
    fillColor.checked ?ctx.fill() : ctx.stroke(); // fill color 
}

// const drawLine = (e) => {
//     ctx.beginPath();
//     ctx.moveTo(prevMouseX, prevMouseY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
//     ctx.lineTo(e.offsetX, e.offsetY);
//     ctx.closePath();
//     ctx.stroke();
// } // ADD SVG LINE TO SHAPES TO ADD LINE

const drawTriangle = (e) => {
    ctx.beginPath(); // Create a Triangle draw
    ctx.moveTo(prevMouseX, prevMouseY); // move triangle to mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY); // draw first line
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // bottom line of triangle
    ctx.closePath(); //closing patch of a triangle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke(); // fill color
}

const starDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath() //create new path to draw
    ctx.lineWidth = brushWidth; // line width
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const stopDraw = () => {
    isDrawing = false;
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);

    if(selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); //Create line according to mouse
        ctx.stroke(); //draw line with color
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
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

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

colorsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");        
    })
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
});


canvas.addEventListener("mousedown", starDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mousemove", drawing);