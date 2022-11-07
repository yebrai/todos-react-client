import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import AddForm from "../components/AddForm"

import {getAllTodoService} from "../services/todo.services"

function TodoList() {

  // 1. crear el estado que almacena la data de la API
  const [ list, setList ] = useState([])
  const [ isFetching, setIsFetching ] = useState(true)

  // 2. llamar a la API
  useEffect(() => {
    getData()
  }, []) // IMPORTANTE EL ARRAY VACIO (componentDidMount)

  const getData = async () => {
    try {
      // const response = await axios.get("http://localhost:5005/api/todos")
      const response = await getAllTodoService()
      // 3. guardar la informacion en estado
      console.log(response)
      setList(response.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }


  // 4. clausula de guardia con el ...buscando
  if (isFetching === true) {
    return <h3>....buscando</h3>
  }

  // 5. renderizar a data

  return (
    <div>

      <AddForm actualizarLista={getData}/>
      

      <h4>Lista de ToDos</h4>

      {list.map((eachTodo) => {
        return (
          <p key={eachTodo._id}>
            <Link to={`/todos/${eachTodo._id}/details`}>{eachTodo.title}</Link>
          </p>
        )
      })}

    </div>
  )
}

export default TodoList