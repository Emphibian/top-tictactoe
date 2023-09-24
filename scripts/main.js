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

    let winningMark = checkWin();
    if (winningMark) {
      let winner = player1.mark === winningMark ? player1 : player2;
      declareWinner("win", winner);
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

  const declareWinner = (type, winner = null) => {
    if (document.querySelector(".game-over")) {
      return;
    }

    let gameDiv = document.querySelector(".game");
    let gameOverDiv = document.createElement("div");
    gameOverDiv.classList.add("game-over");

    let heading = document.createElement("h3");
    if (type === "win") {
      heading.textContent = `Game won by ${winner.name}`;
    } else {
      heading.textContent = "Game draw";
    }
    gameOverDiv.appendChild(heading);

    let controller = new AbortController();
    window.addEventListener(
      "mouseup",
      (e) => {
        if (e.target != gameOverDiv && e.target.parentNode != gameOverDiv) {
          gameDiv.removeChild(gameOverDiv);
          controller.abort();
        }
      },
      { signal: controller.signal },
    );

    let playAgainBtn = document.createElement("button");
    playAgainBtn.addEventListener("click", () => {
      reset();
      gameDiv.removeChild(gameOverDiv);
      controller.abort();
    });
    playAgainBtn.textContent = "Play Again";
    gameOverDiv.appendChild(playAgainBtn);
    gameDiv.appendChild(gameOverDiv);
  };

  const changeTurn = () => {
    turn?.renderPlayer(true);
    if (!turn) {
      turn = player1;
      turn.renderPlayer(false);
      return;
    }

    turn = turn === player1 ? player2 : player1;
    turn.renderPlayer(false);
  };

  const checkWin = () => {
    // check row, column and diagonal for a win
    let winningMark;
    let win;
    board.some((row) => {
      let rowWin = row.every((element) => element === row[0] && element);
      if (rowWin) {
        winningMark = row[0];
        return true;
      }
    });

    board[0].some((_, i) => {
      let columnWin = board.every((row) => row[i] === board[0][i] && row[i]);
      if (columnWin) {
        winningMark = board[0][i];
        return true;
      }
    });

    let primaryDiagonalWin = board.every(
      (row, i) => row[i] === board[0][0] && board[0][0],
    );
    if (primaryDiagonalWin) {
      winningMark = board[0][0];
    }

    let secondaryDiagonalWin = board.every((row, i) => {
      let column = row.length - i - 1;
      return row[column] === board[0][2] && board[0][2];
    });
    if (secondaryDiagonalWin) {
      winningMark = board[0][2];
    }

    return winningMark;
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

function playerFactory(name, mark) {
  const renderPlayer = (turn) => {
    let playerDiv = document.querySelector(`#${name}`);
    if (turn) {
      playerDiv.classList.add("selected");
      return;
    }
    playerDiv.classList.remove("selected");
  };
  return {
    name,
    mark,
    renderPlayer,
  };
}

let player1 = playerFactory("Player1", "O");
let player2 = playerFactory("Player2", "X");

newBtn.addEventListener("click", () => {
  gameBoard.reset();
});

gameBoard.render();
