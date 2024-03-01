import React, { useEffect, useState, useRef } from 'react'
import { Transactions } from './Transactions'
import { Routes, Route, Link } from 'react-router-dom'
import { TransactionDetails } from './TransactionDetails'
import { TransactionForm } from './TransactionForm'
import { NavBar } from './NavBar'

const App = () => {
  const [allTransactions, setAllTransactions] = useState([])
  const [price, setPrice] = useState()

  const handleTotalPrice = (amount) => {
    let color = 'green';
        if (amount <= 0) {
            color = 'red';
        } else if (amount < 100) {
            color = 'yellow';
        }

        return (
            <h2>Total Price: <span style={{color: color}}>${amount}</span></h2>
        );
  }
  
  
  const handleDate = (date) => {
    const convertedDate = new Date(date)
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return convertedDate.toLocaleDateString('en-US', options)
  }   
  
  useEffect(() => {
    fetch(`http://localhost:3333/api/transactions`).then(res => res.json()).then(data => setAllTransactions(data.transactions))
  }, [])

  return <div>
    <NavBar allTransactions={allTransactions} handleTotalPrice={handleTotalPrice} price={price} setPrice={setPrice}/>
    <Routes>
      <Route path='/' element={<Transactions allTransactions={allTransactions} handleDate={handleDate}/>}/>
      <Route path='/:id' element={<TransactionDetails setAllTransactions={setAllTransactions} handleDate={handleDate}/>}/>
      <Route path='/edit/:id' element={<TransactionForm setAllTransactions={setAllTransactions}/>}/>
      <Route path='/new' element={<TransactionForm allTransactions={allTransactions} setAllTransactions={setAllTransactions} handleTotalPrice={handleTotalPrice} price={price} setPrice={setPrice}/>}/>
    </Routes>
    
    </div>
}

export default App
