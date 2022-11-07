
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import TodoList from './pages/TodoList'
import TodoDetails from './pages/TodoDetails'
import Error from './pages/Error'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import TodoEdit from './pages/TodoEdit';

import { useContext } from 'react'
import { ThemeContext } from "./context/theme.context"

function App() {

  const {switchTheme, switchThemeBtn, toggleTheme} = useContext(ThemeContext)
 
  return (
    <div className="App" style={switchTheme()}>

    <button style={switchThemeBtn()} onClick={toggleTheme}>Cambiar Tema</button>

    <Navbar />

    <Routes>

    <Route path='/' element={<Home />}/>
    <Route path='/todos' element={ <TodoList /> }/>
    <Route path='/todos/:todoId/details' element={<TodoDetails />}/>
    <Route path='/todos/:todoId/edit' element={<TodoEdit />}/>

    {/* Rutas de errores */}

    <Route path='/error' element={ <Error/>}/>
    <Route path='/error' element={ <NotFound/>}/>

    </Routes>

    </div>
  );
}

export default App;
