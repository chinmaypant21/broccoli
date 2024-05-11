import React, { useState } from 'react'
import Cell from './Cell';

const DEFUALT_ROW_COUNT = 30;
const DEFUALT_COL_COUNT = 20;

const Sheet = () => {
    const [activeCell, setActiveCell] = useState(null);

    function handleColorChange(){
        if(activeCell){
            console.log(activeCell);
            activeCell.current.classList.add('cell-colored')
        } else {
            console.log('No Cell Active')
        }
    }
    
    return (
        <>
        <button onClick={handleColorChange}>Change Color</button>
        <div className='sheet-container'>
            <div className='sheet-header-row' style={{ paddingLeft: '42px' }}>
                {
                    Array(DEFUALT_COL_COUNT).fill(0).map((_, idx) => (
                        <div>{idx + 1}</div>
                    ))
                }
            </div>
            {
                Array(DEFUALT_ROW_COUNT).fill(0).map((row, idx) => (
                    <div className='sheet-row'>
                        <div className='row-idx'>{idx + 1}</div>
                        {
                            Array(DEFUALT_COL_COUNT).fill(0).map((col) => (
                                <Cell setActive={setActiveCell}/>
                            ))
                        }
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default Sheet