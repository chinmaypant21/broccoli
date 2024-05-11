import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import './App.css'

type StructureType = {
  type: 'file' | 'folder',
  name: string,
  children? : Array<StructureType>
}

const structureData: StructureType = {
  type: 'folder',
  name: 'MainFolder',
  children: [
    {
      type: 'file',
      name: 'script.js'
    },
    {
      type: 'file',
      name: 'index.html'
    },
    {
      type: 'folder',
      name: 'Assets Folder',
      children: [
        {
          type: 'file',
          name: 'style.css'
        },
        {
          type: 'file',
          name: 'logo.jpeg'
        }
      ]
    },
    {
      type: 'folder',
      name: 'lib',
      children: [
        {
          type: 'file',
          name: 'lib.xml'
        },
      ]
    }
  ]
}

function App() {
  const [structure, setStructure] = useState<StructureType>(structureData);
  const [updatedStructure, setUpdatedStructure] = useState<StructureType | null>(null);

  useEffect(() => {
    if(updatedStructure){
      setStructure(updatedStructure)
    }
  },[updatedStructure])

  return (
    <div>
      <Folder data={structure} updateStructure={setUpdatedStructure} />
    </div>
  )
}

function Folder({data, updateStructure}: {data: StructureType, updateStructure: any}){
  const [isOpen, setIsOpen] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const inputRef = useRef<any>(null);

  function handleClick(){
    setIsOpen(prev => !prev)
  }

  function addFolder(){

  }

  function addFile(){
    setAddNew(true)
  }

  function handleEnterInput(e: KeyboardEvent<HTMLInputElement>){
    if(e.key === 'Enter'){
      setAddNew(false)
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  },[addNew])

  return (
    <div
      className='folder-container'
    >
      <div
        className={`folder-title ${isOpen ? 'folder-open' : ''}`}
        onClick={handleClick}
      >
        <span>
          <span>{isOpen ? 'v' : '>'}</span>&nbsp;
          <span>{data.name}</span>
        </span>

        <span onClick={(e) => {e.stopPropagation()}} className='btn-container'>
          <button onClick={addFolder} className='add-btn'>Folder +</button>
          <button onClick={addFile} className='add-btn'>File +</button>
        </span>
      </div>

      {
        addNew &&
        <div>
          <input
            ref={inputRef}
            onBlur={() => setAddNew(false)}
            onKeyDown={handleEnterInput}
            type="text" 
          />
        </div>
      }

      <div className='folder-content'>
      {
        isOpen && data.children?.map(element => (
          (element.type === 'file') 
          ? <File title={element.name}/>
          : <Folder data={element} />
        ))
      }
      </div>

    </div>
  )
}

function File({title}: any){
  return (
    <div className='file-container'>
      {/* <span></span> */}
      <span>{title}</span>
    </div>
  )
}

export default App

//How to pass prop without {}
