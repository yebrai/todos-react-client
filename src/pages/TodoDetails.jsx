import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import { deleteTodoService, getTodoDetailsService } from '../services/todo.services'

function TodoDetails() {

  //configuraciones de hooks
  const navigate = useNavigate() // todos los hooks se invocan
  // navigate es el elemento que nos permite redireccionar al usuario en react-router-dom

  // buscar el id por parametro dinamico
  const { todoId } = useParams()

  // 1. crear el estado donde estaran los detalles
  const [ details, setDetails ] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  // 2. buscar la informacion del servidor/bd con el useEffect
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      //const response = await axios.get(`http://localhost:5005/api/todos/${todoId}`) // ????
      const response = await getTodoDetailsService(todoId)
      console.log(response)
      // 3. actualizar el estado con la data
      setDetails(response.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }


  // 4. clausula de guardia de buscando
  if (isFetching) {
    return <p>...Loading</p>
  }

  const handleDelete = async() => {
    
    try {
      //1 contactar al backend para borrar un todo por su id
      //await axios.delete(`http://localhost:5005/api/todos/${todoId}`)
      await deleteTodoService(todoId)
      console.log("elemento borrado")
      //2 redireccionar al usuario a "/todos"
      navigate("/todos")
    } catch (error) {
      console.log(error)
      //cada vez que tenemos un catch/error, es decir, hay un error de desarrollo
      //entonces podemos redireccionar a una pagina de error 500
      navigate("/error")
      // los catch consideran esto y reenviar a "/error"
    }

  }


  // 5. renderizar

  return (
    <div>
    
    <h4>Detalles del ToDo</h4>

    <div>
      <h5>{details.title}</h5>
      <p>{details.description}</p>
      <p>Es urgente: {details.isUrgent ? "YAAAS" : "meh"}</p>

      <button onClick={handleDelete}>Borrar</button>
      
      <Link to={`/todos/${todoId}/edit`}><button>Ir a editar</button></Link>
    </div>
    
    
    </div>
  )
}

export default TodoDetails