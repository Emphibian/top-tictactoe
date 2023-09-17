let gameBoardDiv = document.querySelector(".gameboard");

let gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

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

  return { render, mark };
})();

gameBoard.render();
