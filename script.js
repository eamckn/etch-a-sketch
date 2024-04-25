// script.js

// External JavaScript for etch-a-sketch

const BLANK_BACKGROUND = "rgb(255, 248, 220)";


const container = document.querySelector("#container");
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

const eraseButton = document.querySelector("#eraser");
eraseButton.addEventListener('click', erase);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', resetGrid);

let initialGridSize = 16;
buildGrid(initialGridSize);


const resizeButton = document.querySelector("#resize");
resizeButton.addEventListener('click', function () {
    let gridSize = Number(prompt("Please enter a number desgnating your desired grid width and height:"))
    while (gridSize > 99) {
        gridSize = Number(prompt("Grid sizes for 100 and above are not supported. Please enter another number:"))
    }
    while (isNaN(gridSize)) {
        gridSize = Number(prompt("ERROR: Non-number value given. Please enter a valid number:"))
    }
    removeGrid();
    buildGrid(gridSize);
})


function removeGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    if (eraseButton.classList.contains("clicked")) {
        resetEraser();
    }
}

function resetEraser() {
    eraseButton.textContent = "Erase";
    eraseButton.classList.remove("clicked");
}

function drawBlack(event) {
    event.target.style.backgroundColor = 'black';
}

function drawEmpty(event) {
    event.target.style.backgroundColor = BLANK_BACKGROUND;
}
 
function buildGrid(gridSize) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const newDiv = document.createElement("div");
            const newDivWidth = containerWidth/gridSize;
            const newDivHeight = containerHeight/gridSize;
            newDiv.style.width = `${newDivWidth}px`;
            //console.log(newDiv.style.width);
            newDiv.style.height = `${newDivHeight}px`;
            //console.log(newDiv.style.height);
            //newDiv.textContent = "x"
            newDiv.className = "etch";
            newDiv.addEventListener('mouseover', drawBlack)
            container.appendChild(newDiv);
        }
    }
}

function erase() {

    let etchList = document.querySelectorAll(".etch");

    if (eraseButton.classList.contains("clicked") === false) {
        for (let square of etchList) {
            square.removeEventListener('mouseover', drawBlack);
            square.addEventListener('mouseover', drawEmpty);
        }
        eraseButton.textContent = "Draw";
        eraseButton.classList.add("clicked");
    }
    else {
        for (let square of etchList) {
            square.removeEventListener('mouseover', drawEmpty);
            square.addEventListener('mouseover', drawBlack);
        }
        resetEraser();
    }
}

function resetGrid() {
    let etchList = document.querySelectorAll(".etch");
    for (let square of etchList) {
        square.style.backgroundColor = BLANK_BACKGROUND;
        if (eraseButton.classList.contains("clicked")) {
                square.removeEventListener('mouseover', drawEmpty);
                square.addEventListener('mouseover', drawBlack);
            }
        }
    resetEraser();
    }

const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener('click', randomizeColor);

function randomizeColor() {
    let etchList = document.querySelectorAll(".etch");
    for (let square of etchList) {

        square.removeEventListener('mouseover', drawBlack);
        square.removeEventListener('mouseover', drawEmpty);

        let randomRedValue = Math.floor(Math.random() * 255);
        let randomGreenValue = Math.floor(Math.random() * 255);
        let randomBlueValue = Math.floor(Math.random() * 255);

        square.addEventListener('mouseover', function () {
            if (square.style.backgroundColor !== "black") {
                square.style.backgroundColor = `rgb(${randomRedValue}, ${randomGreenValue}, ${randomBlueValue})`;
            }
        })
    }
    resetEraser();
}

const opacityButton = document.querySelector("#opacity");
opacityButton.addEventListener('click', makeGradient);

// opacity function

// every time mouseover is fired, increase opacity by 10%
function makeGradient() {
    //let opacity = .1;
    let etchList = document.querySelectorAll(".etch");
    for (let square of etchList) {
        let opacity = .1;
        square.addEventListener('mouseover', drawGradient(opacity));
    }
}

function drawGradient(opacity) {
    return function (event) {
        event.target.style.backgroundColor = "black";
        if (opacity <= 1) {
            event.target.style.opacity = `${opacity}`;
            opacity += .1;
        }
    }
}