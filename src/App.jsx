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


  return <div>
    <NavBar />
    <Routes>
      <Route path='/' element={<Transactions allTransactions={allTransactions}/>}/>
      <Route path='/:id' element={<TransactionDetails setAllTransactions={setAllTransactions}/>}/>
      <Route path='/edit/:id' element={<TransactionForm setAllTransactions={setAllTransactions}/>}/>
      <Route path='/new' element={<TransactionForm setAllTransactions={setAllTransactions}/>}/>
    </Routes>
    
    </div>
}

export default App
