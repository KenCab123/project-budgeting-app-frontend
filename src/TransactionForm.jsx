import React, { useEffect, useState } from 'react'
import { Link , useNavigate, useParams} from 'react-router-dom'
import "./TransactionForm.css"

export const TransactionForm = ({allTransactions, setAllTransactions, setPrice, price, handleTotalPrice}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const[isChecked, setIsChecked] = useState(true)
    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: 0,
        date: "",
        from: "",
        category: "",
        isChecked: isChecked
    })

    // useEffect (() => {
    //     if(transaction.amount < 0) {
    //         setTransaction(prevTransaction => ({
    //             ...prevTransaction,
    //             isChecked: false
    //         }));
            
    //         console.log(`negative`)
    //     }
    //         // console.log(transaction.isChecked)
    // },[transaction.amount])

    const handleSubmit = (e) => {
        e.preventDefault()
    
        if(!isChecked){
            transaction.amount = -transaction.amount
        }


        if(id) {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(transaction)
            }

            fetch(`http://localhost:3333/api/transactions/${id}`, options).then(res => res.json()).then(data =>{
                if (data.message) {
                    alert("Invalid Inputs")
                  } else {
                    setAllTransactions(data.transactions)
                    navigate("/");
                  }
                })
                .catch((err) => console.log(err));
        } else {

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(transaction)
            };
    
            fetch('http://localhost:3333/api/transactions', options).then(res => res.json()).then(data => {
              if (data.message) {
                alert("Invalid Inputs")
                setTransaction({
                    item_name: "",
                    amount: 0,
                    date: "",
                    from: "",
                    category: "",
                    isChecked: true
            })
              } else {
                setAllTransactions(data.transactions)
                navigate("/");
              }
            })
            .catch((err) => console.log(err));
        }
        
    }


    const handleChange = (e) => {
        if (e.target.value.startsWith("-")) {
            e.target.value = e.target.value.slice(1);
        }
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? parseFloat(value) : value;
        setTransaction(prevTransaction => ({
            ...prevTransaction,
            [name]: parsedValue
        }));
    }

    const toggleSwitch = (e) => {
        setIsChecked(!isChecked)
        console.log(!isChecked)
    }

    
    useEffect(() => {
        if(id) {
            fetch(`http://localhost:3333/api/transactions/${id}`).then(res => res.json()).then(data => {
                setTransaction(data.transaction)

                if(data.transaction.amount < 0) {
                    setIsChecked(false)
                    data.transaction.amount = Math.abs(data.transaction.amount)
                }
            })
        } else {
            setTransaction({
                item_name: "",
                amount: 0,
                date: "",
                from: "",
                category: "",
                isChecked: true
            })
        }
    }, [id])

    

  return (
    <div className='transaction-form'>
        <h1>Transaction Form</h1>
        <form onSubmit={handleSubmit} className='form'>
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
                 value={transaction.amount}
                 min="0" />
            </label>
            <input type="checkbox" id='checkbox' onChange={toggleSwitch} checked={isChecked ? true : false} className='checkbox' />
            <label htmlFor="checkbox" className='checkbox-label' id='checkbox-label'>{isChecked ? 'Deposit' : 'Withdraw'}</label>
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
                Categories:
                <input 
                 onChange={handleChange}
                 type="text"
                 id='category'
                 name='category'
                 value={transaction.category} />
            </label>
            <button className='submit'>Submit</button>
        </form>
        <Link to='/'>
        <button className='cancel'>Cancel</button>
        </Link>
    </div>
  )
}
