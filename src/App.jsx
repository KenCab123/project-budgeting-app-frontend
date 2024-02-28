import React, { useEffect, useState } from 'react'
import { Transactions } from './Transactions'
import { Routes, Route, Link } from 'react-router-dom'
import { TransactionDetails } from './TransactionDetails'

const App = () => {
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3333/api/transactions`).then(res => res.json()).then(data => setAllTransactions(data.transactions))
  }, [])

  return <div>
    <h1>Budgeting App</h1>
    <Link to='/'>
    <button>Home</button>
    </Link>

    <Routes>
      <Route path='/' element={<Transactions allTransactions={allTransactions}/>}/>
      <Route path='/:id' element={<TransactionDetails/>}/>
    </Routes>
    
    </div>
}

export default App
