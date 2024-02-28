import React from 'react'
import { Link } from 'react-router-dom'

export const Transactions = ({allTransactions}) => {

    const handleTotalPrice = (amount) => {
        if(amount < 0) return <h2>Total Price: <span style={{color: 'red'}}>${amount}</span></h2>
        if(amount < 100 && amount > 0) return <h2>Total Price: <span style={{color: 'yellow'}}>${amount}</span></h2>
        return <h2>Total Price: <span style={{color: 'green'}}>${amount}</span></h2>
    }
    
  return (
    <div>
        {/* <h2>Total Price: ${allTransactions.reduce((acc, curr) => acc + curr.amount,0)}</h2> */}
        {handleTotalPrice(allTransactions.reduce((acc, curr) => acc + curr.amount,0))}
    {allTransactions.map(({id, item_name, amount, date, from, category}) => {
        return (
            <Link to={`/${id}`} key={id}>
            <h1>{item_name}</h1>
            <p>Price: ${amount}</p>
            <p>Date: {date}</p>
            <p>From: {from}</p>
            <p>Category: {category}</p>
        </Link>
        )
    })}
    </div>
  )
}
