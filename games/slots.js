// ================================
// ACE ARCADE - SLOTS 1.0
// ================================

const symbols = [

    "🍒","🍒","🍒","🍒","🍒","🍒",

    "🍋","🍋","🍋","🍋","🍋",

    "🍇","🍇","🍇","🍇",

    "⭐","⭐","⭐",

    "💎","💎",

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

    slot1.className = "slot spinning";
slot2.className = "slot spinning";
slot3.className = "slot spinning";

slot1.classList.remove("win","lose");
slot2.classList.remove("win","lose");
slot3.classList.remove("win","lose");

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

    let multiplier = 0;
let message = "";
let win = false;

// ===== 3 gleiche =====

if(s1===s2 && s2===s3){

    win = true;

    switch(s1){

        case "🍒":
            multiplier = 2;
            break;

        case "🍋":
            multiplier = 3;
            break;

        case "🍇":
            multiplier = 4;
            break;

        case "⭐":
            multiplier = 6;
            break;

        case "💎":
            multiplier = 10;
            break;

        case "7️⃣":
            multiplier = 25;
            break;

    }

    message = "🎉 JACKPOT!";
}
    
// ===== 2 gleiche =====

}else if(
    s1===s2 ||
    s2===s3 ||
    s1===s3
){

    win = true;

    const pairSymbol =
        (s1===s2) ? s1 :
        (s2===s3) ? s2 :
        s1;

    switch(pairSymbol){

        case "🍒":
            multiplier = 1.2;
            break;

        case "🍋":
            multiplier = 1.4;
            break;

        case "🍇":
            multiplier = 1.8;
            break;

        case "⭐":
            multiplier = 2.5;
            break;

        case "💎":
            multiplier = 4;
            break;

        case "7️⃣":
            multiplier = 8;
            break;

        default:
            multiplier = 1.2;

    }

    message = "✨ 2 Gleiche!";

}

// ===== Auszahlung =====

if(win){

    const coins = Math.floor(bet * multiplier);

    addCoins(coins);
    addXP(20);

    recordGame(true, coins);

    slot1.className = "slot win";
    slot2.className = "slot win";
    slot3.className = "slot win";

    const result =
document.getElementById("slotResult");

result.style.color="#00ff88";

result.textContent=
message + " +" + coins + " Coins";

}else{

    recordGame(false, bet);

    slot1.className = "slot lose";
    slot2.className = "slot lose";
    slot3.className = "slot lose";

    const result =
document.getElementById("slotResult");

result.style.color="#ff3b30";

result.textContent=
"❌ Leider verloren.";

}
