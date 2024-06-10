import { useState } from 'react'
import './App.css'
import ChartColumn from './components/ChartColumn';

const chartData = [
  {value: '60', color: 'green', title: 'Apple'},
  {value: '90', color: 'blue', title: 'Blueberry'},
  {value: '55', color: 'purple', title: 'Grape'},
  {value: '70', color: 'lime', title: 'Pineapple'},
  {value: '20', color: 'gold', title: 'Carrot'},
]

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle(){
    setIsOpen(prev => !prev)
  }

  return (
    <div className='container'>
      <button onClick={handleToggle}>Toggle Chart</button>
      {
        isOpen &&
        <div className="chart-container">
        {
          chartData.map((data, idx) => (
            <ChartColumn key={idx} data={data} />
          ))
        }
        </div>
      }
    </div>
  )
}

export default App
