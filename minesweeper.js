const gridSize = 10; 
const numMines = 10; 
const grid = document.getElementById('grid');
const statusText = document.getElementById('status-text');
let gridArray = [];
let revealedCells = 0;

function initGrid() {
    gridArray = Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => ({
            mine: false,
            opened: false,
            adjacentMines: 0
        }))
    );

    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        if (!gridArray[x][y].mine) {
            gridArray[x][y].mine = true;
            minesPlaced++;
            updateAdjacentMines(x, y);
        }
    }

    renderGrid();
}

function updateAdjacentMines(x, y) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize && !(i === 0 && j === 0)) {
                gridArray[newX][newY].adjacentMines++;
            }
        }
    }
}

function renderGrid() {
    grid.innerHTML = '';
    gridArray.forEach((row, x) => {
        row.forEach((cell, y) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('minesweeper-cell');
            cellDiv.addEventListener('click', () => handleCellClick(x, y));
            if (cell.opened) {
                cellDiv.classList.add('opened');
                if (cell.mine) {
                    cellDiv.textContent = '💣';
                } else {
                    cellDiv.textContent = cell.adjacentMines > 0 ? cell.adjacentMines : '';
                }
            }
            grid.appendChild(cellDiv);
        });
    });
}

function handleCellClick(x, y) {
    if (gridArray[x][y].opened) {
        return;
    }
    gridArray[x][y].opened = true;
    revealedCells++;
    if (gridArray[x][y].mine) {
        statusText.textContent = 'Game Over! You clicked a mine!';
        revealAllMines();
        return;
    }
    if (gridArray[x][y].adjacentMines === 0) {
        openAdjacentCells(x, y);
    }
    renderGrid();
    checkWin();
}

function openAdjacentCells(x, y) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
                handleCellClick(newX, newY);
            }
        }
    }
}

function revealAllMines() {
    gridArray.forEach(row => {
        row.forEach(cell => {
            if (cell.mine) {
                cell.opened = true;
            }
        });
    });
    renderGrid();
}

function checkWin() {
    if (revealedCells === (gridSize * gridSize - numMines)) {
        statusText.textContent = 'Congratulations! You cleared the minefield!';
    }
}

initGrid();
