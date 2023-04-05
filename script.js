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
  const getMark = () => mark;
  const getName = () => name;

  return { getName, getMark };
};

const playerOne = players('Player 1', 'X');
const playerTwo = players('Player 2', 'O');

// To display the game
const displayController = (() => {
  const container = document.querySelector('.container');
  const boardNode = document.querySelector('.game-board');
  const divPlayerTurn = document.createElement('div');
  divPlayerTurn.setAttribute('class', 'turn');

  // playerMark to change mark after each turn
  let playerMark = playerOne.getMark();

  // playerTurn to change player name after turn
  let playerTurn = playerOne.getName();

  //

  // to stop the round
  const cancelled = false;

  const round = () => {
    const cellsNode = document.querySelectorAll('.cell');

    let roundNum = 0;

    // to show player name on ui
    divPlayerTurn.textContent = `${playerTurn}'s turn`;
    container.insertBefore(divPlayerTurn, boardNode);

    cellsNode.forEach((cell) => {
      cell.addEventListener('click', () => {
        // '!cell.childNodes.length' will see if the cell is empty or not
        if (!cell.childNodes.length) {
          // To stop round from happening in win/lose
          if (displayController.cancelled === true) {
            return;
          }

          gameBoard.board.splice(cell.dataset.index, 1, playerMark);
          gameBoard.printBoard();
          gameController.winCon();
          roundNum += 1;
          console.log(roundNum);

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

          // to execute if draws
          if (roundNum === 9) {
            container.removeChild(divPlayerTurn);
            divPlayerTurn.textContent = `It's a draw!`;
            container.insertBefore(divPlayerTurn, boardNode);
          }

          if (displayController.cancelled === true) {
            container.removeChild(divPlayerTurn);
          }
        }
        // else {
        // }
      });
    });
  };

  return { round, cancelled };
})();

const gameController = (() => {
  const container = document.querySelector('.container');
  const boardNode = document.querySelector('.game-board');
  const divPlayerWins = document.createElement('div');
  divPlayerWins.setAttribute('class', 'wins');

  const winCon = () => {
    const winArray = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const checkTrue = (element) => element === true;
    for (let i = 0; i < winArray.length; i += 1) {
      const winX = [];
      const winO = [];

      for (let j = 0; j < winArray[i].length; j += 1) {
        winX[j] = gameBoard.board[winArray[i][j]].includes('X');
        winO[j] = gameBoard.board[winArray[i][j]].includes('O');
      }
      // console.log(winX);
      const winnerX = winX.every(checkTrue);
      const winnerO = winO.every(checkTrue);

      if (winnerX) {
        console.log('hey');
        displayController.cancelled = true;

        divPlayerWins.textContent = `Congratulation! ${playerOne.getName()} has won!`;
        container.insertBefore(divPlayerWins, boardNode);
      }
      if (winnerO) {
        console.log('hey');
        displayController.cancelled = true;

        divPlayerWins.textContent = `Congratulation! ${playerTwo.getName()} has won!`;
        container.insertBefore(divPlayerWins, boardNode);
      }
    }
  };

  return { winCon };
})();

displayController.round();
