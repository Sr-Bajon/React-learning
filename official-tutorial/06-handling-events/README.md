# Handling Events

Los eventos se tratan como en vanilla javascript excepto:
* Los nombres son en camelCase, onclick => onClick
* Se pasa una definicion de función entre `{}` en vez de un string `onclick="hagoClick()" => onClick={hagoClick}`
* No se puede pasar false para prevenir la acción por defecto, en React hay que llamar a preventDefault explicitamente.

  ```javascript
  <a href="#" onclick="console.log('The link was clicked.'); return false">
    Click me
  </a>
  ```

  En React sería:

  ```javascript
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }

    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }
  ```


* Al usar React generalmente no hace falta llamar a addEventListener para añadir eventos a un elemento DOM despues de que sea creado. En vez de eso intenta añadir el evento cuando el elemento es inicialmente renderizado.

```javascript
class Toggle extends React.Component {
 constructor(props) {
   super(props);
   this.state = {isToggleOn: true};

   // This binding is necessary to make `this` work in the callback
   this.handleClick = this.handleClick.bind(this);
 }

 handleClick() {
   this.setState(prevState => ({
     isToggleOn: !prevState.isToggleOn
   }));
 }

 render() {
   return (
     <button onClick={this.handleClick}>
       {this.state.isToggleOn ? 'ON' : 'OFF'}
     </button>
   );
 }
}

ReactDOM.render(
 <Toggle />,
 document.getElementById('root')
);
```

Hay que tener cuidado al crear los manejadores de eventos y usar el `this` , por defecto cuando se lanza el evento el manejador crea su propio contexto, por eso en el constructor debemos hacer un `bind` con el manejador si queremos usar el contexto del componente.

Si no queremos usar `bind` podemos usar "property initializer syntax" con Babel (hay que activarlo en la configuración de Babel, create-react-app lo activa por defecto), un ejemplo de esto sería:

```javascript
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

Tambien podemos usar una arrow function en el evento, las arrow function tienen el mismo contexto que su entorno, no crean uno nuevo por lo que se podrá usar el this del componente en el manejador.

```javascript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

Esta forma también es válida pero crea un nuevo callback cada vez que se llama al evento, si este callback se pasa como "prop" a un componente anidado estos podrían hacer un re-renderizado extra sin necesidad, entonces por motivos de rendimiento no se recomienda.
