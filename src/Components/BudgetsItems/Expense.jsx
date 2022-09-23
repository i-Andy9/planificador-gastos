import React from 'react'
import iconAhorro from '../../img/icono_ahorro.svg'
import iconcasa from '../../img/icono_casa.svg'
import iconcomida from '../../img/icono_comida.svg'
import icongastos from '../../img/icono_gastos.svg'
import iconocio from '../../img/icono_ocio.svg'
import iconsalud from '../../img/icono_salud.svg'
import iconsuscripciones from '../../img/icono_suscripciones.svg'

import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import'react-swipeable-list/dist/styles.css'

const iconsCategories ={
  Ahorro:iconAhorro,
  Comida: iconcomida,  
  Casa:iconcasa,    
  GastosVarios:icongastos,
  Ocio:iconocio,    
  Salud:iconsalud,   
  Suscripciones:iconsuscripciones,   
} 

const Expense = ({Expense,seteditExpense,handleDeleteExpense}) => {
  const {id,name,amount,category,date} =Expense

    //accion de desplazamiento de gatos eliminar 
    const trailingAction =()=>(
      <TrailingActions>
        <SwipeAction
          onClick={()=> handleDeleteExpense(id)}
          destructive={true}
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    ) 
    //accion de desplazamiento de gatos editar  
    const leadingAction =()=>(
      <LeadingActions>
        <SwipeAction 
          onClick={()=> seteditExpense(Expense)}
        >
        Editar
        </SwipeAction>
      </LeadingActions>
    ) 

  return (
      <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingAction()}
          trailingActions={trailingAction()}
        >
          <div className="gasto sombra" style={{'userSelect': 'none'}}>
            <div className="contenido-gasto">

              <img src={iconsCategories[category]} alt="" />
              <div className="descripcion-gasto">
                  <p className="categoria">{category}</p>
                  <p className="nombre-gasto">{name}</p>
                  <p className="fecha-gasto">Agregado el: <span>{date}</span> </p>
              </div>

            </div>
            <p className="cantidad-gasto">${amount}</p>
          </div>
        </SwipeableListItem>
      </SwipeableList>
  )
}

export default Expense