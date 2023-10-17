import { useState, useEffect } from "react";
import Formulario from "./Formulario";

import styled from "@emotion/styled"; //esto ya nos permite definir un styled component
import ImagenCripto from "./img/imagen-criptos.png";


//Los style component se crean por fuera del function y para poder añadirle las propiedades se ocupan template strings y no llaves {}

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  text-align: center;
  color: #fff;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after { //Esto crea un pseudo elemento el cual se agrega despues ::after del elemento anterior &
    content: '';
    width: 60%;
    height: 3px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {//Esto quiere decir que en dipositivos iguales o mayores a 992 pixeles va a realizar lo siguiente
    display: grid; //Permite dividir el espacio en un contenedor en filas y columnas, y luego ubicar elementos HTML en estas filas y columnas
    grid-template-columns: repeat(2, 1fr); //El repeat como dice va a repetir lo que esta dentro del parentesis, en este caso, va a crear 2 columnas y cada una va a tomar una fraccion del espacio 1fr
    column-gap: 2rem; //aqui solo especificamos cuanto espaciado van a tener las columnas que tiene el grid
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto; //establece un margen de 100 píxeles en la parte superior del elemento, centra horizontalmente el elemento en su contenedor y no agrega margen en la parte inferior del elemento.
  display: block;
`;

function App() {

  const [monedas, setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0) { //Recordar que para poder saber si un objeto esta vacio, se usa Object.keys
        setCargando(true)
        setCotizacion({})
        const cotizarCripto = async () => {
        const {moneda, criptoMoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}` //En la url sustituimos unos valores para poder inyectar los valores que tiene el objeto de moneda, los cuales eran moneda MXN y criptomoneda BTC por ejemplo
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCotizacion(resultado.DISPLAY[criptoMoneda][moneda]) //Aqui estamos haciendo la busqueda de forma dinamica ya que la informacion se encuentra un poco mas escondida

        setCargando(false)
      }
      cotizarCripto()
    }
  },[monedas])

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="Imagen principal de criptos" />
      <div>
        <Heading>Cotiza las criptomonedas al instante</Heading>
        <Formulario
          setMonedas={setMonedas}
          cotizacion={cotizacion}
          cargando={cargando}
        />
      </div>
    </Contenedor>
  );
}

export default App;
