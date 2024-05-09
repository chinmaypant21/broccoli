import {useState, useEffect} from 'react';
import './App.css';

const max_concurrent = 3;

export default function App() {
  const [isRunning, setIsRunning]       = useState(false);
  const [progressBars, setProgressBars] = useState([0]);

  function handleAddBar(){
    setProgressBars((prevData) => [...prevData, 0])
  }

  function handleReset(){
    setProgressBars([0])
  }

  function handleStartStop(){
    setIsRunning(prevValue => !prevValue);
  }

  useEffect(() => {
    // const totalTime = 2000; //ms
    let intervalId;
    let concurrencyArray = [];

    intervalId = setInterval(() => {
      if(!isRunning){
        clearInterval(intervalId)
        return;
      }
      setProgressBars(prevProgress => {
        return prevProgress.map((val,idx) => {
          const isInProgress = concurrencyArray.includes(idx);

          if(isInProgress && val === 100){
            concurrencyArray = concurrencyArray.filter(val => val !== idx)
            return;
          }

          const shouldProceed = isInProgress || (concurrencyArray.length < max_concurrent);
          if((val < 100) && shouldProceed) {
            if(!isInProgress){
              concurrencyArray.push(idx);
            }
            
            return (val+1)
          }
          else {
            
            return (val)
          }
        })
      })
    }, 20)

    return () => {
      clearInterval(intervalId)
    }

  }, [isRunning])

  return (
    <div>
      <div className="buttons">
        <button onClick={handleAddBar} >Add</button>
        <button onClick={handleStartStop}>{!isRunning ? 'Start' : 'Pause'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className='bar-container'>
      {
        progressBars.map((bar, idx) => (
          <ProgressBar 
            key={idx}
            progress={progressBars[idx]}
          />
        ))
      }

      <div>Is Running: {JSON.stringify(isRunning)}</div>
      <div>progress: {JSON.stringify(progressBars)}</div>
      </div>
    </div>
  );
}

function ProgressBar({key, progress}) {
    return (
      <div 
        key={key} 
        className='progressbar'
      >
        <span 
          className='progress'
          style={{width: `${progress}%`}}
        >
        </span>
      </div>
    )
}