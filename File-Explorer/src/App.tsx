import { Fragment, KeyboardEvent, useEffect, useRef, useState } from 'react'
import './App.css'

let counter = 100;

function generateId(){
  return ++counter;
}

type StructureType = {
  id: any,
  type: 'file' | 'folder',
  name: string,
  children? : Array<StructureType>
}

const structureData: StructureType = {
  id: 1,
  type: 'folder',
  name: 'MainFolder',
  children: [
    {
      id: 2,
      type: 'file',
      name: 'script.js'
    },
    {
      id: 3,
      type: 'file',
      name: 'index.html'
    },
    {
      id: 6,
      type: 'folder',
      name: 'Assets Folder',
      children: [
        {
          id: 4,
          type: 'file',
          name: 'style.css'
        },
        {
          id: 5,
          type: 'file',
          name: 'logo.jpeg'
        }
      ]
    },
    {
      id: 7,
      type: 'folder',
      name: 'lib',
      children: [
        {
          id: 8,
          type: 'file',
          name: 'lib.xml'
        },
      ]
    }
  ]
}

function App() {
  const [structure, setStructure] = useState<StructureType>(structureData);

  return (
    <div>
      <Folder data={structure} setStructure={setStructure} />
    </div>
  )
}

function Folder({data, setStructure}: {data: StructureType, setStructure: any}){
  const [isOpen, setIsOpen] = useState(false);
  const [addNew, setAddNew] = useState<any>();

  const inputRef = useRef<any>(null);

  function updateStructureCallback(newStructure: StructureType){
    const str = structuredClone(data);

    str.children = str.children?.map(childStructure => {
      return (newStructure.id === childStructure.id) ? newStructure : childStructure;
    })

    setStructure(str);
  }

  function handleClick(){
    setIsOpen(prev => !prev)
  }

  function addFolder(){
    setAddNew('folder')
  }

  function addFile(){
    setAddNew('file')
  }
  
  function handleEnterInput(e: KeyboardEvent<HTMLInputElement>){
    if(e.key === 'Enter'){
      let str = structuredClone(data)
      
      const newData: any = {id: generateId(), type: addNew, name: inputRef.current.value}
      if(addNew === 'folder'){
        newData.children = []
      }

      str.children?.push(newData)
      setStructure(str);
      setAddNew('')
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
          <Fragment key={element.id}>
          {
            (element.type === 'file') 
            ? <File title={element.name}/>
            : <Folder data={element} setStructure={updateStructureCallback} />
          }
          </Fragment>
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
