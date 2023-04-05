/* eslint-disable no-use-before-define */
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
    // Check who wins
    for (let i = 0; i < winArray.length; i += 1) {
      const winX = [];
      const winO = [];

      for (let j = 0; j < winArray[i].length; j += 1) {
        winX[j] = gameBoard.board[winArray[i][j]].includes('X');
        winO[j] = gameBoard.board[winArray[i][j]].includes('O');
      }

      const winnerX = winX.every(checkTrue);
      const winnerO = winO.every(checkTrue);

      if (winnerX) {
        // to stop the round
        displayController.cancelled = true;

        divPlayerWins.textContent = `Congratulation! ${playerOne.getName()} has won!`;
        container.insertBefore(divPlayerWins, boardNode);
      }
      if (winnerO) {
        // to stop the round
        displayController.cancelled = true;

        divPlayerWins.textContent = `Congratulation! ${playerTwo.getName()} has won!`;
        container.insertBefore(divPlayerWins, boardNode);
      }
    }
  };

  const playerMark = playerOne.getMark();
  const playerTurn = playerOne.getName();

  // Every round roundNum += 1, roundNum = 9 is draw
  const roundNum = 0;

  const restart = document.querySelector('.restart');

  const restartGame = () => {
    // Start a new round
    displayController.round();
    restart.addEventListener('click', () => {
      const cells = document.getElementsByClassName('cell');
      for (let i = 0; i < cells.length; i += 1) {
        gameBoard.board.splice(i, 1, '');
        gameBoard.printBoard();
      }

      // Reset round number, player mark and player turn
      gameController.roundNum = 0;
      gameController.playerMark = playerOne.getMark();
      gameController.playerTurn = playerOne.getName();

      // Reset cancelled round to false so that round can be played again
      displayController.cancelled = false;

      const divPlayerTurn = document.querySelector('.turn');
      if (divPlayerTurn) {
        container.removeChild(divPlayerTurn);
      } else if (divPlayerWins) {
        container.removeChild(divPlayerWins);
      }

      displayController.divPlayerTurn.textContent = `${gameController.playerTurn}'s turn`;
      container.insertBefore(displayController.divPlayerTurn, boardNode);
    });
  };

  return { winCon, restartGame, playerMark, playerTurn, roundNum };
})();

// To display the game
const displayController = (() => {
  const container = document.querySelector('.container');
  const boardNode = document.querySelector('.game-board');
  const divPlayerTurn = document.createElement('div');
  divPlayerTurn.setAttribute('class', 'turn');

  // If cancelled = true round will stop
  const cancelled = false;

  const round = () => {
    const cellsNode = document.querySelectorAll('.cell');

    // to show player name on ui
    divPlayerTurn.textContent = `${gameController.playerTurn}'s turn`;
    container.insertBefore(divPlayerTurn, boardNode);

    cellsNode.forEach((cell) => {
      cell.addEventListener('click', () => {
        // '!cell.childNodes.length' will see if the cell is empty or not
        if (!cell.childNodes.length) {
          // Stop round from happening in case of win/lose
          if (displayController.cancelled === true) {
            return;
          }

          // Add player mark in corresponding array position
          gameBoard.board.splice(
            cell.dataset.index,
            1,
            gameController.playerMark
          );
          gameBoard.printBoard();
          // Check winning condition
          gameController.winCon();
          gameController.roundNum += 1;

          // change mark after each turn
          gameController.playerMark =
            gameController.playerMark === playerOne.getMark()
              ? playerTwo.getMark()
              : playerOne.getMark();

          // change name after each turn
          gameController.playerTurn =
            gameController.playerTurn === playerOne.getName()
              ? playerTwo.getName()
              : playerOne.getName();

          // change name in the ui
          divPlayerTurn.textContent = `${gameController.playerTurn}'s turn`;
          container.insertBefore(divPlayerTurn, boardNode);

          // Execute if draws
          if (gameController.roundNum === 9) {
            container.removeChild(divPlayerTurn);
            divPlayerTurn.textContent = `It's a draw!`;
            container.insertBefore(divPlayerTurn, boardNode);
          }

          // Remove player turn name when a player wins
          if (displayController.cancelled === true) {
            container.removeChild(divPlayerTurn);
          }
        }
      });
    });
  };

  return { round, cancelled, divPlayerTurn };
})();

gameController.restartGame();
