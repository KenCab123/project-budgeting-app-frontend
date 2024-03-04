import React from 'react'
import { Link } from 'react-router-dom'
import "./Transaction.css"

export const Transactions = ({allTransactions}) => {

  return (
    <div className='all-t'>
    {allTransactions.map(({id, item_name, amount, from}) => {
        return (
          <div key={id}>
            <Link to={`/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h1>{item_name[0].toUpperCase() + item_name.slice(1)}</h1>
            <p>From: {from[0].toUpperCase() + from.slice(1)}</p>
            <p>Price: ${amount}</p>
            </Link>
          </div>
        )
    })}
    </div>
  )
}
