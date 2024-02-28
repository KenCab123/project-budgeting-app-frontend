import React from 'react'
import { Link } from 'react-router-dom'


export const NavBar = () => {
  return (
    <>
    <h1>Budgeting App</h1>
    
    <Link to='/new'>
    <button>Create</button>
    </Link>
    </>
  )
}
