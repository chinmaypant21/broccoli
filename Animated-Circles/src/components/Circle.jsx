import React from 'react'

const Circle = ({x,y}) => {
  return (
    //prevent click
    <div
        onClick={(e) => e.stopPropagation()}
        className='circle'
        style={{
            position:'fixed',
            top: `${y}px`,
            left: `${x}px`,
            transform: 'translate(-50%,-50%)'
        }}
    ></div>
  )
}

export default Circle