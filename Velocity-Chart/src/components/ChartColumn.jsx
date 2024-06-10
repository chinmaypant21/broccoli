import React from 'react'

const ChartColumn = ({data}) => {
  return (
    <div
        className='column'
        style={{
            '--height': `${data.value}%`,
            '--color' : `${data.color}`
        }}
    >
        <ToolTip title={`${data.title} - ${data.value}`} />
    </div>
  )
}

const ToolTip = ({title}) => {
    return (
        <div className='tooltip'>
            {title}
        </div>
    )
}

export default ChartColumn