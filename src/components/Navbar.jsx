import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/todos">ToDos</Link>
    </div>
  )
}

export default Navbar