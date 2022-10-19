var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = 1250;
canvas.height = 700;
const canvasXCenter = canvas.width / 2;
const canvasYCenter = canvas.height / 2;
const moonColor = "#e3e3d0";
const earthColor = "#806043";
const lineColor = "#F2F3F5";
const moonRadius = 10;
const earthRadius = 40;
const orbitRadius = 120;
var orbitAngle = [
    moon = 0.00,
    earth = 0.00
];
var earthX = canvasXCenter + (Math.cos(orbitAngle[1]) * orbitRadius);
var earthY = canvasYCenter + (Math.sin(orbitAngle[1]) * orbitRadius);
var moonX = earthX + (Math.cos(orbitAngle[0]) * orbitRadius);
var moonY = earthY + (Math.sin(orbitAngle[0]) * orbitRadius);
canvas.style = "background-color: black;";


function draw() {
    drawEarth();
    drawMoon();
    
    drawLine();
    

}

function drawLine() {
    drawHLine();
    drawVLine();
}

function drawHLine() {
    context.moveTo(0, canvasYCenter);
    context.lineTo(canvas.width, canvasYCenter);
    context.strokeStyle = lineColor;
    context.stroke();
}

function drawVLine() {
    context.moveTo(canvasXCenter, 0);
    context.lineTo(canvasXCenter, canvas.height);
    context.strokeStyle = lineColor;
    context.stroke();
}

function drawEarth() {
    context.beginPath();
    context.arc(earthX, earthY, earthRadius, 0, 2 * Math.PI);
    context.fillStyle = earthColor;
    context.fill();
    context.closePath();
}
function drawMoon() {
    context.beginPath();
    context.arc(moonX, moonY, moonRadius, 0, 2 * Math.PI);
    context.fillStyle = moonColor;
    context.fill();
    context.closePath();
}


async function orbit() {
    draw();
    while (true) {
        moonX = earthX + (Math.cos(orbitAngle[0]) * orbitRadius);
        moonY = earthY + (Math.sin(orbitAngle[0]) * orbitRadius);
        earthX = canvasXCenter + (Math.cos(orbitAngle[1]) * orbitRadius);
        earthY = canvasYCenter + (Math.sin(orbitAngle[1]) * orbitRadius);
        orbitAngle[0] += 0.05;
        orbitAngle[1] += 0.05;
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        await sleep(15);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

orbit();