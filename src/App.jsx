import React, { useEffect, useState, useRef } from 'react'
import { Transactions } from './Transactions'
import { Routes, Route } from 'react-router-dom'
import { TransactionDetails } from './TransactionDetails'
import { TransactionForm } from './TransactionForm'
import { NavBar } from './NavBar'

const App = () => {
  // Created allTransactions state that iwll hold all of the transactions
  const [allTransactions, setAllTransactions] = useState([])
  // Created price state to hold price
  const [price, setPrice] = useState()

  const handleTotalPrice = (amount) => {
    // set default color to green
    let color = 'green';
        // if the amount is less than or equal to 0 change color to red
        if (amount <= 0) {
          color = 'red';
        } else if (amount < 100) {
          // if the amount is less than 100 change color to yellow
            color = 'yellow';
        }

        return (
          // return h2 with color attribute and amount
            <h2>Total Price: <span style={{color: color}}>${amount}</span></h2>
        );
  }
  
  
  const handleDate = (date) => {
    // Create a new Date object and pass the parameter date
    const convertedDate = new Date(date)
    // Create options obj that specifies the format of the date
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    // return toLocaleDateString method of the Date object to convert the date into a string representation according to the specified options. 
    return convertedDate.toLocaleDateString('en-US', options)
  }   
  
  useEffect(() => {
    // Fetch for transactions and setAllTransactions to data.transactions
    fetch(`http://localhost:3333/api/transactions`).then(res => res.json()).then(data => setAllTransactions(data.transactions))
  }, [])

  return <div>
    <NavBar allTransactions={allTransactions} handleTotalPrice={handleTotalPrice} price={price} setPrice={setPrice}/>
    <Routes>
      <Route path='/' element={<Transactions allTransactions={allTransactions}/>}/>
      <Route path='/:id' element={<TransactionDetails setAllTransactions={setAllTransactions} handleDate={handleDate}/>}/>
      <Route path='/edit/:id' element={<TransactionForm setAllTransactions={setAllTransactions}/>}/>
      <Route path='/new' element={<TransactionForm setAllTransactions={setAllTransactions}/>}/>
    </Routes>
    </div>
}

export default App
