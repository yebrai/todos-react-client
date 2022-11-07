import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTodoDetailsService,
  updateTodoService,
} from "../services/todo.services";

function TodoEdit() {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isUrgentInput, setIsUrgentInput] = useState(false);

  const handleTitle = (event) => setTitleInput(event.target.value);
  const handleDescriptionChange = (event) =>
    setDescriptionInput(event.target.value);
  const handleIsUrgentchange = (event) =>
    setIsUrgentInput(event.target.checked);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getTodoDetailsService(todoId);
      console.log(response);

      setTitleInput(response.data.title);
      setDescriptionInput(response.data.description);
      setIsUrgentInput(response.data.isUrgent);
    } catch (error) {
      navigate(error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      // recopilamos los valores a actualizar
      const updatedTodo = {
        title: titleInput,
        description: descriptionInput,
        isUrgent: isUrgentInput,
      };
      //llamamos al servicio update pasando el Id y la data a actualizar
      await updateTodoService(todoId, updatedTodo);
      //redireccionar
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Formulario Editar</h3>

      <form>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          name="title"
          value={titleInput}
          onChange={handleTitle}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={descriptionInput}
          onChange={handleDescriptionChange}
        />
        <br />
        <label htmlFor="isUrgent">Es Urgente</label>
        <input
          type="checkbox"
          name="isUrgent"
          checked={isUrgentInput}
          onChange={handleIsUrgentchange}
        />
        <br />
        <button onClick={handleUpdate}>Editar ToDo</button>
      </form>
    </div>
  );
}

export default TodoEdit;
