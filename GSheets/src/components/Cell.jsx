import React, { useRef } from 'react'

const Cell = ({setActive}) => {
    const ref = useRef(null);
    const inputRef = useRef(null);

    function handleDoubleClick(e) {
        inputRef.current.classList.add('cell-input-active');
        inputRef.current.focus();
    }
    
    function handleBlur(e){
        inputRef.current.classList.remove('cell-input-active')
    }

    function handleClick(e){
        setActive(ref)
    }

    return (
        <div
            ref={ref}
            tabIndex={0}
            className='sheet-cell'
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
        >
            <input ref={inputRef} />
        </div>
    )
}

export default Cell