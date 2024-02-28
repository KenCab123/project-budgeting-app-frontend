import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
        <p>Name: {transactionDetail.item_name}</p>
        <p>Amount: {transactionDetail.amount}</p>
        <p>Date: {transactionDetail.date}</p>
        <p>From: {transactionDetail.from}</p>
        <p>Category: {transactionDetail.category}</p>
    </div>
  )
}
