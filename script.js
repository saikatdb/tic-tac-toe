const gameBoard = (() => {
  const board = ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'x', 'x'];
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
  const cellsNode = document.querySelectorAll('.cell');

  const addMark = () => {
    cellsNode.forEach((cell) => {
      cell.addEventListener('click', () => {
        cell.textContent = mark;
        gameBoard.board.splice(cell.dataset.index, 1, mark);
      });
    });
  };

  return { name, mark, addMark };
};

const playerOne = players('Player 1', 'X');
const playerTwo = players('Player 2', 'O');

// const displayController = (() = {

// })
