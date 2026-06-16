const WIN = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let board, turn, scores, names, marks, gameOver;

function initRound() {
    board = Array(9).fill('');
    turn = Math.floor(Math.random() * 2);
    gameOver = false;
    renderBoard();
    setStatus();
}

function setStatus() {
    document.getElementById('status').innerHTML =
        `<b>${names[turn]}</b>'s turn (${marks[turn]})`;
}

function renderBoard() {
    const el = document.getElementById('board');
    el.innerHTML = '';
    board.forEach((val, i) => {
        const cell = document.createElement('div');
        cell.className = 'cell' +
            (val === 'X' ? ' x-mark taken' : val === 'O' ? ' o-mark taken' : '');
        cell.textContent = val;
        cell.addEventListener('click', () => handleClick(i));
        el.appendChild(cell);
    });
}

function handleClick(i) {
    if (gameOver || board[i]) return;
    board[i] = marks[turn];

    if (checkWin()) {
        scores[turn] += 1;
        updateScores();
        renderBoard();
        document.getElementById('status').innerHTML =
            `🏆 <b>${names[turn]}</b> wins this round!`;
        gameOver = true;
    } else if (board.every(c => c)) {
        scores[0] += 0.5;
        scores[1] += 0.5;
        updateScores();
        renderBoard();
        document.getElementById('status').innerHTML = `It's a draw!`;
        gameOver = true;
    } else {
        turn = turn === 0 ? 1 : 0;
        renderBoard();
        setStatus();
    }
}

function checkWin() {
    return WIN.some(([a, b, c]) =>
        board[a] && board[a] === board[b] && board[b] === board[c]
    );
}

function updateScores() {
    document.getElementById('s1val').textContent =
        scores[0] % 1 === 0 ? scores[0] : scores[0].toFixed(1);
    document.getElementById('s2val').textContent =
        scores[1] % 1 === 0 ? scores[1] : scores[1].toFixed(1);
}

document.getElementById('startBtn').addEventListener('click', () => {
    const n1 = document.getElementById('p1').value.trim();
    const n2 = document.getElementById('p2').value.trim();
    if (!n1 || !n2) { alert('Please enter both names!'); return; }

    names = [n1, n2];
    marks = ['X', 'O'];
    scores = [0, 0];

    document.getElementById('s1name').textContent = n1;
    document.getElementById('s2name').textContent = n2;
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    initRound();
});

document.getElementById('resetBtn').addEventListener('click', initRound);