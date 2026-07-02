// ================================
// Ace Arcade v3 Core
// ================================

// ---------- Spieler ----------

let player = JSON.parse(localStorage.getItem("acePlayer")) || {

    coins: 1000,
    xp: 0,
    level: 1

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

    savePlayer();

}

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

updateUI();
