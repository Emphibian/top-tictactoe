let gameBoardDiv = document.querySelector(".gameboard");

let gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  return { board };
})();

gameBoard.board.forEach((row) =>
  row.forEach(() => {
    let gameCellDiv = document.createElement("div");
    gameCellDiv.classList.add("game-cell");
    gameBoardDiv.appendChild(gameCellDiv);
  }),
);
