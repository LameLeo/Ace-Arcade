// ================================
// ACE ARCADE - MINES 3.0
// ================================

const grid = document.getElementById("minesGrid");

let mineGame = [];
let bombs = [];
let gameRunning = false;
let currentBet = 0;
let revealed = 0;
let bombCount = 3;
// ----------------------------
// START
// ----------------------------

document.getElementById("startMines").onclick = function(){

    currentBet = Number(document.getElementById("minesBet").value);
    bombCount =
Number(document.getElementById("bombCount").value);

    if(currentBet <= 0){
        alert("Ungültiger Einsatz.");
        return;
    }
document.getElementById("minesMultiplier").textContent = "1.00x";
    if(player.coins < currentBet){
        alert("Nicht genügend Coins.");
        return;
    }

    addCoins(-currentBet);

    gameRunning = true;
    revealed = 0;
    createBoard();

};

// ----------------------------
// FELDER ERZEUGEN
// ----------------------------

function createBoard(){

    grid.innerHTML = "";

    mineGame = [];
    bombs = [];

    for(let i=0;i<25;i++){

        const tile=document.createElement("div");

        tile.className="mineTile";

        tile.dataset.id=i;

        tile.onclick=function(){

            if(!gameRunning) return;

            revealTile(i,tile);

        };

        grid.appendChild(tile);

        mineGame.push({

            bomb:false,
            opened:false

        });

    }

    while(bombs.length < bombCount){

        const random=Math.floor(Math.random()*25);

        if(!bombs.includes(random)){

            bombs.push(random);

        }

    }

    bombs.forEach(index=>{

        mineGame[index].bomb = true;

    });

}


function revealTile(index,tile){

    if(mineGame[index].opened)
        return;

    mineGame[index].opened = true;

    if(mineGame[index].bomb){

        tile.textContent = "💣";
        tile.style.background = "#ff3b30";
        tile.classList.add("open");
        tile.classList.add("bomb");
        tile.style.cursor = "default";
        tile.onclick = null;

        gameRunning = false;

        recordGame(false, currentBet); 

        // Alle Bomben zeigen
for(let i=0;i<mineGame.length;i++){

    const currentTile =
    document.querySelector(`[data-id="${i}"]`);

    currentTile.onclick = null;
    currentTile.style.cursor = "default";

    if(mineGame[i].bomb){

        currentTile.textContent = "💣";
        currentTile.style.background = "#ff3b30";
        currentTile.classList.add("open");

    }else{

        currentTile.textContent = "💎";
        currentTile.style.background = "#00ff88";
        currentTile.classList.add("open");

    }

}

alert("💥 Boom! Du hast verloren.");

return;

    }

    tile.textContent = "💎";
    tile.style.background = "#00ff88";
    tile.classList.add("open");

tile.style.cursor = "default";
tile.style.transform = "scale(0.95)";
tile.onclick = null;

revealed++;

const multiplier =
(
    1 +
    (revealed * (bombCount / 8))
).toFixed(2);

document.getElementById("minesMultiplier").textContent =
    multiplier.toFixed(2) + "x";

}
  
document.getElementById("cashOutMines").onclick = function(){

    if(!gameRunning) return;

    gameRunning = false;

   const multiplier =
(
    1 +
    (revealed * (bombCount / 8))
);

    const win = Math.floor(currentBet * multiplier);

    addCoins(win);
    addXP(20);

    recordGame(true, win);

    alert(
        "💰 Cash Out!\n\n" +
        "Multiplier: " + multiplier.toFixed(2) + "x\n" +
        "Gewinn: " + win + " Coins"
    );

};

function updateChance(){

    const safeTiles = 25 - bombCount - revealed;
    const totalTiles = 25 - revealed;

    const chance = (safeTiles / totalTiles) * 100;

    document.getElementById("mineChance").textContent =
        chance.toFixed(1) + "%";

}
