import axios from 'axios'
import React from 'react'
import { useState, useContext } from 'react'
import { createTodoService } from '../services/todo.services'

import { ThemeContext } from "../context/theme.context"

function AddForm(props) {

  const {switchThemeBtn} = useContext(ThemeContext)

  const [titleInput, setTitleInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [isUrgentInput, setIsUrgentInput] = useState(false)

  const handleTitleChange = (event) => setTitleInput(event.target.value)
  const handleDescriptionChange = (event) => setDescriptionInput(event.target.value)
  const handleIsUrgentChange = (event) => setIsUrgentInput(event.target.checked)
  const handleSubmit =async (event) => {

    event.preventDefault()


    const newTodo = {
      title: titleInput,
      description: descriptionInput,
      isUrgent: isUrgentInput
    }

    try {
      
      //await axios.post("http://localhost:5005/api/todos", newTodo)
      // si JS llega a este punto es porque el ToDo se ha creado correctamente

      //pasamos el objeto como parametro
      await createTodoService(newTodo)

      //tenemos que indicarle a react, que la lista se ha actualizado

      // Manualmente actualizaremos la lista desde el server
      props.actualizarLista()
    } catch (error) {
      console.log(error);
    }


  }
  return (
    <div>
      <form >

      <label htmlFor="title">Titulo:</label>
      <input  value={titleInput} type="text" name="title" onChange={handleTitleChange}/>
      <br />
      
      <label htmlFor="description">descripcion</label>
      <input value={descriptionInput} type="text" name="description" onChange={handleDescriptionChange}/>
      <br />

      <label htmlFor="isUrgent">Es Urgente:</label>
      <input checked={isUrgentInput} type="checkbox" name="isUrgent" onChange={handleIsUrgentChange}/>
      <br />

      <button onClick={handleSubmit}>Agregar</button>

      </form>
    </div>
  )
}

export default AddForm