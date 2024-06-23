import React, { useState } from 'react'

function formatNumber(value) {
    let val = value.replaceAll(/[^\d]+/g,'');
    // let val = value.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');
    if (val.length > 10) {
        return null;
    }

    let newVal = ''

    if (val.length > 3) {
        newVal = `(${val.slice(0, 3)})`;

        if (val.length > 6) {
            newVal += ` ${val.slice(3, 6)}-${val.slice(6)}`
        } else {
            newVal += ` ${val.slice(3)}`
        }
    }

    else {
        newVal = val;
    }

    return newVal;
}

const Input1 = () => {
    const [value, setValue] = useState('');

    function handleInputChange(e){
      const val = formatNumber(e.target.value);
      if(val !== null){
        setValue(val);
      }
    }
  
    return (
      <div>
        <input value={value} onChange={handleInputChange} type="text" />
      </div>
    )
}

export default Input1