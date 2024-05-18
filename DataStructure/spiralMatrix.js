const data = [
    [67, 79, 56, 29, 15],
    [40, 34, 42, 63, 62],
    [73, 59, 6 , 24, 77],
    [39, 52, 33, 11, 68],
    [58, 28, 70, 63, 36],
]

function updateMatrixValues(matrix, direction){
    let newMatrix = [];
    let values = [];

    const rows = matrix.length
    const cols = matrix[0].length

    switch(direction){
        case 'UP': {
            for(let i=(rows-1); i>=0; i--){
                values.push(matrix[i][0])
            }

            newMatrix = matrix.map(row => (
                row.slice(1)
            ))
            break;
        }

        case 'DOWN': {
            for(let i=0; i<rows; i++){
                values.push(matrix[i][cols-1])
            }

            newMatrix = matrix.map(row => (
                row.slice(0, row.length-1)
            ))
            break;
        }

        case 'LEFT': {
            for(let i=(cols-1); i>=0; i--){
                values.push(matrix[rows-1][i])
            }

            newMatrix = matrix.slice(0, matrix.length-1);
            break;
        }

        case 'RIGHT':
        default: {

            for(let i=0; i<cols; i++){
                values.push(matrix[0][i])
            }

            newMatrix = matrix.slice(1);
            break;
        }
    }

    return [structuredClone(newMatrix), values];
}


function getDirection(direction){
    switch(direction){
        case 'RIGHT': {
            return 'DOWN';
        }

        case 'LEFT': {
            return 'UP';
        }

        case 'UP': {
            return 'RIGHT';
        }

        case 'DOWN': {
            return 'LEFT';
        }
    }
}

function getSpiralValues(matrix, direction='RIGHT'){
    if(matrix.length === 1 && matrix[0].length === 1){
        return matrix[0]
    }

    let newDirection = getDirection(direction)

    let [newMatrix, values] = updateMatrixValues(matrix,direction);
    values = [...values, ...getSpiralValues(newMatrix, newDirection)];

    return values;

}

console.log(getSpiralValues(data))

/**
    [67, 79, 56, 29, 15],
    [40, 34, 42, 63, 62],
    [73, 59, 6 , 24, 77],
    [39, 52, 33, 11, 68],
    [58, 28, 70, 63, 36],
 */