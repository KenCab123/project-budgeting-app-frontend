import React from 'react'
import { Link } from 'react-router-dom'

export const Transactions = ({allTransactions, handleDate}) => {

  return (
    <div>
    {allTransactions.map(({id, item_name, amount, date, from, category}) => {
        return (
            <Link to={`/${id}`} key={id}>
            <h1>{item_name[0].toUpperCase() + item_name.slice(1)}</h1>
            <p>Price: ${amount}</p>
            <p>From: {from}</p>
        </Link>
        )
    })}
    </div>
  )
}
