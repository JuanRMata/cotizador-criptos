import { useEffect, useState } from "react";
import useSelectMonedas from "./Hooks/useSelectMonedas";
import { monedas } from "./data/monedas";
import Despliegue from "./Despliegue";
import Spinner from "./Spinner";
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

const Error = styled.div`
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 700;
  font-family: "Lato", sans-serif;
  text-align: center;
  margin-top: 15px;
  color: white;
  border-left-color: #b41b1b;
  border-left-style: solid;
  border-left-width: 5px;
`;

const Formulario = ({setMonedas,cotizacion,cargando}) => {
  const [criptos, setCriptos] = useState([]);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas); //Del archivo useSelectMonedas estamos exportando un arreglo es por eso que podemos poner en este array la palabra moneda en lugar de state
  const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas("Elige tu Cripto Moneda", criptos); //Del archivo useSelectMonedas estamos exportando un arreglo es por eso que podemos poner en este array la palabra moneda en lugar de state
  const [error, setError] = useState(false);
  const [despliegue,setDespliegue] = useState(false)
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        // cripto va a ser el que esta iterando
        const objeto = {
          //Creando un objeto que contenga los siguientes apartados de la api que estamos trabajando
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, criptoMoneda].includes("")) {
      setError(true);
      setDespliegue(false)
      return;
    } 
    setError(false);
    setDespliegue(true)

    setMonedas({
      moneda,
      criptoMoneda
    })
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptoMonedas />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
      {error && (<Error><p>Todos los campos son obligatorios</p></Error>)}
      {cargando && <Spinner/>}
      {despliegue ? <Despliegue cotizacion={cotizacion}/> : null}
    </>
  );
};

export default Formulario;
