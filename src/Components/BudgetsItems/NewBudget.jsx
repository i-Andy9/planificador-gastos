import React, { useState } from 'react'
import Mensaje from '../Alerts/Mensaje'

const NewBudget = (props) => {
    const [mensaje,setMensaje] = useState('')
    const [errorBudget,seterrorBudget] = useState(false)
    const {budget,setBudget,setvalidBudget} = props


    const handleBudget = ()=>{
        if(!budget || budget <0 ){
            seterrorBudget(true)
            setMensaje('El presupuesto ingresado no es valido')
            return
        }
        setMensaje('')
        setvalidBudget(true) 
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
       {/*  <h2> Nuevo presupuesto</h2> */}
        <div className="formulario">
            <div className="campo">
                <label htmlFor=""> Definir presupuesto</label>

                <input 
                    style={{'WebkitAppearance': 'none','margin': '0','MozAppearance': 'textfield'}}
                    min={0}
                    max={999999999}
                    type="number" 
                    className="nuevo-presupuesto" 
                    placeholder='Añade tu presupuesto'
                    value={budget}
                    onChange={e=> setBudget(e.target.value)}
                />

                <input 
                    type="submit" 
                    value='Ingresar presupuesto'
                    onClick={handleBudget}
                />

                {mensaje && <Mensaje tipo='error' msj={mensaje} /> }
            </div>
        </div>
    </div>
  )
}

export default NewBudget