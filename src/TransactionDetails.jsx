import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export const TransactionDetails = () => {
    const {id} = useParams()
    const [transactionDetail, setTransactionDetail] = useState()

    useEffect(() => {
        fetch(`http://localhost:3333/api/transactions/${id}`).then(res => res.json()).then(data => setTransactionDetail(data.transaction))
    }, [id])

    if(!transactionDetail) return null


  return (
    <div>
        <h1>Transaction Details</h1>
        <h2>{transactionDetail.item_name}</h2>
        <p>Amount: {transactionDetail.amount}</p>
        <p>Date: {transactionDetail.date}</p>
        <p>From: {transactionDetail.from}</p>
        <p>Category: {transactionDetail.category}</p>
        <Link to='/'>
            <button>Home</button>
        </Link>
    </div>
  )
}
