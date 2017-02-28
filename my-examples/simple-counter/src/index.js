import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
  1. Mock
    Un boton con un +
    Un label al lado del boton que muestre un 0
    Al pulsar el boton que aumente el numero
 */

/*
  2. Jerarquia de componentes
    Boton que aumenta el estado en 1
    Label que muestra el estado actual
 */

/*
  3. Versión estatica

 */

const SumaButton = () => <button className="sumacontainer__sumabutton">+</button>;
const SumaLabel = () => <h2 className="sumacontainer__sumalabel">0</h2>;
const SumaContainer = () => {
  return (
    <div className="sumacontainer">
      <SumaButton />
      <SumaLabel />
    </div>
  );
};

ReactDOM.render(
  <SumaContainer />,
  document.getElementById('root')
);
