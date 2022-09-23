import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({ 
    expendList, 
    budget, 
    availableBudget,
    setavailableBudget,
    BudgetSpent,
    setBudgetSpent, 
    setExpendList,
    setBudget,
    setvalidBudget
}) => {

    useEffect(() => {
        //validacion de lista de gastos para calculo de presupuesto gasto y dispo
        if (expendList.length <= 0){ 
            setavailableBudget(budget)
            setBudgetSpent(0)
            return
        }

        const sum = expendList.reduce((a, g) => g.amount + a, 0) // sum a de lista de gastos

        //validacion de suma de gatos que no supere el presupuesto
        if (sum > budget) {
            console.log('supero lo limites, ta malo')
        }
        //espera medio sec para cargar la info y se anime
        setTimeout(() => {
            setBudgetSpent(sum)
        },500)

        //validacion de suma de gatos que no sea mas grande que el preuspuesto y que no supere el dispo
        if (BudgetSpent > budget || availableBudget < 0) {
            console.log('ta mal programada esta wea')
        }
        setavailableBudget(budget - sum)

    }, [expendList])

    //formateo de la cantidad de dinero a clp
    const budgetFormat = (b) => {
        let total = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(b)
        return total
    }

    //calculo de porcentaje de dinero usado
    const progressTotal = () =>{
        let porcentaje = (BudgetSpent*(100))/Number(budget)
        return Math.round(porcentaje) 
    }

    const resetApp =()=>{

        const option = confirm('Seguro de resetear la app? explotara tu computador')

        if(!option) return

        setvalidBudget(false)
        setExpendList([])
        setBudget(0)
         return 
    }
    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={progressTotal()}
                    text={`${progressTotal()}% Usado`}
                    styles={buildStyles({
                            pathColor: progressTotal() > 100 ? 'red': '#3B82F6',
                            pathTransitionDuration: 2,
                            textColor: progressTotal() > 100 ? 'red': '#3B82F6',
                        })
                    }
                /> 
            </div>

            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={()=>resetApp()}
                >
                    Restear Gastos
                </button>
                <p>
                    <span>Presupuesto: </span> {budgetFormat(budget)}
                </p>
                <p>
                    <span>Gastado: </span> {budgetFormat(BudgetSpent)}
                </p>
                <p className={`${availableBudget < 0 && 'negativo'}`}>
                    <span>Disponible: </span> {budgetFormat(availableBudget)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl