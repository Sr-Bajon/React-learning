# Conditional Rendering

En el siguiente ejemplo se crean dos componentes y otro que lo que hace es devolver una función JSX dependiendo del valor de un prop isLoggedIn.

De esta forma podemos renderizar un elemento u otro.

```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={true} />,
  document.getElementById('root')
);
```


Ahora añadimos un componente con estado, vemos que en render() se definen dos componentes que se asignan a variables, estos componentes poseen sendos eventos que cambian el valor del prop isLoggedIn. En función de este valor se renderizará un boton u otro.

```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

## Inline if con operador &&
En JSX se puede embeber cualquier expresión envolviendola en `{}`

```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
El ejemplo anterior funciona porque en javascript `true && expresion` siempre evalua expresion y `false && expresion` evalua a false por lo que no hace nada.

El mismo ejemplo pasado por Babel
```javascript
function Mailbox(props) {
  var unreadMessages = props.unreadMessages;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Hello!"
    ),
    unreadMessages.length > 0 && React.createElement(
      "h2",
      null,
      "You have ",
      unreadMessages.length,
      " unread messages."
    )
  );
}
```


## Operador ternario
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```
Tambien se puede usar con expresiones mas largas, pero puede resultar menos legible y ser mas apropiado extraer un componente.

```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ?
        ( <LogoutButton onClick={this.handleLogoutClick} /> ) :
        ( <LoginButton onClick={this.handleLoginClick} /> )
      }
    </div>
  );
}
```

## Prevenir el renderizado de un componente

No suele ser lo habitual, pero si queremos que un componente no se muestre aunque sea usado por otro componente lo que debemos hacer es que en vez de devolver el renderizado normal JSX devolvemo `null`.

Con esto haremos que se elimine el componente del DOM.

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
