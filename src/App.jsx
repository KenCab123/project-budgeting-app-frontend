import React, { useEffect, useState } from 'react'
import { Transactions } from './Transactions'
import { Routes, Route, Link } from 'react-router-dom'
import { TransactionDetails } from './TransactionDetails'
import { TransactionForm } from './TransactionForm'
import { NavBar } from './NavBar'

const App = () => {
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3333/api/transactions`).then(res => res.json()).then(data => setAllTransactions(data.transactions))
  }, [])

  const handleDate = (date) => {
    const convertedDate = new Date(date)
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return convertedDate.toLocaleDateString('en-US', options)
}   


  return <div>
    <NavBar allTransactions={allTransactions}/>
    <Routes>
      <Route path='/' element={<Transactions allTransactions={allTransactions} handleDate={handleDate}/>}/>
      <Route path='/:id' element={<TransactionDetails setAllTransactions={setAllTransactions} handleDate={handleDate}/>}/>
      <Route path='/edit/:id' element={<TransactionForm setAllTransactions={setAllTransactions}/>}/>
      <Route path='/new' element={<TransactionForm setAllTransactions={setAllTransactions}/>}/>
    </Routes>
    
    </div>
}

export default App
