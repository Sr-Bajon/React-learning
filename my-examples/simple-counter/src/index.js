import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
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

/*
  4. Identifica el estado
    Necesitamos un estado que guarde el contador
    Sumabutton lanzará un callback para actualizar el contador
    SumaLable mostrará el contador

    {
      counter: 0
    }
 */

/*
  5. Definimos las acciones para REDUX

  const COUNTER_ADD = 'COUNTER_ADD'
  {
    type: COUNTER_ADD,
    value: 1
  }

 */

 const COUNTER_ADD = 'COUNTER_ADD';
 function counterAdd(value) {
   return {
     type: COUNTER_ADD,
     value
   }
 }

// la llamaremos así:  dispatch(counterAdd(value))


/*
  6. Define los reducers
    Y creamos un store con ellos
 */

 const initialState = {
   counter: 0
 }

 function todoApp(state = initialState, action) {
   return ({
     COUNTER_ADD: ()=>{
       return Object.assign({}, state, {
         counter: action.value + state.counter
       })
     }
   })[action.type]() || state;

  //  switch (action.type) {
  //    case COUNTER_ADD:
  //      return Object.assign({}, state, {
  //        counter: action.value + state.counter
  //      })
  //    default:
  //      return state
  //  }
 }


let store = createStore(todoApp);

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
