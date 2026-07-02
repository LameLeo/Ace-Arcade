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
