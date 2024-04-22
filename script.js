// script.js

// External JavaScript for etch-a-sketch


// first, let's make sure we can correct create a div

// it worked!


const container = document.querySelector("#container");
const containerWidth = container.offsetWidth;
//console.log(containerWidth)
const containerHeight = container.offsetHeight;
//console.log(containerHeight)


const resizeButton = document.querySelector("#resize");
resizeButton.addEventListener('click', function () {
    let gridSize = Number(prompt("Please enter a number desgnating your desired grid width and height:"))
    console.log(gridSize)
    while (gridSize > 99) {
        gridSize = Number(prompt("Grid sizes for 100 and above are not supported. Please enter another number:"))
    }
    while (isNaN(gridSize)) {
        gridSize = Number(prompt("ERROR: Non-number value given. Please enter a valid number:"))
    }
    console.log(gridSize);
    removeGrid();
    buildGrid(gridSize);
})


const eraseButton = document.querySelector("#eraser");
eraseButton.addEventListener('click', erase);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', clearGrid);


let initialGridSize = 16;
buildGrid(initialGridSize);


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
            newDiv.addEventListener('mouseover', function () {
                newDiv.style.backgroundColor = 'black';
            })
            container.appendChild(newDiv);
        }
    }
}

function removeGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    if (eraseButton.classList.contains("clicked")) {
        eraseButton.textContent = "Erase";
        eraseButton.classList.remove("clicked");
    }
}

function erase() {
    if (eraseButton.classList.contains("clicked") === false) {
        let etchList = document.querySelectorAll(".etch");
        for (let square of etchList) {
            square.addEventListener('mouseover', function () {
                square.style.backgroundColor = "rgb(255, 248, 220)";
            })
        }
        eraseButton.textContent = "Draw";
        eraseButton.classList.add("clicked");
    }
    else {
        let etchList = document.querySelectorAll(".etch");
        for (let square of etchList) {
            square.addEventListener('mouseover', function () {
                square.style.backgroundColor = "black";
            })
        }
        eraseButton.textContent = "Erase";
        eraseButton.classList.remove("clicked");
    }
}

function clearGrid() {
    let etchList = document.querySelectorAll(".etch");
    for (let square of etchList) {
        square.style.backgroundColor = "rgb(255, 248, 220)";
    }
    if (eraseButton.classList.contains("clicked")) {
        for (let item of etchList) {
            item.addEventListener('mouseover', function () {
                item.style.backgroundColor = "black";
            })
        }
        eraseButton.textContent = "Erase";
        eraseButton.classList.remove("clicked");
    }
}