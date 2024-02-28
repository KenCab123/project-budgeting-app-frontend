import React from 'react'
import { Link } from 'react-router-dom'


export const NavBar = ({allTransactions}) => {

    const handleTotalPrice = (amount) => {
        if(amount <= 0) return <h2>Total Price: <span style={{color: 'red'}}>${amount}</span></h2>
        if(amount < 100 && amount > 0) return <h2>Total Price: <span style={{color: 'yellow'}}>${amount}</span></h2>
        return <h2>Total Price: <span style={{color: 'green'}}>${amount}</span></h2>
    }


  return (
    <>
    <h1>Budgeting App</h1>
    
    <Link to='/new'>
    <button>Create</button>
    </Link>

    {handleTotalPrice(allTransactions.reduce((acc, curr) => acc + curr.amount,0))}
    </>
  )
}
