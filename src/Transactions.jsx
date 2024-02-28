import React from 'react'
import { Link } from 'react-router-dom'

export const Transactions = ({allTransactions}) => {
  return (
    <div>
    {allTransactions.map(({id, item_name, amount, date, from, category}) => {
        return (
            <Link to={`/${id}`} key={id}>
            <h1>{item_name}</h1>
            <p>{amount}</p>
            <p>{date}</p>
            <p>{from}</p>
            <p>{category}</p>
        </Link>
        )
    })}
    </div>
  )
}
