import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'

export const TransactionForm = ({setAllTransactions}) => {
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState({
            item_name: "",
            amount: 0,
            date: "",
            from: "",
            category: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(transaction)
        };

        fetch('http://localhost:3333/api/transactions', options).then(res => res.json()).then(data => {setAllTransactions(data.transactions)
        navigate('/')})
    }

    
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? parseFloat(value) : value;        setTransaction(prevTransaction => ({
            ...prevTransaction,
            [name]: parsedValue
    }));


    }
  return (
    <div>
        <h1>Transaction Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                Name:
                <input 
                 onChange={handleChange}
                 type="text"
                 id='item_name'
                 name='item_name'
                 value={transaction.item_name} />
            </label>
            <label htmlFor="amount">
                Amount:
                <input 
                 onChange={handleChange}
                 type="number"
                 id='amount'
                 name='amount'
                 value={transaction.amount} />
            </label>
            <label htmlFor="date">
                Date:
                <input 
                 onChange={handleChange}
                 type="date"
                 id='date'
                 name='date'
                 value={transaction.date} />
            </label>
            <label htmlFor="from">
                From:
                <input 
                 onChange={handleChange}
                 type="text"
                 id='from'
                 name='from'
                 value={transaction.from} />
            </label>
            <label htmlFor="category">
                Category:
                <input 
                 onChange={handleChange}
                 type="text"
                 id='category'
                 name='category'
                 value={transaction.category} />
            </label>
            <button>Submit</button>
        </form>
        <Link to='/'>
        <button>Cancel</button>
        </Link>
    </div>
    // <div>
    //   <h1>BookMark Form</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="name">
    //       Name:
    //       <input
    //         onChange={handleChange}
    //         type="text"
    //         id="name"
    //         name="name"
    //         // value={bookmark.name}
    //       />
          
    //     </label>
    //     <label htmlFor="url">
    //       Url:
    //       <input
    //         onChange={handleChange}
    //         type="text"
    //         id="url"
    //         name="url"
    //         // value={bookmark.url}
    //       />
    //     </label>
    //     <label htmlFor="category">
    //       Category:
    //       <input
    //         onChange={handleChange}
    //         type="text"
    //         id="category"
    //         name="category"
    //         // value={bookmark.category}
    //       />
    //     </label>
    //     <button>Submit</button>
    //   </form>
    //     <Link to={`/`}>
    //     <button>Cancel</button>
    //     </Link>
    // </div>
  )
}
