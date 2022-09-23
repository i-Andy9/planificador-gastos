import React from 'react'
import BudgetControl from './BudgetsItems/BudgetControl'
import NewBudget from './BudgetsItems/NewBudget'

const Header = ({
    budget,
    expendList,
    setBudget,
    validBudget,
    setvalidBudget,
    availableBudget,
    setavailableBudget,
    BudgetSpent,
    setExpendList,
    setBudgetSpent, }) => { 

  return (
    <div>
        <header> 
            <h1>Planificador de Gastos</h1>
            {validBudget ? (
                <BudgetControl
                    setvalidBudget ={setvalidBudget}
                    budget={budget}
                    expendList={expendList}
                    availableBudget={availableBudget}
                    setavailableBudget={setavailableBudget}
                    BudgetSpent={BudgetSpent}
                    setBudgetSpent={setBudgetSpent}
                    setExpendList={setExpendList}
                    setBudget={setBudget}
                />
            ):(
                <NewBudget
                    budget={budget}
                    setBudget={setBudget}
                    setvalidBudget={setvalidBudget}
                />
            )}
        </header>
    </div>
  )
}

export default Header