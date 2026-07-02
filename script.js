// ===================================
// ACE ARCADE v2
// Modul 1 - Core System
// ===================================

// ---------- Spielerdaten ----------
let player = {
    coins: Number(localStorage.getItem("aa_coins")) || 1000,
    xp: Number(localStorage.getItem("aa_xp")) || 0
};

// ---------- Speichern ----------
function savePlayer() {
    localStorage.setItem("aa_coins", player.coins);
    localStorage.setItem("aa_xp", player.xp);
}

// ---------- Level berechnen ----------
function getLevel() {
    return Math.floor(player.xp / 500) + 1;
}

// ---------- Anzeige ----------
function updateUI() {

    document.getElementById("coins").textContent = player.coins;
    document.getElementById("walletCoins").textContent = player.coins;

    const level = getLevel();

    document.getElementById("level").textContent = level;
    document.getElementById("walletLevel").textContent = level;
}

// ---------- Coins ----------
function addCoins(amount){

    player.coins += amount;

    if(player.coins < 0)
        player.coins = 0;

    savePlayer();
    updateUI();

}

// ---------- XP ----------
function addXP(amount){

    player.xp += amount;

    savePlayer();
    updateUI();

}

// ---------- Seiten wechseln ----------
function showPage(page){

    document.querySelectorAll(".page").forEach(p=>{

        p.classList.remove("active");

    });

    document.getElementById(page).classList.add("active");

}

// ---------- Daily Reward ----------
const dailyBtn = document.getElementById("dailyRewardBtn");

if(dailyBtn){

dailyBtn.onclick = function(){

const last =
Number(localStorage.getItem("aa_daily")) || 0;

const now = Date.now();

const cooldown = 24*60*60*1000;

if(now-last >= cooldown){

addCoins(250);
addXP(100);

localStorage.setItem("aa_daily",now);

alert("🎉 Daily Reward!\n\n+250 Coins\n+100 XP");

}else{

const left = cooldown-(now-last);

const hours = Math.floor(left/3600000);
const mins = Math.floor((left%3600000)/60000);

alert("⏳ Bitte warte noch\n"+hours+"h "+mins+"min");

}

}

}

// ---------- Start ----------
updateUI();

// ===================================
// CRASH 2.0
// ===================================

let crashRunning = false;
let crashMultiplier = 1.00;
let crashTimer = null;
let currentBet = 0;
let cashedOut = false;

let crashHistory = [];

const startBtn = document.getElementById("startCrash");
const cashBtn = document.getElementById("cashOut");

if(startBtn){

startBtn.onclick = function(){

    if(crashRunning) return;

    currentBet = Number(document.getElementById("crashBet").value);

    if(currentBet <= 0){
        alert("Ungültiger Einsatz.");
        return;
    }

    if(player.coins < currentBet){
        alert("Nicht genügend Coins.");
        return;
    }

    addCoins(-currentBet);

    crashRunning = true;
    cashedOut = false;
    crashMultiplier = 1;

    document.getElementById("multiplier").textContent = "1.00x";

    let crashPoint = 1 + Math.random()*5;

    crashTimer = setInterval(function(){

        crashMultiplier += 0.03;

        document.getElementById("multiplier").textContent =
        crashMultiplier.toFixed(2)+"x";

        if(crashMultiplier >= crashPoint){

            clearInterval(crashTimer);

            crashRunning = false;

            document.getElementById("multiplier").textContent =
            "💥 CRASH";

            addHistory(crashPoint.toFixed(2));

        }

    },60);

}

}

if(cashBtn){

cashBtn.onclick=function(){

    if(!crashRunning) return;

    if(cashedOut) return;

    cashedOut = true;

    clearInterval(crashTimer);

    crashRunning=false;

    let win =
    Math.floor(currentBet*crashMultiplier);

    addCoins(win);

    addXP(15);

    document.getElementById("multiplier").textContent =
    "✅ "+crashMultiplier.toFixed(2)+"x";

    addHistory(crashMultiplier.toFixed(2));

}

}

function addHistory(value){

crashHistory.unshift(value+"x");

if(crashHistory.length>10)
crashHistory.pop();

let html="";

crashHistory.forEach(v=>{

html += "<div class='historyItem'>"+v+"</div>";

});

document.getElementById("history").innerHTML = html;

}

// ===================================
// MINES 2.0
// ===================================

let minesRunning = false;
let mineBombs = [];
let openedTiles = [];
let mineBet = 0;
let mineMultiplier = 1;

const grid = document.getElementById("mineGrid");

function updateMineInfo() {
    document.getElementById("mineMultiplier").textContent =
        mineMultiplier.toFixed(2) + "x";
}

function createGrid() {

    grid.innerHTML = "";

    for (let i = 0; i < 25; i++) {

        const tile = document.createElement("div");

        tile.className = "mineTile";

        tile.dataset.index = i;

        tile.onclick = () => clickMine(i, tile);

        grid.appendChild(tile);

    }

}

function startMinesGame() {

    if (minesRunning) return;

    mineBet = Number(document.getElementById("minesBet").value);

    let bombCount = Number(document.getElementById("bombCount").value);

    if (bombCount < 1) bombCount = 1;
    if (bombCount > 24) bombCount = 24;

    document.getElementById("bombText").textContent = bombCount;
    document.getElementById("gemText").textContent = 25 - bombCount;

    if (player.coins < mineBet) {

        alert("Nicht genügend Coins!");

        return;

    }

    addCoins(-mineBet);

    minesRunning = true;

    mineMultiplier = 1.00;

    openedTiles = [];

    mineBombs = [];

    while (mineBombs.length < bombCount) {

        let r = Math.floor(Math.random() * 25);

        if (!mineBombs.includes(r))
            mineBombs.push(r);

    }

    updateMineInfo();

    createGrid();

}

function clickMine(index, tile) {

    if (!minesRunning) return;

    if (openedTiles.includes(index)) return;

    openedTiles.push(index);

    if (mineBombs.includes(index)) {

        tile.classList.add("bomb");

        tile.textContent = "💣";

        minesRunning = false;

        alert("💥 Boom! Runde verloren.");

        revealBombs();

        return;

    }

    tile.classList.add("safe");

    tile.textContent = "💎";

    mineMultiplier += 0.20;

    updateMineInfo();

}

function revealBombs() {

    document.querySelectorAll(".mineTile").forEach((tile) => {

        let i = Number(tile.dataset.index);

        if (mineBombs.includes(i)) {

            tile.classList.add("bomb");

            tile.textContent = "💣";

        }

    });

}

document.getElementById("startMines").onclick = startMinesGame;

document.getElementById("cashOutMines").onclick = function () {

    if (!minesRunning) return;

    minesRunning = false;

    let win = Math.floor(mineBet * mineMultiplier);

    addCoins(win);

    addXP(20);

    alert("🎉 Cash Out!\n+" + win + " Coins");

};
