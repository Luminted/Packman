//Ez mind csak teszt és minta

import $ from "jquery";
import test from './test.js';

console.log(test);

const viewPort = document.getElementById('view_port');
const canvasContainer = $('#canvas_container');
let canvasWidth;
let canvasHeight;

if (viewPort) {
    canvasWidth = getCanvasWidth();
    canvasHeight = getCanvasHeight();
    viewPort.width = canvasWidth;
    viewPort.height = 1000;

    const ctx = viewPort.getContext('2d');

    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(   0, 0, canvasWidth, canvasHeight);
}
else{
    canvasContainer.html('No Canvas Found!');
}

function getCanvasWidth(canvas){
    return viewPort.width;
}

function getCanvasHeight(canvas){
    return getCanvasWidth();
}