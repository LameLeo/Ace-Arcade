// ================================
// ACE ARCADE - SLOTS 1.0
// ================================

const symbols = [
    "🍒",
    "🍋",
    "🍇",
    "⭐",
    "💎",
    "7️⃣"
];

let slotRunning = false;

// ----------------------------
// SPIN
// ----------------------------

document.getElementById("spinSlots").onclick = function(){

    if(slotRunning) return;

    const bet = Number(document.getElementById("slotBet").value);

    if(bet <= 0){

        alert("Ungültiger Einsatz.");
        return;

    }

    if(player.coins < bet){

        alert("Nicht genügend Coins.");
        return;

    }

    addCoins(-bet);

    document.getElementById("slot1").className = "slot";
    document.getElementById("slot2").className = "slot";
    document.getElementById("slot3").className = "slot";

    document.getElementById("slotResult").innerHTML = "";

    slotRunning = true;

    document.getElementById("slotResult").textContent =
    "🎰 Dreht...";

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    slot1.classList.add("spinning");
    slot2.classList.add("spinning");
    slot3.classList.add("spinning");

    let spins = 0;

    const animation = setInterval(function(){

        slot1.textContent =
        symbols[Math.floor(Math.random()*symbols.length)];

        slot2.textContent =
        symbols[Math.floor(Math.random()*symbols.length)];

        slot3.textContent =
        symbols[Math.floor(Math.random()*symbols.length)];

        spins++;

        if(spins >= 25){

            clearInterval(animation);

            finishSpin(bet);

        }

    },100);

};

// ----------------------------
// ENDE
// ----------------------------

function finishSpin(bet){

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    slot1.classList.remove("spinning");
    slot2.classList.remove("spinning");
    slot3.classList.remove("spinning");

    const s1 =
    symbols[Math.floor(Math.random()*symbols.length)];

    const s2 =
    symbols[Math.floor(Math.random()*symbols.length)];

    const s3 =
    symbols[Math.floor(Math.random()*symbols.length)];

    slot1.textContent = s1;
    slot2.textContent = s2;
    slot3.textContent = s3;

    slot1.classList.remove("win","lose");
    slot2.classList.remove("win","lose");
    slot3.classList.remove("win","lose");

    if(s1===s2 && s2===s3){

        const win = bet * 5;

        addCoins(win);
        addXP(30);

        recordGame(true,win);

        slot1.classList.remove("lose");
        slot2.classList.remove("lose");
        slot3.classList.remove("lose");

        slot1.classList.add("win");
        slot2.classList.add("win");
        slot3.classList.add("win");

        document.getElementById("slotResult").textContent =
        "🎉 JACKPOT! +" + win + " Coins";

    }else{

        recordGame(false,bet);

        slot1.classList.remove("win");
        slot2.classList.remove("win");
        slot3.classList.remove("win");
        
        slot1.classList.add("lose");
        slot2.classList.add("lose");
        slot3.classList.add("lose");

        document.getElementById("slotResult").textContent =
        "❌ Leider verloren.";

    }

    slotRunning = false;

}
