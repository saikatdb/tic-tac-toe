const gameBoard = (() => {
  const board = ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'x', 'x'];
  const cells = document.getElementsByClassName('cell');

  const printBoard = () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = board[i];
    }
  };

  return { printBoard };
})();

gameBoard.printBoard();

const players = (name) => {
  let playerMark = '';
  const chooseMark = (choice) => {
    if (choice === 'x') {
      playerMark = 'X';
      // return playerMark;
    } else if (choice === 'o') {
      playerMark = 'O';
      // return playerMark;
    }
    return playerMark;
  };

  return { name, chooseMark };
};
