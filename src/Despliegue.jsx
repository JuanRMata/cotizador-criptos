import styled from "@emotion/styled"

const Datos = styled.div`
    color: white;
    margin-top: 15px;
    font-family: 'Lato',sans-serif;
    font-weight: 400;
    text-align: center;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
`
const Span = styled.span`
display: block;
    justify-content: space-between;
    font-family: 'Lato',sans-serif;
    font-weight: 700;
    margin-bottom: 10px;
`
const Imagen = styled.img `
    display: block;
    width: 100px;
    height: 100px;
    
`

const Despliegue = ({cotizacion}) => {
  return (
    <Datos>
        <Imagen  
        src={`https://cryptocompare.com/${cotizacion.IMAGEURL}`} 
        alt="imagen de la criptomoneda" 
        /> 

        <div>
        <p> Precio: <Span>{cotizacion.PRICE}</Span></p>
        <p> Precio mas alto del dia: <Span>{cotizacion.HIGHDAY}</Span></p>
        <p> Precio mas bajo del dia: <Span>{cotizacion.LOWDAY}</Span></p>
        <p> Variacion ultimas 24 horas: <Span>{cotizacion.CHANGEPCT24HOUR}</Span></p>
        <p> Ultima actualizacion: <Span>{cotizacion.CONVERSIONLASTUPDATE}</Span></p>
        </div>
        
        
    </Datos>
  )
}

export default Despliegue
