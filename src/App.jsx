import React, { useEffect, useState } from 'react'
import { Transactions } from './Transactions'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3333/api/transactions`).then(res => res.json()).then(data => setAllTransactions(data.transactions))
  }, [])

  return <div>
    <h1>Budgeting App</h1>

    <Routes>
      <Route path='/' element={<Transactions allTransactions={allTransactions}/>}/>
    </Routes>
    
    </div>
}

export default App
