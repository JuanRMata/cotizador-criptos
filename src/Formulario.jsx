import { useEffect, useState } from "react";
import useSelectMonedas from "./Hooks/useSelectMonedas";
import { monedas } from "./data/monedas";
import styled from "@emotion/styled";

const InputSubmit = styled.input`
  text-transform: uppercase;
  color: #fff;
  background-color: #9497ff;
  border: none; // none quita los bordes
  font-weight: 700;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;
  transition: background-color 200ms ease; // Se esta poniendo una transicion al color del background, transicion del tipo ease

  &:hover {
    background-color: #676bdf;
    cursor: pointer;
  }
`;

const Formulario = () => {
  const [criptos,setCriptos] = useState('')
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas); //Del archivo useSelectMonedas estamos exportando un arreglo es por eso que podemos poner en este array la palabra moneda en lugar de state
  const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas("Elige tu Cripto Moneda", criptos); //Del archivo useSelectMonedas estamos exportando un arreglo es por eso que podemos poner en este array la palabra moneda en lugar de state

  useEffect(() => {
    const consultarAPI = async () => {
      const url ="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      
      const arrayCriptos = resultado.Data.map( cripto => { // cripto va a ser el que esta iterando
        const objeto = { //Creando un objeto que contenga los siguientes apartados de la api que estamos trabajando
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        }
        return objeto
      })
      setCriptos(arrayCriptos)
    }
    consultarAPI()
  }, [])

  return (
    <form>
      <SelectMonedas />
      <SelectCriptoMonedas />

      <InputSubmit type="submit" value="Cotizar" />
    </form>
  );
};

export default Formulario;
