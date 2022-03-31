import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLocalStorage = () => {
  let list =  localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else {
    return [] 
  }
}


function App() {

const[name,setName]  = useState('')
const [list,setList] = useState(getLocalStorage())
const [isEditing,setIsEditing]  = useState(false)
const[editId,setIsEditId] = useState(null)
const[alert,setAlert] = useState({
  show:false, 
  msg:"",
  type:""})

const handleSubmit =(e) =>{
  e.preventDefault()
  console.log("hello")
  if(!name){
    //alert
    showAlert(true,"danger","enter a value")
  }else if(name && isEditing){
    //
    setList(list.map((item) =>{
      if(item.id === editId){
        return {...item,title:name}
      }
      return item 
    })) 
    setName('')   
    setIsEditId(null)
    setIsEditing(false)
    showAlert(true,"success","value changed")    
  }else{
     //
     showAlert(true,"success","added successfully")
     const newItem ={id:new Date().getTime().toString(),title:name};
     setList([...list,newItem])
     setName('')
  }
}
//showAlert
const showAlert = (show=false,type="",msg="") => {
  setAlert({show,type,msg})
}
//clear All
const clearList = () => {
  showAlert(true,"danger","empty")
  setList([])
}
//remove 
const removeItem = (id) =>{
  showAlert(true,"danger","removed");
  setList(list.filter((item) => item.id !== id))
}
//editItem
const editItem =(id) =>{
  const specificItem = list.find((item)=> item.id === id);
  setIsEditing(true)
  setIsEditId(id)
  setName(specificItem.title)
}
useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(list))
},[list])


  return(
<section className='section-center'>
  <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert}  removeAlert ={showAlert}/>  }
      <h3>Grocery Add</h3>
      <div className='form-control'>
          <input 
          type="text" 
          className='grocery' 
          placeholder='Add item eg:"milk"' 
          value={name}
          onChange={(e)=> setName(e.target.value)}
          />
          <button type="submit" className='submit-btn'>{isEditing ? "edit" : "submit" }</button>
      </div>
  </form>
  {list.length > 0 && (
    <div className='grocery-container'>
    <List items={list} removeItem={removeItem} list={list} editItem={editItem}/>
    <button className='clear-btn' onClick={clearList}>clear items</button>
  </div> 
  )}
  

</section>
  )
}

export default App
