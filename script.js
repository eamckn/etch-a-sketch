// script.js

// External JavaScript for etch-a-sketch


// Shorthand constant for etch-a-sketch background rgb values
const BLANK = "rgb(255, 248, 220)";


// Initialize DOM Node selectors
const container = document.querySelector("#container");
const resizeButton = document.querySelector("#resize");
const eraseButton = document.querySelector("#eraser");
const clearButton = document.querySelector("#clear");
const rainbowButton = document.querySelector("#rainbow");
const opacityButton = document.querySelector("#opacity");


// Get width and height defined in CSS for etch-a-sketch div dimensions
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;


// Initialize click event listeners for each button
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
eraseButton.addEventListener('click', erase);
clearButton.addEventListener('click', resetGrid);
rainbowButton.addEventListener('click', randomizeColor);
opacityButton.addEventListener('click', makeGradient);


// Build the starting etch-a-sketch upon page laod
let initialGridSize = 16;
buildGrid(initialGridSize);


// Functions
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
    event.target.style.opacity = 1;
}

function drawEmpty(event) {
    event.target.style.backgroundColor = BLANK;
    event.target.style.opacity = 1;
}
 
function buildGrid(gridSize) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {

            const newDiv = document.createElement("div");
            const newDivWidth = containerWidth/gridSize;
            const newDivHeight = containerHeight/gridSize;

            newDiv.style.width = `${newDivWidth}px`;
            newDiv.style.height = `${newDivHeight}px`;

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
        square.style.backgroundColor = BLANK;
        square.style.opacity = 1;
        if (eraseButton.classList.contains("clicked")) {
                square.removeEventListener('mouseover', drawEmpty);
                square.addEventListener('mouseover', drawBlack);
            }
        }
    resetEraser();
}

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

// opacity function

// every time mouseover is fired, increase opacity by 10%
function makeGradient() {

    let etchList = document.querySelectorAll(".etch");

    for (let square of etchList) {
        let opacity = .1;
        square.addEventListener('mouseover', drawGradient(opacity));
    }
    if (eraseButton.classList.contains("clicked")) {
        resetEraser();
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