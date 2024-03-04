import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import "./TransactionDetails.css"

export const TransactionDetails = ({setAllTransactions, handleDate}) => {
    // Created a state for a transactions detail
    const [transactionDetail, setTransactionDetail] = useState()

    // Grab id from the URL
    const {id} = useParams()

    // Declare useNavigate()
    const navigate = useNavigate()
    
    const handleDelete = (id) => {
        // created options object that specifies the method
        const options = {
            method: "DELETE"
        }
        // Fetch and set allTransactions to the updated data.transactions
        fetch(`http://localhost:3333/api/transactions/${id}`, options).then(res => res.json()).then(data => setAllTransactions(data.transactions))

        // alert that transaction was deleted
        alert(`Transaction Deleted!`)

        // Navigate back home
        navigate('/')
    }

    useEffect(() => {
        // fetches for transaction then sets Transaction detail to tha single transaction
        fetch(`http://localhost:3333/api/transactions/${id}`).then(res => res.json()).then(data => setTransactionDetail(data.transaction))
    }, [id])

    // If the transaction exists return null
    if(!transactionDetail) return null

  return (
    <div className='details'>
        <h1>Transaction Details</h1>
        <div>
        <h2>{transactionDetail.item_name[0].toUpperCase() + transactionDetail.item_name.slice(1)}</h2>
        <p>Amount: ${transactionDetail.amount}</p>
        <p>Date: {handleDate(transactionDetail.date)}</p>
        <p>From: {transactionDetail.from}</p>
        <p>Category: {transactionDetail.category}</p>
        </div>
        <div className='btns'>
        <Link to={`/edit/${transactionDetail.id}`}>
            <button>Edit</button>
        </Link>
            <button onClick={() => handleDelete(transactionDetail.id)}>Delete</button>
        <Link to='/'>
            <button>Home</button>
        </Link>
        </div>
    </div>
  )
}
