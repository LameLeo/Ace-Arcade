// ================================
// ACE ARCADE - CRASH 3.0
// ================================

let crashRunning = false;
let multiplier = 1;
let crashPoint = 1;
let bet = 0;
let timer = null;

const display = document.getElementById("multiplierDisplay");
const history = document.getElementById("history");

let historyList = [];

// ----------------------------
// CANVAS
// ----------------------------

const canvas = document.getElementById("crashCanvas");
const ctx = canvas.getContext("2d");

let graphPoints = [];

// ----------------------------
// START
// ----------------------------

document.getElementById("startCrash").onclick = function(){

    if(crashRunning) return;

    bet = Number(document.getElementById("crashBet").value);

    if(bet <= 0){
        alert("Ungültiger Einsatz.");
        return;
    }

    if(player.coins < bet){
        alert("Nicht genügend Coins.");
        return;
    }

    addCoins(-bet);

    multiplier = 1;
    graphPoints = [];
    crashRunning = true;

    display.style.color="#00ff88";
    display.textContent="1.00x";

    // Zufälliger Crash zwischen 1.00x und 6.00x
    crashPoint = 1 + Math.random()*5;

    timer = setInterval(updateCrash,40);

};

// ----------------------------
// UPDATE
// ----------------------------

function updateCrash(){

    multiplier += 0.02;

    graphPoints.push({

    x:40+graphPoints.length*3,

    y:370-(multiplier-1)*60

});

drawGraph();

    display.textContent =
    multiplier.toFixed(2)+"x";

    if(multiplier >= crashPoint){

        clearInterval(timer);

        crashRunning=false;

        display.style.color="#ff3b30";

        display.textContent="💥 CRASH";

        addHistory(crashPoint.toFixed(2));

        recordGame(false,bet);

    }

}

// ----------------------------
// CASH OUT
// ----------------------------

document.getElementById("cashOut").onclick=function(){

    if(!crashRunning) return;

    clearInterval(timer);

    crashRunning=false;

    const win=
    Math.floor(bet*multiplier);

    addCoins(win);

    addXP(20);

    recordGame(true,win);

    display.style.color="#00ff88";

    display.textContent=
    "✅ "+multiplier.toFixed(2)+"x";

    addHistory(multiplier.toFixed(2));

};

// ----------------------------
// HISTORY
// ----------------------------

function addHistory(value){

    historyList.unshift(value+"x");

    if(historyList.length>10)
        historyList.pop();

    history.innerHTML="";

    historyList.forEach(v=>{

        const div=document.createElement("div");

        div.className="historyItem";

        div.textContent=v;

        history.appendChild(div);

    });

}

// ----------------------------
// KURVE ZEICHNEN
// ----------------------------

function drawGraph(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Hintergrund
    ctx.fillStyle="#111827";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Raster
    ctx.strokeStyle="#202938";
    ctx.lineWidth=1;

    for(let x=0;x<canvas.width;x+=50){

        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();

    }

    for(let y=0;y<canvas.height;y+=50){

        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();

    }

    // Kurve

    if(graphPoints.length<2)
        return;

    ctx.beginPath();

ctx.strokeStyle="#00ff88";
ctx.lineWidth=4;

ctx.shadowColor="#00ff88";
ctx.shadowBlur=18;

ctx.moveTo(graphPoints[0].x, graphPoints[0].y);

for(let i=1;i<graphPoints.length-1;i++){

    const xc=(graphPoints[i].x+graphPoints[i+1].x)/2;
    const yc=(graphPoints[i].y+graphPoints[i+1].y)/2;

    ctx.quadraticCurveTo(
        graphPoints[i].x,
        graphPoints[i].y,
        xc,
        yc
    );

}

ctx.stroke();

ctx.shadowBlur=0;

    // Punkt an der Spitze

    const last=graphPoints[graphPoints.length-1];

    ctx.beginPath();

ctx.shadowColor="#00ff88";
ctx.shadowBlur=25;

ctx.arc(last.x,last.y,8,0,Math.PI*2);

ctx.fillStyle="#00ff88";
ctx.fill();

ctx.shadowBlur=0;

}
