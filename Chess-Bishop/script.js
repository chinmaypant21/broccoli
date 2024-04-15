const board = document.getElementById('board-container');

var alternate = false;

function getDiagonalCells(matrix, rowIndex, colIndex) {
    const diagonalCells = [];
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    
    // Calculate the distance to the top-left corner
    const distanceToTopLeft = Math.min(rowIndex, colIndex);
    
    // Calculate the distance to the bottom-right corner
    const distanceToBottomRight = Math.min(numRows - 1 - rowIndex, numCols - 1 - colIndex);
    
    // Starting row and column for the diagonal
    const startRow = rowIndex - distanceToTopLeft;
    const startCol = colIndex - distanceToTopLeft;
    
    // Traverse the diagonal from top-left to bottom-right
    for (let i = 0; i <= distanceToTopLeft + distanceToBottomRight; i++) {
        if((rowIndex !== (startRow + i)) && (colIndex !== (startCol + i)))
        diagonalCells.push(matrix[startRow + i][startCol + i]);
    }    
    return diagonalCells;
}

function getOppDiagonalCells(matrix, rowIndex, colIndex) {
    const diagonalCells = [];
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    
    const distanceToTopRight = Math.min(rowIndex, numCols - 1 - colIndex);
    
    const distanceToBottomLeft = Math.min(numRows - 1 - rowIndex, colIndex);
    
    // Starting row and column for the main diagonal
    const startRowMain = rowIndex - distanceToTopRight;
    const startColMain = colIndex + distanceToTopRight;
    
    // Traverse the main diagonal from top-right to bottom-left
    for (let i = 0; i <= distanceToTopRight + distanceToBottomLeft; i++) {
        diagonalCells.push(matrix[startRowMain + i][startColMain - i]);
    }
    return diagonalCells;
}

const chessMatrix = [];
for (var i = 0; i <= 7; i++) {
    const row = []
    for (var j = 0; j <= 7; j++) {
        const boardCell = document.createElement('div')
        boardCell.classList.add('board-cell')
        boardCell.classList.add(alternate ? 'board-cell-white' : 'board-cell-dark')
        boardCell.setAttribute('data-row', i)
        boardCell.setAttribute('data-col', j)
        boardCell.textContent = `(${i} ${j})`

        let selectedElements = []
            boardCell.addEventListener('mouseover', (e) => {
            const row = Number(e.target.getAttribute('data-row'));
            const column = Number(e.target.getAttribute('data-col'));

            const diagonalElements = getDiagonalCells(chessMatrix, row, column)
            const oppDiagonalElements = getOppDiagonalCells(chessMatrix, row, column)

            oppDiagonalElements.forEach(e => console.log(e))

            selectedElements = [...diagonalElements, ...oppDiagonalElements]

            selectedElements.forEach(element => {
                element.classList.add('board-highlight-cell')
            })
        })

        boardCell.addEventListener('mouseout', (e) => {
            selectedElements.forEach(element => {
                element.classList.remove('board-highlight-cell')
            })

            selectedElements = []
        })

        row.push(boardCell)
        board.appendChild(boardCell)

        if ((j+1) % 8 !== 0) {
            alternate = !alternate
        }
    }
    chessMatrix.push(row)
}

console.log(chessMatrix)