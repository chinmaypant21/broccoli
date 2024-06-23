import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

function Throttle() {
    const [value, setValue] = useState('');
    const [output, setOutput] = useState('');
    const id = useRef(null);
  
    function handleChange(e){
      setValue(e.target.value)
    }
  
    useEffect(() => {
      if(!value) return;
  
      if(!id.current){
        id.current = setTimeout(() => {
          setOutput(value);
          id.current = null;
        }, 1000)
      }
  
      const timerId = setTimeout(() => {
        setOutput(value)
      }, 1000)
  
      return () => {
        clearTimeout(timerId);
      }
  
    },[value])
  
    return (  
        <div>
          <span>Throttle</span>
          <input value={value} onChange={handleChange} type="text" />
          <span>{output}</span>
        </div>
    )
}

export default Throttle;