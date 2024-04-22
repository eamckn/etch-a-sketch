// script.js

// External JavaScript for etch-a-sketch


// first, let's make sure we can correct create a div

// it worked!


const container = document.querySelector("#container");
const containerWidth = container.offsetWidth;
//console.log(containerWidth)
const containerHeight = container.offsetHeight;
//console.log(containerHeight)
let initialGridSize = 16;

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
}

const resizeButton = document.querySelector("#resize");

resizeButton.addEventListener('click', function () {
    let gridSize = Number(prompt("Please enter a number desgnating your desired grid width and height"))
    removeGrid();
    buildGrid(gridSize);
})

buildGrid(initialGridSize);
