import React from 'react'
import { Link } from 'react-router-dom'

export const Transactions = ({allTransactions, handleDate}) => {

  return (
    <div>
    {allTransactions.map(({id, item_name, amount, date, from, category}) => {
        return (
            <Link to={`/${id}`} key={id}>
            <h1>{item_name}</h1>
            <p>Price: ${amount}</p>
            <p>Date: {handleDate(date)}</p>
            <p>From: {from}</p>
            <p>Category: {category}</p>
        </Link>
        )
    })}
    </div>
  )
}
