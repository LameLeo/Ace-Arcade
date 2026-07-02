// ================================
// Ace Arcade v3 Core
// ================================

// ---------- Spieler ----------

let player = JSON.parse(localStorage.getItem("acePlayer")) || {

    coins: 1000,
    xp: 0,
    level: 1,

    gamesPlayed:0,
    gamesWon:0,

    coinsWon:0,
    coinsLost:0,

    streak:0

    player.gamesPlayed ??= 0;
player.gamesWon ??= 0;
player.coinsWon ??= 0;
player.coinsLost ??= 0;
player.streak ??= 0;

};

// ---------- Speichern ----------

function savePlayer(){

    localStorage.setItem(
        "acePlayer",
        JSON.stringify(player)
    );

}

// ---------- Level ----------

function updateLevel(){

    player.level =
    Math.floor(player.xp/500)+1;

}

// ---------- Anzeige ----------

function updateUI(){

    updateLevel();

    const coins=document.getElementById("coins");
    const level=document.getElementById("level");

    if(coins)
        coins.textContent=player.coins;

    if(level)
        level.textContent=player.level;

    const walletCoins=document.getElementById("walletCoins");
    const walletLevel=document.getElementById("walletLevel");

    if(walletCoins)
        walletCoins.textContent=player.coins;

    if(walletLevel)
        walletLevel.textContent=player.level;

    const xpFill=document.getElementById("xpFill");
    const xpText=document.getElementById("xpText");

    const currentXP=player.xp%500;

    if(xpFill)
        xpFill.style.width=(currentXP/500*100)+"%";

    if(xpText)
        xpText.textContent=currentXP+" / 500 XP";

    const gamesPlayed=document.getElementById("gamesPlayed");
const gamesWon=document.getElementById("gamesWon");

const coinsWon=document.getElementById("coinsWon");
const coinsLost=document.getElementById("coinsLost");

const streak=document.getElementById("streakCount");

if(gamesPlayed)
gamesPlayed.textContent=player.gamesPlayed;

if(gamesWon)
gamesWon.textContent=player.gamesWon;

if(coinsWon)
coinsWon.textContent=player.coinsWon;

if(coinsLost)
coinsLost.textContent=player.coinsLost;

if(streak)
streak.textContent=player.streak+" Tage";

    savePlayer();

}

// ---------- Coins ----------

function addCoins(amount){

    player.coins+=amount;

    if(player.coins<0)
        player.coins=0;

    updateUI();

}

// ---------- XP ----------

function addXP(amount){

    player.xp+=amount;

    updateUI();

}

function recordGame(win,coins){

    player.gamesPlayed++;

    if(win){

        player.gamesWon++;
        player.coinsWon+=coins;

    }else{

        player.coinsLost+=Math.abs(coins);

    }

    updateUI();

}
// ---------- Navigation ----------

function showPage(page){

    document
    .querySelectorAll(".page")
    .forEach(p=>{

        p.classList.remove("active");

    });

    const selected=
    document.getElementById(page);

    if(selected)
        selected.classList.add("active");

}

// ---------- Start ----------

const dailyButton=document.getElementById("dailyRewardBtn");

if(dailyButton){

    dailyButton.onclick=function(){

        const last=
        Number(localStorage.getItem("dailyReward"))||0;

        const now=Date.now();

        const cooldown=24*60*60*1000;

        if(now-last>=cooldown){

            addCoins(250);

            addXP(100);

            localStorage.setItem("dailyReward",now);

            alert("🎉 Daily Reward!\n\n+250 Coins\n+100 XP");

        }else{

            const left=cooldown-(now-last);

            const hours=Math.floor(left/3600000);

            const mins=Math.floor((left%3600000)/60000);

            alert(
            "⏳ Bereits eingesammelt.\n\n"+
            hours+"h "+mins+"min verbleibend.");

        }

    };

}

updateUI();
