import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"


export const NavBar = ({allTransactions, setPrice, price, handleTotalPrice}) => {

  useEffect(() => {

    if (allTransactions.length > 0) {
      setPrice(allTransactions.reduce((acc, curr) => acc + curr.amount, 0));
    } 

  }, [allTransactions]);

  return (
    <div className='nav'>
    <h1>Budgeting App</h1>
    
    <Link to='/new'>
      <button>Create</button>
    </Link>
    
    {handleTotalPrice(price)}
    </div>
  )
}
