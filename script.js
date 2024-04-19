// script.js

// External JavaScript for etch-a-sketch

// Creating a 16 x 16 grid of divs
// for loop?

// first, let's make sure we can correct create a div

// it worked!

// okay, let's make a row of 16 and give them flex attributes

const container = document.querySelector("#container");

for (let row = 0; row < 16; row++) {
    for (let col = 0; col <16; col++) {
        const newDiv = document.createElement("div");
        newDiv.textContent = "x"
        container.appendChild(newDiv);
    }
}

