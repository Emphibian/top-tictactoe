let gameBoardDiv = document.querySelector(".gameboard");

let gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let turn = null;

  let playTurn = (event) => {
    let column = +event.srcElement.dataset.column;
    let row = +event.srcElement.dataset.row;

    changeTurn();
    board[row][column] = turn.mark;
    checkWin();
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

        gameCellDiv.addEventListener("click", playTurn);

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
  };

  const checkWin = () => {
    // check row, column and diagonal for a win
    let rowWin = board.some((row) =>
      row.every((element) => element === row[0] && element),
    );
    let columnWin = board[0].some((_, i) =>
      board.every((row) => row[i] === board[0][i] && row[i]),
    );
    let primaryDiagonalWin = board.every(
      (row, i) => row[i] === board[0][0] && board[0][0],
    );
    let secondaryDiagonalWin = board.every((row, i) => {
      let column = row.length - i - 1;
      return row[column] === board[0][2] && board[0][2];
    });

    return rowWin || columnWin || primaryDiagonalWin || secondaryDiagonalWin;
  };

  return {
    render,
    playTurn,
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
