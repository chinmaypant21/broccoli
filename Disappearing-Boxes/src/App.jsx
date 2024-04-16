import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TOTAL_BOX_COUNT = 7;

function Box({children, selectedBoxes, setSelectedBoxes, value}) {
  const [isClicked, setIsClicked] = useState(false);
  function handleBoxClick() {
    if (isClicked) return;
    setSelectedBoxes((prevVal) => [...prevVal, value ])
  }

  useEffect(() => {
    if(selectedBoxes.includes(value)){
      setIsClicked(true)
    } else {
      setIsClicked(false)
    }
  }, [selectedBoxes])

  return (
    <div 
      className={`box ${isClicked ? 'box-clicked' : ''}`}
      onClick={handleBoxClick}
    >
      {children}
    </div>
  )
}

function App() {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  
  function startRemovingBoxes() {

    var count = TOTAL_BOX_COUNT;
    var intervalID = setInterval(function () {

      setSelectedBoxes(prevVal => {
        prevVal.pop()
        return [...prevVal];
      })

      if (--count === 0) {
        clearInterval(intervalID);
      }
    }, 1000);
  }

  useEffect(() => {
    if(selectedBoxes.length === TOTAL_BOX_COUNT) {
      startRemovingBoxes()
    }
  },[selectedBoxes])
  
  return (
    <div className='container'>
      {JSON.stringify(selectedBoxes)}
      <div onClick={()=>{setSelectedBoxes([])}}>reset</div>
      <div className='row'>
        <Box value={1} selectedBoxes={selectedBoxes} setSelectedBoxes={setSelectedBoxes}>1</Box>
        <Box value={2} selectedBoxes={selectedBoxes} setSelectedBoxes={setSelectedBoxes}>2</Box>
        <Box value={3} selectedBoxes={selectedBoxes} setSelectedBoxes={setSelectedBoxes}>3</Box>
      </div>

      <div className='row'>
        <Box value={4} selectedBoxes={selectedBoxes} setSelectedBoxes={setSelectedBoxes}>4</Box>
      </div>

      <div className='row'>
        <Box value={7} selectedBoxes={selectedBoxes} setSelectedBoxes={setSelectedBoxes}>7</Box>
        <Box value={8} selectedBoxes={selectedBoxes} setSelectedBoxes={setSelectedBoxes}>8</Box>
        <Box value={9} selectedBoxes={selectedBoxes} setSelectedBoxes={setSelectedBoxes}>9</Box>
      </div>
    </div>
  )
}

export default App
