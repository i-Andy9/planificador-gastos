import React from 'react'
import Expense from './Expense'

const ExpensesList = (props) => {
  const {expendList,seteditExpense,handleDeleteExpense,filtroCat,expensesFilt}=props
    return (
    <div className="listado-gastos contenedor " >
         
          <h2 
            style={{'textAlign': 'center', 'marginTop':'7rem'}} 
          >{
            filtroCat == '0' ? 'Gastos' :
            filtroCat !== '' && filtroCat !== '0' && expensesFilt.length >=1 ? `Gastos ${filtroCat}` :
            'No se han registrado gastos' 
          }</h2>

        {filtroCat ? (
            expensesFilt.map( e => (
              <Expense 
                seteditExpense={seteditExpense}
                handleDeleteExpense={handleDeleteExpense}
                  key={e.id}
                  Expense={e} 
              />
            ))
          ):(
            expendList && expendList.map( e => (
              <Expense 
                seteditExpense={seteditExpense}
                handleDeleteExpense={handleDeleteExpense}
                  key={e.id}
                  Expense={e} 
              />
            ))
          )
        }
 
    </div>
    
  )
}

export default ExpensesList