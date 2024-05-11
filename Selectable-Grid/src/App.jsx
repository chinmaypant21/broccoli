import { useEffect, useState } from 'react'
import './App.css'

const ROWS = 10
const COLS = 15

function calculateMatrix(start, end){
  let initial = start;
  let final = end;

  if((start[0] <= end[0]) && (start[1] <= end[1])){
    initial = start;
    final = end;
  } else if((start[0] >= end[0]) && (start[1] >= end[1])){
    initial = end;
    final = start;
  } else if((start[0] <= end[0]) && (start[1] >= end[1])){
    initial = [start[0], end[1]];
    final   = [end[0], start[1]];
  } else {
    initial = [end[0], start[1]];
    final   = [start[0], end[1]];
  }
  
  const mx = []
  for(let i=initial[0]; i<=final[0]; i++){
    for(let j=initial[1]; j<=final[1]; j++){
      mx.push([i,j])
    }
  }
  return mx
}

function App() {
  const [targetedCells, setTargetedCells] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [borderCells, setBorderCells] = useState({starting: null, ending: null})

  useEffect(() => {
    if(!isSelecting) return;
    setTargetedCells(calculateMatrix(borderCells.starting, borderCells.ending))
  }, [borderCells])

  return (
    <>
    <div
      style={{gridTemplateRows: `repeat(${ROWS}, 1fr)`, gridTemplateColumns: `repeat(${COLS}, 80px)`}}
      className='grid-container'
    >
      {
        Array(ROWS).fill().map((_, row_idx) => (
          Array(COLS).fill().map((_, col_idx) => (
            <GridCell
              key={(row_idx * COLS) + col_idx}
              position={[row_idx, col_idx]}
              idx_value={(row_idx * COLS) + col_idx + 1}
              isSelecting={isSelecting}
              setIsSelecting={setIsSelecting}
              borderCells={borderCells}
              setBorderCells={setBorderCells}
              targetedCells={targetedCells}
            />
          ))

        ))
      }
    </div>
    </>
  )
}

function GridCell({ idx_value, position, borderCells, setBorderCells, targetedCells, isSelecting, setIsSelecting }) {
  function handleMouseDown(e){
    setIsSelecting(true)
    setBorderCells({starting: position, ending: position})
  }

  function handleMouseOver(e){
    if(borderCells.starting && isSelecting){
      setBorderCells(prevVal => ({...prevVal, ending: position}))
    }
  }

  function handleMouseUp(e){
    setIsSelecting(false)
  }

  return (
    <div
      style={targetedCells.some(cell => {return JSON.stringify(cell) === JSON.stringify(position)}) ? {backgroundColor: 'lightcoral'} : {}}
      className='grid-cell'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
    >
      {idx_value}
    </div>
  )
}

export default App
