import { useEffect, useState } from 'react'
import './App.css'

const GridSize = 3;

function computeMatrix(matrix, dimension){
    //RowWise
    for(let i=0; i<matrix.length; i++){
      const isSame = matrix[i].every(val => {
        return val && (val === matrix[i][0])
      })

      if(isSame) return matrix[i][0];
    }

    //ColumnWise
    for(let i=0; i<matrix.length; i++){
      let isSame = true;
      for(let j=1; j<matrix.length; j++){

        if(!matrix[0][i] || (matrix[j][i] !== matrix[0][i])) {
          isSame = false;
          break;
        }
      }

      if(isSame){
        console.log('same', matrix[0][i])
        return matrix[0][i];
      }
    }

    //DiagonalWise
    let isSame = true;
    for(let i=0; i<matrix.length; i++){
      if(matrix[i][i] !== matrix [0][0]){
        isSame = false;
        break
      }
    }

    if(isSame) return matrix[0][0]
    
    isSame = true;
    for(let i=0; i<matrix.length; i++){
      if(matrix[i][(matrix.length-1)-i] !== matrix[0][matrix.length-1]){
        isSame = false;
        break;
      }
    }
    
    if(isSame) return matrix[0][matrix.length-1];

    return null;
}

function App() {
  const [turn, setTurn] = useState('X');
  const [dataMatrix, setDataMatrix] = useState()
  const [winner, setWinner] = useState();

  useEffect(() => {
    if(!dataMatrix) return;

    const result = computeMatrix(dataMatrix, GridSize);
    if(result){
      setWinner(result)
    }

    setTurn(prevVal => (prevVal === 'X') ? 'O' : 'X')
  }, [dataMatrix])

  useEffect(() => {
    setDataMatrix(() => {
      let arr = Array(3).fill()
      arr.forEach((_, idx) => {
        arr[idx] = Array(3).fill()
      })
      return arr;
    })
  },[])

  return (
    <>
    {JSON.stringify(dataMatrix)}
    {JSON.stringify(winner+'')}
    <div
      style={{'--size': GridSize, pointerEvents: `${winner ? 'none' : 'all'}`}}
      className='board'
      >
    {
      dataMatrix?.length && Array(GridSize).fill().map((_, row_idx) => (
        Array(GridSize).fill().map((_, col_idx) => (
          <Cell key={(row_idx*GridSize)+col_idx} row={row_idx} col={col_idx} turn={turn} updateMatrix={setDataMatrix} />
        ))
      ))
    }
    </div>
    </>
  )
}

function Cell({row, col, turn, updateMatrix}){
  const [filled, setFilled] = useState('');

  function handleCellClick(){
    if(filled) return;

    setFilled(turn)
    updateMatrix(prevData => {
      const newData = [...prevData];
      newData[row][col] = turn;

      return newData;
    })
  }

  return (
    <div
      onClick={handleCellClick}
      className={`cell ${filled ? 'cell-filled' : ''}`}
    >
      {filled}
    </div>
  )
}

export default App
