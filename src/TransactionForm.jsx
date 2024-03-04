import { useEffect, useState } from 'react'
import { Link , useNavigate, useParams} from 'react-router-dom'
import "./TransactionForm.css"

export const TransactionForm = ({setAllTransactions}) => {
    // Created state that signifies if the checkbox is checked
    const[isChecked, setIsChecked] = useState(true)

    // Created state for transaction that will be created/edited
    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: 0,
        date: "",
        from: "",
        category: "",
        isChecked: isChecked
    })
    // Grab id from URL
    const {id} = useParams()
    // Declare useNavigate()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // if isChecked is false or if the form is set to withdraw, then add a negative sign to the amount
        if(!isChecked){
            transaction.amount = -transaction.amount
        }
        if(id) {
            // If there is an id found in the useParams, create options object that sets the method to PUT which signifies edit.
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(transaction)
            }

            // fetch for transaction by id 
            fetch(`http://localhost:3333/api/transactions/${id}`, options).then(res => res.json()).then(data =>{
                // if the validationForm in the backend is not passed, then it would return a message. If data has a message key, then alert that there are invalid inputs
                if (data.message) {
                    alert("Invalid Inputs")
                  } else {
                    // else setAllTransactions to the updated transactions
                    setAllTransactions(data.transactions)
                    // navigate back to home
                    navigate("/");
                  }
                })
                .catch((err) => console.log(err));
        } else {
            // create options that sets the method to POST which signifies create
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(transaction)
            };

            // Fetch for transactions
            fetch('http://localhost:3333/api/transactions', options).then(res => res.json()).then(data => {
            // if message is returned by validateForm in backend
              if (data.message) {
                // alert that the inputs are invalid and reset the transation form
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
                // Else set allTransactions to updated data.transactions and navigate home
                setAllTransactions(data.transactions)
                navigate("/");
              }
            })
            .catch((err) => console.log(err));
        }
        
    }


    const handleChange = (e) => {
        // Check if the value starts with -, if it does it will essentially erase that so you're not able to type in a negtive symbol.
        if (e.target.value.startsWith("-")) {
            e.target.value = e.target.value.slice(1);
        }
        // destructure the name, value, and type
        const { name, value, type } = e.target;

        // this checks if the type is a number then turn it into a number 
        const parsedValue = type === 'number' ? parseFloat(value) : value;

        // setTransaction to the inputs
        setTransaction(prevTransaction => ({
            ...prevTransaction,
            [name]: parsedValue
        }));
    }

    const toggleSwitch = (e) => {
        // changes status of the checkbox state
        setIsChecked(!isChecked)
    }

    
    useEffect(() => {
        // if id is found in the URL
        if(id) {
            // fetch for transaction by id 
            fetch(`http://localhost:3333/api/transactions/${id}`).then(res => res.json()).then(data => {
                // set transaction to transaction returned by fetch
                setTransaction(data.transaction)

                // if the price is negative, set the state of checked to false and set the amount to a positive value
                if(data.transaction.amount < 0) {
                    setIsChecked(false)
                    data.transaction.amount = Math.abs(data.transaction.amount)
                }
            })
        } else {
            // else set Transaction form to empty inputs
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

    
    // In the form i set the values to each key in transaction state for the editing functionality.
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
