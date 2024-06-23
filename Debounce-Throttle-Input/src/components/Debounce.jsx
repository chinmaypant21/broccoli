import { useEffect } from "react";
import { useState } from "react";

function Debounce() {
    const [value, setValue] = useState('');
    const [output, setOutput] = useState('');


    function handleChange(e) {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (!value) return;

        const id = setTimeout(() => {
            setOutput(value)
        }, 1000)
  
        return () => {
            clearTimeout(id);
        }

    }, [value])

return (
    <div>
        <span>Debounce</span>
        <input value={value} onChange={handleChange} type="text" />
        <span>{output}</span>
    </div>
    )
}

export default Debounce;