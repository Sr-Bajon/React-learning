import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

/*
 ██████  ██████  ███    ███ ██████   ██████  ███    ██ ███████ ███    ██ ████████ ███████
██      ██    ██ ████  ████ ██   ██ ██    ██ ████   ██ ██      ████   ██    ██    ██
██      ██    ██ ██ ████ ██ ██████  ██    ██ ██ ██  ██ █████   ██ ██  ██    ██    █████
██      ██    ██ ██  ██  ██ ██      ██    ██ ██  ██ ██ ██      ██  ██ ██    ██    ██
 ██████  ██████  ██      ██ ██       ██████  ██   ████ ███████ ██   ████    ██    ███████
*/

/*
  El componente Counter se ha definido para que espere 3 props
  value : Será el contenido del state, que en este caso no es un objeto sino un valor numerico
  onIncrement: será una función que despache la acción INCREMENT
  onDecrement: será una función que despache la acción DECREMENT
 */

class Counter extends Component {
  // llama a la acción INCREMENT sólo si el valor del estado es impar
  incrementIfOdd = () => {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  // llama a la acción INCREMENT con un retraso de un segundo
  incrementAsync = () => {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {
    // this.props es un objeto con las claves value, onIncrement, onDecrement
    const { value, onIncrement, onDecrement } = this.props
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        {' '}
        <button onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button onClick={this.incrementAsync}>
          Increment async
        </button>
      </p>
    )
  }
}

export default Counter


/*
██████  ███████ ██████  ██    ██  ██████ ███████ ██████
██   ██ ██      ██   ██ ██    ██ ██      ██      ██   ██
██████  █████   ██   ██ ██    ██ ██      █████   ██████
██   ██ ██      ██   ██ ██    ██ ██      ██      ██   ██
██   ██ ███████ ██████   ██████   ██████ ███████ ██   ██
*/

const counter = (state = 0, action) => {
  return {
    INCREMENT : (()=>state + 1)(),
    DECREMENT: (()=>state - 1)()
  }[action.type] || state;
}

/*
███████ ████████  ██████  ██████  ███████
██         ██    ██    ██ ██   ██ ██
███████    ██    ██    ██ ██████  █████
     ██    ██    ██    ██ ██   ██ ██
███████    ██     ██████  ██   ██ ███████
*/

const store = createStore(counter)
const rootEl = document.getElementById('root')


/*
██████  ███████ ███    ██ ██████  ███████ ██████
██   ██ ██      ████   ██ ██   ██ ██      ██   ██
██████  █████   ██ ██  ██ ██   ██ █████   ██████
██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██
██   ██ ███████ ██   ████ ██████  ███████ ██   ██
*/

/*
  Renderizamos el componente Counter y le pasamos los props que necesita
  value={store.getState()}  En este caso se obtiene el estado completo pq el
    state no es un objeto, si fuera un objeto se obtendría la clave necesaria
    por ejemplo store.getState.counter
  onIncrement y onDecrement despachan cada uno la acción necesaria
 */
const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

// llamamos a render para renderizar el componente
render();

// subscribe llamará a la función pasada como argumento cada vez que cambie el
// state
store.subscribe(render)
