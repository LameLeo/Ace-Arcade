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
let jackpot = 1000;

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
    jackpot += Math.floor(bet * 0.02);

document.getElementById("slotJackpot").textContent =
    jackpot;

    document.getElementById("slot1").className = "slot";
    document.getElementById("slot2").className = "slot";
    document.getElementById("slot3").className = "slot";

    document.getElementById("slotResult").innerHTML = "";

    slotRunning = true;

    document.getElementById("slotResult").textContent =
    "🎰 Dreht...";
    document.getElementById("slotResult").style.color = "#00ff88";

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

    const final1 =
symbols[Math.floor(Math.random()*symbols.length)];

const final2 =
symbols[Math.floor(Math.random()*symbols.length)];

const final3 =
symbols[Math.floor(Math.random()*symbols.length)];

const animation = setInterval(function(){

    if(spins < 25){

    slot1.textContent =
    symbols[Math.floor(Math.random()*symbols.length)];

}else{

    slot1.textContent = final1;

}

    if(spins < 28){

    slot2.textContent =
    symbols[Math.floor(Math.random()*symbols.length)];

}else{

    slot2.textContent = final2;

}

    if(spins < 31){

    slot3.textContent =
    symbols[Math.floor(Math.random()*symbols.length)];

}else{

    slot3.textContent = final3;

}

    spins++;

    // Erste Walze stoppt
    if(spins === 25){
    slot1.classList.remove("spinning");
    slot1.textContent = final1;
}

    // Zweite Walze stoppt
    if(spins === 28){
    slot2.classList.remove("spinning");
    slot2.textContent = final2;
}

    // Dritte Walze stoppt
    if(spins === 31){

    clearInterval(animation);

    slot3.classList.remove("spinning");
    slot3.textContent = final3;

    finishSpin(
        bet,
        final1,
        final2,
        final3
    );

}

},100);
    
};

// ----------------------------
// ENDE
// ----------------------------

function finishSpin(
    bet,
    s1,
    s2,
    s3
){

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    slot1.classList.remove("spinning");
    slot2.classList.remove("spinning");
    slot3.classList.remove("spinning");

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

    if(s1 === "7️⃣"){

    message = "💰 MEGA JACKPOT!";

}else{

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
            break;

    }

    message = "✨ 2 Gleiche!";
}

// ===== Auszahlung =====

if(win){

    let coins = Math.floor(bet * multiplier);

// Nur bei 3x 7️⃣ gibt es den Jackpot
if(s1 === "7️⃣" && s2 === "7️⃣" && s3 === "7️⃣"){

    coins += jackpot;

    jackpot = 1000;

    document.getElementById("slotJackpot").textContent =
    jackpot;

}else{

    // Jackpot-Anzeige aktualisieren
    document.getElementById("slotJackpot").textContent =
    jackpot;

}

addCoins(coins);
addXP(20);

recordGame(true, coins);
    
    slot1.className = "slot";
    slot2.className = "slot";
    slot3.className = "slot";

    // 3 gleiche
    if(s1===s2 && s2===s3){

        slot1.classList.add("win");
        slot2.classList.add("win");
        slot3.classList.add("win");

    }

    // 1 + 2
    else if(s1===s2){

        slot1.classList.add("win");
        slot2.classList.add("win");

    }

    // 2 + 3
    else if(s2===s3){

        slot2.classList.add("win");
        slot3.classList.add("win");

    }

    // 1 + 3
    else{

        slot1.classList.add("win");
        slot3.classList.add("win");

    }

    const result =
    document.getElementById("slotResult");

    result.style.color="#00ff88";

    result.textContent =
    message + " +" + coins + " Coins";

}else{

    recordGame(false, bet);

    slot1.className = "slot lose";
    slot2.className = "slot lose";
    slot3.className = "slot lose";

    const result =
    document.getElementById("slotResult");

    result.style.color="#ff3b30";

    result.textContent =
    "❌ Leider verloren.";

}

slotRunning = false;

}
