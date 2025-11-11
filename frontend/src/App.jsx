import React, { useState } from 'react'
import TableList from './components/Tablelist'
import NavBar from './components/NavBar'
import ModalForm from './components/ModalForm'


const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setmodalMode] = useState('add')

  const handleOpen = (mode) =>{
    setIsOpen(true);
  }
  const handleSubmit  = () =>{
    if (modalMode == "add"){
      console.log("Modal mode Add")
    }else{
      console.log("Modal mode Edit")
    }
  }
  return (
    <div className=' min-h-screen bg-slate-300'>
      <NavBar onOpen={()=> handleOpen('add')}/>
      <TableList />
      <ModalForm isOpen={isOpen} onClose={()=> setIsOpen(false)} OnSubmit={handleSubmit}/>
    </div>
  )
}

export default App
