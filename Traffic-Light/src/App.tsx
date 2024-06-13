import { useEffect, useState } from 'react'
import './App.css'

function Light({color, selectedLight}: any) {
  return (
    <div
      style={(selectedLight == color) ? {backgroundColor: color} : {}}
      className='light-container'
    >
    </div>
  )
}

const Lights = [
  {color: 'red'},
  {color: 'yellow'},
  {color: 'green'},
]

function App() {
  const [lights, setLights] = useState(Lights);
  const [selectedLight, setSelectedLight]: any = useState('red');

  useEffect(() => {
    const id = setTimeout(() => {
      let curr_idx = lights.findIndex((light) => light.color === selectedLight);
      const next_idx = (curr_idx != (lights.length-1)) ? curr_idx+1 : 0;
      setSelectedLight(lights[next_idx].color);
    }, 2000)

    return () => clearTimeout(id);
  }, [selectedLight])
  
  return (
    <div className='signal-container'>
      {
        lights.map((light) => (
          <Light key={light.color} color={light.color} selectedLight={selectedLight} />
        ))
      }
    </div>
  )
}

export default App
