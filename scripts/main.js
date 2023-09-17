let gameBoardDiv = document.querySelector(".gameboard");

for (let i = 0; i < 9; i++) {
  let gameCellDiv = document.createElement("div");
  gameCellDiv.classList.add("game-cell");
  gameBoardDiv.appendChild(gameCellDiv);
}
