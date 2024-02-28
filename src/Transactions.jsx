import React from 'react'
import { Link } from 'react-router-dom'

export const Transactions = ({allTransactions}) => {
    // const totalPrice = 
  return (
    <div>
        <h2>Total Price: ${allTransactions.reduce((acc, curr) => acc + curr.amount,0)}</h2>
        {/* <h2>{allTransactions.map(t => console.log(t.amount))}</h2> */}
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
