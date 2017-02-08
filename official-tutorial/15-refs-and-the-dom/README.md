# Refs and the DOM

El dataflow tipico de React se transmite con los props de padres a hijos, sin embargo hay ocasiones en que queremos modificar un hijo fuera del dataflow normal.

## Cuando usar Refs

Hay unos pocos casos:
* Manejar el foco, seleccion de texto o media playback.
* Lanzar animaciones imperativas.
* Integraciones con librerias DOM de terceros.

No uses refs para cualquier cosa que se pueda hacer de forma declarativa.
Por ejemplo, en vez de exponer los metodos open() y close() en un Dialog, pasalé un prop isOpen.

## Añadiendo un Ref a un elemenmto DOM

React tiene un atributo especial que se puede poner a cualquier componente, el atributo ref toma como valor un callback que se ejecuta inmediatamente despues de que el componente se monte o desmonte (mount o unmount)

Cuando se usa el atributo ref en un elemento HTML, el callback de ref recibe el elemento DOM como argumento.

En el siguiente ejemplo se usa el callback de ref para almacenar una referencia al elemento DOM.

```javascript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
```

React llamará al callback con el elemento DOM al montar y con null al desmontar.

## Adding a Ref to a Class Component

En el caso de los componentes declarados como clase el callback del atributo ref recibirá una instancia del componente montado como argumento

```javascript
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (
      <CustomTextInput
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

## Ref y componentes funcionales

No se debe usar el atributo ref en componentes funcionales porque no tienen instancias.

```javascript
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  render() {
    // This will *not* work!
    return (
      <MyFunctionalComponent
        ref={(input) => { this.textInput = input; }} />
    );
  }
}
```

Sin embargo, si es posible usarlo el elementos HTML u otros componentes de tipo clase.

```javascript
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
```
