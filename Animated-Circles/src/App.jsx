import { useState } from 'react'
import Circle from './components/Circle';
import './App.css';

function generator(){
  let counter = 0;
  return () => {
    return ++counter;
  }
}

const generateId = generator();

function App() {
  const [recentStack, setRecentStack] = useState([]);
  const [points, setPoints] = useState([]); // {id,x,y}

  function handleUndo(){
    if(!points.length) return;
    const lastCircle = points[points.length-1]
    setPoints(prev => prev.slice(0,-1))
    setRecentStack(prev => [...prev, lastCircle]);
  }

  function handleRedo(){
    if(!recentStack.length) return;
    const lastRemovedCircle = recentStack[recentStack.length-1]
    setRecentStack(prev => prev.slice(0,-1))
    setPoints(prev => [...prev, lastRemovedCircle]);
  }

  function handleReset(){
    setRecentStack([])
    setPoints([])
  }

  function handleScreenClick(e){
    const id = generateId();
    setPoints(prev => [...prev, {id, x:e.clientX, y:e.clientY}])
  }

  return (
    <div className='screen'>
      <section className='toolbar-container'>
        <button onClick={handleUndo} className="toolbar-btn">Undo</button>
        <button onClick={handleRedo} className="toolbar-btn">Redo</button>
        <button onClick={handleReset} className="toolbar-btn">Reset</button>
      </section>

      <div>Current{JSON.stringify(points)}</div>
      <div>Stack{JSON.stringify(recentStack)}</div>

      <section id='drawboard' onClick={handleScreenClick}>
      {
        points.map(({id,x,y}) => (
          <Circle key={id} x={x} y={y} />
        ))
      }
      </section>
    </div>
  )
}

export default App
