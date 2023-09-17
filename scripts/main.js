let gameBoardDiv = document.querySelector(".gameboard");

let gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  return { board };
})();

gameBoard.board.forEach((row, i) =>
  row.forEach((_, j) => {
    let gameCellDiv = document.createElement("div");
    gameCellDiv.classList.add("game-cell");
    gameCellDiv.dataset.row = i;
    gameCellDiv.dataset.column = j;

    gameBoardDiv.appendChild(gameCellDiv);
  }),
);
