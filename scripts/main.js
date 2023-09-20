let gameBoardDiv = document.querySelector(".gameboard");
let newBtn = document.querySelector("#new-button");

let gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let turn = null;

  const playTurn = (event) => {
    let column = +event.srcElement.dataset.column;
    let row = +event.srcElement.dataset.row;

    changeTurn();
    board[row][column] = turn.mark;
    if (checkWin()) {
      declareWinner();
      render(true);
    } else if (checkDraw()) {
      declareWinner("draw");
      render(true);
    } else {
      render();
    }
  };

  const render = (gameOver = false) => {
    gameBoardDiv.innerHTML = "";

    board.forEach((row, i) =>
      row.forEach((value, j) => {
        let gameCellDiv = document.createElement("div");
        gameCellDiv.classList.add("game-cell");
        gameCellDiv.textContent = value;
        gameCellDiv.dataset.row = i;
        gameCellDiv.dataset.column = j;

        if (!board[i][j] && !gameOver)
          gameCellDiv.addEventListener("click", playTurn);

        gameBoardDiv.appendChild(gameCellDiv);
      }),
    );
  };

  const declareWinner = (type) => {
    if (document.querySelector(".game-over")) {
      return;
    }

    let gameDiv = document.querySelector(".game");
    let gameOverDiv = document.createElement("div");
    let heading = document.createElement("h3");
    heading.textContent = type === "draw" ? "Game Drawn" : "Won";
    gameOverDiv.appendChild(heading);

    gameOverDiv.classList.add("game-over");
    gameDiv.appendChild(gameOverDiv);

    window.addEventListener(
      "mouseup",
      (e) => {
        if (e.target != gameOverDiv) {
          gameDiv.removeChild(gameOverDiv);
        }
      },
      { once: true },
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

  const checkDraw = () => {
    let notDraw = board.some((row) => row.some((element) => element === ""));
    return !notDraw;
  };

  const reset = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    turn = null;
    changeTurn();
    render();
  };

  return {
    render,
    playTurn,
    reset,
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

newBtn.addEventListener("click", () => {
  gameBoard.reset();
});

gameBoard.render();
