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
    gridSize = Number(prompt("Please enter a number desgnating your desired grid width and height:"))
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
clearButton.addEventListener('click', clearGrid);
rainbowButton.addEventListener('click', randomizeColor);
opacityButton.addEventListener('click', makeGradient);


// Build the starting etch-a-sketch upon page laod
let gridSize = 16;
buildGrid(gridSize);


// FUNCTIONS

// Remove all divs, used when resizing the board
function removeGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    // Set eraser to draw if mouse function prior to resizing was erasing
    if (eraseButton.classList.contains("clicked")) {
        resetEraser();
    }
}

function resetEraser() {
    eraseButton.textContent = "Erase";
    eraseButton.classList.remove("clicked");
}

// Make squares opaque black
function drawBlack(event) {
    event.target.style.backgroundColor = 'black';
    event.target.style.opacity = 1;
}

// Make squares same color as base blank background
function drawEmpty(event) {
    event.target.style.backgroundColor = BLANK;
    event.target.style.opacity = 1;
}

// Build grid once prior grid is cleared
function buildGrid(gridSize) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {

            const newDiv = document.createElement("div");
            // Sets width proportionally
            const newDivWidth = containerWidth/gridSize;
            newDiv.style.width = `${newDivWidth}px`;
            // Sets height proportionally
            const newDivHeight = containerHeight/gridSize;
            newDiv.style.height = `${newDivHeight}px`;

            // Add class to make DOM selecting easier
            newDiv.className = "etch";
            // Initialize draw function to be basic opaque black
            newDiv.addEventListener('mouseover', drawBlack)
            container.appendChild(newDiv);
        }
    }
}

// Change mouseover event on squares to erasing
function erase() {

    let etchList = document.querySelectorAll(".etch");

    // If we aren't yet erasing
    if (eraseButton.classList.contains("clicked") === false) {
        for (let square of etchList) {
            square.removeEventListener('mouseover', drawBlack);
            square.addEventListener('mouseover', drawEmpty);
        }
        // Communicate that we're on the erasing function
        eraseButton.textContent = "Draw";
        eraseButton.classList.add("clicked");
    }
    // If we're going back to drawing opaque black squares
    else {
        for (let square of etchList) {
            square.removeEventListener('mouseover', drawEmpty);
            square.addEventListener('mouseover', drawBlack);
        }
        // Tell eraser button to go back to pre-erasing state and function
        resetEraser();
    }
}

// TURN THIS INTO SOMETHING THAT JUST CLEARS AND REBUILDS WITH CURRENT SIZE
// THIS WILL RESET EVENT LISTENERS AND MAKE SYNCHRONICITY OF DRAW FUNCTIONS EASIER
// TO MANAGE/COMBINE
function clearGrid() {

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
    if (opacityButton.classList.contains("clicked")) {
        for (let square of etchList) {
            square.addEventListener('mouseover', drawGradient(opacity = .1));
        }
    }
}

// Make squares a random RGB value
function randomizeColor() {

    let etchList = document.querySelectorAll(".etch");

    for (let square of etchList) {

        square.removeEventListener('mouseover', drawBlack);
        square.removeEventListener('mouseover', drawEmpty);

        let randomRedValue = Math.floor(Math.random() * 255);
        let randomGreenValue = Math.floor(Math.random() * 255);
        let randomBlueValue = Math.floor(Math.random() * 255);

        square.addEventListener('mouseover', function () {
            // Prohibit interference with already drawn squares, transparent and opaque
            if (square.style.backgroundColor !== "black") {
                square.style.backgroundColor = `rgb(${randomRedValue}, ${randomGreenValue}, ${randomBlueValue})`;
            }
        })
    }
    resetEraser();
}

function makeGradient() {

    let etchList = document.querySelectorAll(".etch");

    for (let square of etchList) {
        square.removeEventListener('mouseover', drawBlack);
        square.removeEventListener('mouseover', drawEmpty);
        // Don't reset opacity on already drawn squares, transparent and opaque
        if (square.style.backgroundColor !== "black") {
            square.addEventListener('mouseover', drawGradient(opacity = .1));
        }
    }
    // Tell eraser button to go back to pre-erasing state and function if it was just used
    if (eraseButton.classList.contains("clicked")) {
        resetEraser();
    }
    if (!opacityButton.classList.contains("clicked")) {
        opacityButton.classList.add("clicked");
    }
}

// Make squares black with a 10% opacity that increased with each pass of mouseover
function drawGradient(opacity = .1) {
    return function (event) {
        event.target.style.backgroundColor = "black";
        if (opacity <= 1) {
            event.target.style.opacity = `${opacity}`;
            opacity += .1;
        }
    }
}