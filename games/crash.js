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
