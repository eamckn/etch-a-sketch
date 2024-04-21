// script.js

// External JavaScript for etch-a-sketch


// first, let's make sure we can correct create a div

// it worked!


const container = document.querySelector("#container");
const containerWidth = container.offsetWidth;
console.log(containerWidth)
const containerHeight = container.offsetHeight;
console.log(containerHeight)

for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
        const newDiv = document.createElement("div");
        const newDivWidth = containerWidth/16;
        const newDivHeight = containerHeight/16;
        newDiv.style.width = `${newDivWidth}px`;
        console.log(newDiv.style.width);
        newDiv.style.height = `${newDivHeight}px`;
        console.log(newDiv.style.height);
        //newDiv.textContent = "x"
        newDiv.className = "etch";
        newDiv.addEventListener('mouseover', function () {
            newDiv.style.backgroundColor = 'black';
        })
        container.appendChild(newDiv);
    }
}
