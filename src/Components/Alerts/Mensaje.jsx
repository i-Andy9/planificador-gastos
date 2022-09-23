import React from 'react'

const Mensaje = ({tipo,msj}) => {
  return (
    <div className={`alerta ${tipo}`}>{msj}</div>
  )
}

export default Mensaje