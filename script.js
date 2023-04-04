const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.getElementsByClassName('cell');

  const printBoard = () => {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].textContent = board[i];
    }
  };

  return { board, printBoard };
})();

gameBoard.printBoard();

const players = (name, mark) => {
  // const cellsNode = document.querySelectorAll('.cell');
  // this.mark = mark;

  const getMark = () => mark;
  const getName = () => name;

  return { getName, getMark };
};

const playerOne = players('Player 1', 'X');
const playerTwo = players('Player 2', 'O');

const displayController = (() => {
  const container = document.querySelector('.container');
  const boardNode = document.querySelector('.game-board');
  const divPlayerTurn = document.createElement('div');
  divPlayerTurn.setAttribute('class', 'turn');

  // playerMark to change mark after each turn
  let playerMark = playerOne.getMark();

  // playerTurn to change player name after turn
  let playerTurn = playerOne.getName();

  const round = () => {
    const cellsNode = document.querySelectorAll('.cell');

    // to show player name on ui
    divPlayerTurn.textContent = `${playerTurn}'s turn`;
    container.insertBefore(divPlayerTurn, boardNode);

    cellsNode.forEach((cell) => {
      cell.addEventListener('click', () => {
        // '!cell.childNodes.length' will see if the cell is empty or not
        if (!cell.childNodes.length) {
          gameBoard.board.splice(cell.dataset.index, 1, playerMark);
          gameBoard.printBoard();

          // change mark after each turn
          playerMark =
            playerMark === playerOne.getMark()
              ? playerTwo.getMark()
              : playerOne.getMark();

          // change name after each turn
          playerTurn =
            playerTurn === playerOne.getName()
              ? playerTwo.getName()
              : playerOne.getName();
          console.log(playerTurn);

          // change name in the ui
          divPlayerTurn.textContent = `${playerTurn}'s turn`;
          container.insertBefore(divPlayerTurn, boardNode);
        } else {
          console.log('yo');
        }
      });
    });
  };

  // const winCon = () => {
  //   const winArray = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];
  // };

  return { round };
})();

displayController.round();
