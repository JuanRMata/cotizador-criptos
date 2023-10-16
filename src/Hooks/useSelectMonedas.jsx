import { useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    color: white;
    font-family: 'Lato', sans-serif;
    display: block;
    font-size: 24px;
    font-weight: 700;
`;

const Select = styled.select`
    font-size: 20px;
    text-align: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 14px;
    font-family: 'Lato', sans-serif;
`

const useSelectMonedas = (label,opciones) => {
    const [state, setState] = useState('')

  const SelectMonedas = () => ( //Colocamos el () para dar por implicito que lo que esta dentro se va a retornar
    <>
        <Label> {label} </Label>
        <Select
            value={state}
            onChange={ e => setState(e.target.value)}
        >
            <option value=""> -- Seleccione --</option>
            
            {opciones.map( opcion => (
                <option
                    key={opcion.id}
                    value={opcion.id}
                >{opcion.nombre}</option>
            ))}

        </Select>
    </>
  )


  return [ state, SelectMonedas ]
}

export default useSelectMonedas
