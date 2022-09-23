import { useEffect, useState } from 'react' 
import ExpensesList from './Components/BudgetsItems/ExpensesList'
import Filtros from './Components/BudgetsItems/FilterExpense'
import ModalSpending from './Components/BudgetsItems/ModalSpending'
import Header from './Components/Header'
import iconNewSpending from './img/nuevo-gasto.svg'

function App() { 

  //Lista de gastos
  const [expendList,setExpendList]= useState(
    localStorage.getItem('expendList') ? JSON.parse(localStorage.getItem('expendList')):  []
  )
  //presupuesto
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ??  0
  )
  //filtro de categoria 
  const [filtroCat,setfiltroCat] = useState('')
  //gastos filtrados 
  const [expensesFilt,setexpensesFilt] = useState([])

  //flag si existen gastos 
  const [validBudget,setvalidBudget] = useState(false)
  //total disponible 
  const [availableBudget, setavailableBudget]= useState(0) 
  // total gastado
  const [BudgetSpent, setBudgetSpent]= useState(0)

  //state que muestra el modal
  const [modal, setModal] = useState(false)
  //state de animacion modal add expense
  const [animationModal,setanimationModal]= useState(false)
  //obj de edicion de gasto, con el gasto para editar
  const [editExpense,seteditExpense]= useState({})

  // abre el modal con las animaciones 
  const handleNewSpending = () => {
    seteditExpense({})
    setModal(true) 
    setTimeout(() => {
      setanimationModal(true)
    },180)
  }
  //cierre de modal
  const handleCloseModal = () => {
      setanimationModal(false)
      setTimeout(() => {
          setModal(false)
      }, 380)
  }
  //eliminar gasto
  const handleDeleteExpense =(id)=>{
    setExpendList(expendList.filter((e)=>e.id !== id))
  }

  //verifica si hay un obj de gasto en edicion y abrir modal
  useEffect(()=>{
    if(Object.keys(editExpense).length >0){
      setModal(true)
      setanimationModal(true)
    }
  },[editExpense])

  //guardado de informacion en local storage del presupuesto
  useEffect(() => {
    localStorage.setItem('budget',budget ?? 0) 
  },[budget])

  //guardado de informacion en local storage de la lista de gastos
  useEffect(() => {
    localStorage.setItem('expendList',JSON.stringify(expendList)??[]) 
  },[expendList])

  //validacion en base a la presupuesto guardado desde el local storage
  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0
    if(budgetLS > 0){
      setvalidBudget(true)
    }
  },[])

  // filtro de categorias 
  useEffect(()=>{
    if(filtroCat === '0'){ 
      return setexpensesFilt(expendList)
     }
      const listFiltrada = expendList.filter((e)=> e.category === filtroCat  )

      setexpensesFilt(listFiltrada)

  },[filtroCat])

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        budget={budget}
        expendList={expendList}
        setBudget={setBudget}
        validBudget={validBudget}
        setvalidBudget={setvalidBudget}
        seteditExpense={seteditExpense}
        availableBudget={availableBudget}
        setavailableBudget={setavailableBudget}
        BudgetSpent={BudgetSpent}
        setBudgetSpent={setBudgetSpent}
        setExpendList ={setExpendList}
      />

      {
        validBudget &&
        <>
          <Filtros
            filtroCat={filtroCat}
            setfiltroCat={setfiltroCat}
          />
          <ExpensesList 
            expendList={expendList} 
            seteditExpense={seteditExpense}
            handleDeleteExpense={handleDeleteExpense}
            filtroCat={filtroCat}
            expensesFilt={expensesFilt}
          />

          <div className="nuevo-gasto">
            <img 
              src={iconNewSpending} 
              alt="iconNewSpending" 
              onClick={handleNewSpending}
              />
          </div>  
        </>
      }

      {modal &&
        <ModalSpending
          budget={budget}
          handleCloseModal={handleCloseModal}
          animationModal={animationModal} 
          setExpendList={setExpendList}
          expendList={expendList}
          editExpense={editExpense}
          availableBudget={availableBudget}
        />
      } 
    </div>
  )
}

export default App
