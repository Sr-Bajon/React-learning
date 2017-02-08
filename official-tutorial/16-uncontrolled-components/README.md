# Uncontrolled Components

Se trataría de un componente que renderiza un formulario que es controlado por el DOM y no por React.

En este caso usaremos ref para obtener una referencia al DOM del formulario y a sus datos, siendo en este caso el DOM la fuente de la verdad en vez de React.

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Puede ser util si estamos integrando React con otras librerias

## Valores por defecto en formularios no controlados

Durante el ciclo de vida de React, el atributo value en los formularios se sobreescribe, en los componentes no controlados a veces queremos especificar un valor por defecto pero que luego no se sobreescriba, para eso existe el atributo **defaultValue**

Para `<input type="checkbox">` y `<input type="radio">` tenemos **defaultChecked**

```javascript
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```
