import React from 'react'
import { Link } from 'react-router-dom'
import "./Transaction.css"

export const Transactions = ({allTransactions, handleDate}) => {

  return (
    <div className='all-t'>
    {allTransactions.map(({id, item_name, amount, date, from, category}) => {
        return (
          <div key={id}>
            <Link to={`/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h1>{item_name[0].toUpperCase() + item_name.slice(1)}</h1>
            <p>From: {from}</p>
            <p>Price: ${amount}</p>
            </Link>
          </div>
        )
    })}
    </div>
  )
}
