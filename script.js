
// ================================
// Ace Arcade v2 - Core System
// ================================

// Spielerdaten laden
let player = {
    balance: Number(localStorage.getItem("balance")) || 1000,
    xp: Number(localStorage.getItem("xp")) || 0,
    level: Number(localStorage.getItem("level")) || 1
};

// Speichern
function savePlayer() {
    localStorage.setItem("balance", player.balance);
    localStorage.setItem("xp", player.xp);
    localStorage.setItem("level", player.level);
}

// Anzeige aktualisieren
function updateUI() {

    document.getElementById("balance").textContent = player.balance;
    document.getElementById("homeBalance").textContent = player.balance;

    document.getElementById("level").textContent = player.level;
    document.getElementById("homeLevel").textContent = player.level;

    let currentXP = player.xp % 500;

    document.getElementById("xpText").textContent =
        currentXP + " / 500 XP";

    document.getElementById("xpFill").style.width =
        (currentXP / 500 * 100) + "%";

}

// XP hinzufügen
function addXP(amount){

    player.xp += amount;

    while(player.xp >= player.level * 500){

        player.level++;

    }

    savePlayer();
    updateUI();

}

// Coins hinzufügen
function addCoins(amount){

    player.balance += amount;

    if(player.balance < 0)
        player.balance = 0;

    savePlayer();
    updateUI();

}

// Tabs wechseln
function openTab(tab){

    document.querySelectorAll(".tab").forEach(t=>{

        t.classList.remove("active");

    });

    document.getElementById(tab).classList.add("active");

}

// Daily Reward

const rewardBtn = document.getElementById("dailyButton");

if(rewardBtn){

    rewardBtn.addEventListener("click",()=>{

        let last =
        Number(localStorage.getItem("dailyReward")) || 0;

        let now = Date.now();

        if(now-last >= 86400000){

            addCoins(250);
            addXP(100);

            localStorage.setItem("dailyReward",now);

            alert("🎉 Daily Reward erhalten!\n+250 Coins\n+100 XP");

        }else{

            let h = Math.ceil(
            (86400000-(now-last))/3600000);

            alert("⏳ Daily Reward wieder in ca. "+h+" Stunden.");

        }

    });

}

// Beim Start

updateUI();
