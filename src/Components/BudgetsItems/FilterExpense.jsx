import React, { useEffect } from 'react'
import { categories } from '../Helpers/Enums'

const FilterExpense = ({filtroCat,setfiltroCat}) => {

    /* useEffect(() => {

    },[]) */
  return (
    <div
        className='filtros sombra contenedor '
    >
        <form>
            <div className="campo">
                <label htmlFor="">Filtros</label> 
                <select
                    name="categoriaFilter"
                    id="categoriaFilter" 
                    value={filtroCat}
                    onChange={(e)=> setfiltroCat(e.target.value)}
                >
                    <option
                        key='0' 
                        value={0}
                    >Todos
                    </option>
                    {categories.map(c => (
                        <option 
                            key={c.Text} 
                            value={c.value} 
                            onChange={()=>{}}
                        > {c.Text}</option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}

export default FilterExpense