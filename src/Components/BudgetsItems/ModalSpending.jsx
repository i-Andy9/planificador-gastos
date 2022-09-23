import React, { useEffect, useState } from 'react'
import closeModal from '../../img/cerrar.svg'
import Mensaje from '../Alerts/Mensaje'
import { categories } from '../Helpers/Enums'
import { dateFormat, IdGenerator } from '../Helpers/Functions'

const ModalSpending = ({ budget, handleCloseModal, animationModal,expendList,setExpendList,editExpense,availableBudget }) => {
    const [msj,setMsj]= useState('')
    const [expense, setExpense] = useState({
        id:'',
        name: '',
        amount: '',
        date:'',
        category: 'Seleccion',
    }) 
 
    const handleUpdateExpense =(e)=>{
        const {id, value } = e.target

        switch(id) {
            case 'name' :
                setExpense({...expense, name: value})    
            break
            case 'amount' : 
                setExpense({...expense, amount: Number(value)})    
            break
            case 'category' :
                setExpense({...expense, category: value})    
            break

            default :
                setExpense({...expense})
        }
    }

    const clear =()=>{
        setExpense({
            id:'',
            name: '',
            amount: '',
            date:'',
            category: 'Seleccion',
        })
    }

    const handleSaveExpense =()=>{
        const {name,amount,category,id} = expense

        //validacion en base al id si existe gasto
        if(id){//se edita y guarda 
            const newList = expendList.map( e => e.id === id ?expense : e)
            setExpendList(newList)
        }
        else{ // se registra nuevo

            if([name,category].includes('') || amount<0){
                setMsj('Ingrese informacion valida al formulario')
    
                setTimeout(() => {
                    setMsj('')
                },1500)
                return 
            } 
            //* add extra fields to OBJ 
            expense.date= dateFormat(Date.now())
            expense.id=IdGenerator()
            //* save obj with new fields
            setExpendList([...expendList,expense])
    
        } 
        //cierre de modal
        handleCloseModal()
        //limpieza ODT
        clear()
    }

    useEffect(()=>{
        if(Object.keys(editExpense).length >0){
            setExpense(editExpense)
          }
    },[])
    return (
        <div className="modal">

            <div className="cerrar-modal">
                <img
                    src={closeModal}
                    alt="closeModal"
                    onClick={handleCloseModal}
                />
            </div>

            <div className={`formulario ${animationModal ? 'animar' : 'cerrar'}`}>
                <legend> {editExpense.amount ? 'Editar gasto':'Nuevo gasto'} </legend>

                {msj && <Mensaje tipo={'error'} msj={msj}/>}

                <div className="campo">
                    <label 
                        htmlFor="name"
                    >Nombre del Gasto</label>
                    <input
                        id='name' 
                        type="text" 
                        placeholder='Añade el nombre del gasto' 
                        value={expense.name} 
                        onChange={handleUpdateExpense}
                    />
                </div>

                <div className="campo">
                    <label 
                        htmlFor="cantidad"
                    >Cantidad</label>
                    <input 
                        id='amount' 
                        max={budget}
                        type="number" 
                        placeholder='Añade la cantidad del gasto, ej: 3000' 
                        value={expense.amount} 
                        onChange={handleUpdateExpense}
                    />
                </div>

                <div className="campo">
                    <label 
                        htmlFor="Categoria"
                    >Categoria de gasto</label>
                    <select 
                        name="categoria" 
                        id="category"  
                        placeholder='Seleccion'
                        value={expense.category}
                        onChange={handleUpdateExpense}
                    >
                        <option 
                            key='' 
                            value='Seleccion' 
                            disabled
                        >Seleccion</option>
                        {categories.map(c => (
                            <option 
                                key={c.Text} 
                                value={c.value} 
                                onChange={handleUpdateExpense}
                            > {c.Text}</option>
                        ))}
                    </select>
                </div>

                <input 
                    type="submit" 
                    value={editExpense.amount ?'Guardar gasto':"Agregar nuevo gasto"} 
                    onClick={handleSaveExpense}
                    /* disabled={!expense.id  && expense.amount>availableBudget }
                    style={!expense.id && expense.amount>availableBudget ? {'background':'grey'} : {}} */
                />
            </div>
        </div>
    )
}

export default ModalSpending