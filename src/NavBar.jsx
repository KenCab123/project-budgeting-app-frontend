import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"


export const NavBar = ({allTransactions, setPrice, price, handleTotalPrice}) => {

  useEffect(() => {
    //Checking if allTransactions is empty
    if (allTransactions.length > 0) {
      //setPrice to the sum of all the prices in allTransactions
      setPrice(allTransactions.reduce((acc, curr) => acc + curr.amount, 0));
    } 

    // This useEffect runs everytime the allTransactions changes
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
