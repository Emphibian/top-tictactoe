let gameBoardDiv = document.querySelector(".gameboard");

let gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let turn = null;

  let mark = (event) => {
    let column = +event.srcElement.dataset.column;
    let row = +event.srcElement.dataset.row;

    board[row][column] = "X";
    console.log(board);
    render();
  };

  let render = () => {
    gameBoardDiv.innerHTML = "";

    board.forEach((row, i) =>
      row.forEach((value, j) => {
        let gameCellDiv = document.createElement("div");
        gameCellDiv.classList.add("game-cell");
        gameCellDiv.textContent = value;
        gameCellDiv.dataset.row = i;
        gameCellDiv.dataset.column = j;

        gameCellDiv.addEventListener("click", mark);

        gameBoardDiv.appendChild(gameCellDiv);
      }),
    );
  };

  const changeTurn = () => {
    if (!turn) {
      turn = player1;
      return;
    }

    turn = turn === player1 ? player2 : player1;
  }

  return {
    render,
    mark,
    changeTurn,
  };
})();

function playerFactory(player, mark) {
  return {
    player,
    mark,
  };
}

let player1 = playerFactory(1, "O");
let player2 = playerFactory(2, "X");

gameBoard.render();
gameBoard.changeTurn();
