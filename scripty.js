"use strict";

window.addEventListener("DOMContentLoaded", init);

let selectedColor = "";

function init() {
    loadSVG();
    activateColorSelector();
}


function loadSVG() {
    fetch("komwboj-01.svg")
        .then(response => response.text())
        .then(svg => {
            document.querySelector("#svg-container").innerHTML = svg;
            activateSVGFields();
        });
}

function activateColorSelector() {
    const colors = document.querySelectorAll(".colors");
    colors.forEach(color => color.addEventListener("click", selectColor));

    function selectColor() {
        colors.forEach(color => (color.dataset.selected = "false"));
        selectedColor = event.target.dataset.color;
        event.target.dataset.selected = "true";
        document
            .querySelector("#selectedcolor")
            .style.setProperty("--selected-color", selectedColor);
    }
}

function activateSVGFields() {
    const svgFields = document.querySelectorAll(".st0");
    svgFields.forEach(svgField => svgField.addEventListener("click", addColor));

    let coloredFields = 0;

    function addColor() {
        if (event.target.style.fill === "") {
            coloredFields++;
        }

        event.target.style.fill = selectedColor;

        if (coloredFields === svgFields.length) {
            drawingDone();
        }
    }
}