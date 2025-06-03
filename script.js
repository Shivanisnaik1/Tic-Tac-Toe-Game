const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message-text');
const winMessage = document.getElementById('winning-message');

let isXTurn = true;

const WIN_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

startGame();

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winMessage.classList.add('hide');
}

function handleClick(e) {
  const cell = e.target;
  const current = isXTurn ? 'X' : 'O';
  placeMark(cell, current);

  if (checkWin(current)) {
    endGame(false, current);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function placeMark(cell, mark) {
  cell.classList.add(mark);
  cell.textContent = mark;
}

function checkWin(current) {
  return WIN_COMBOS.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(current);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function endGame(draw, winner = '') {
  if (draw) {
    message.textContent = "It's a Draw!";
  } else {
    message.textContent = `${winner} Wins!`;
  }
  winMessage.classList.remove('hide');
}
