export const IdGenerator = () => {
    const rNum = Math.random().toString(36).substring(2)
    const time = Date.now().toString(36)

    return rNum+time
};

export const dateFormat =( date )=>{
    let fecha = new Date(date)
    let option = {
        year:'numeric',
        month:'long',
        day:'2-digit',
    }
     
    return fecha.toLocaleDateString('es-ES',option)
}