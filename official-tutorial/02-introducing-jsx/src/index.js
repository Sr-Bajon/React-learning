import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const element = <h1>Hello World!</h1>;

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element2 = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

const element3 = <div tabIndex="0"></div>;
const element4 = <img src={user.avatarUrl}></img>;
const element5 = <img src={user.avatarUrl} />;
const element6 = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
// hay que usar className en vez de class y tabIndex en vez de tabindex
const element7 = <div className="miclase" tabIndex="1"></div>;

// jsx previene ataques XSS por defecto ya que escapa todos los caracteres
const title = 'response.potentiallyMaliciousInput';
// This is safe:
const element8 = <h1>{title}</h1>;


/* los dos siguientes ejemplos son identicos */
const element9 = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element10 = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

/* React.createElement crea un elemento de este tipo con el ejemplo anterior
  El siguiente ejemplo se ha simplificado
*/
// Note: this structure is simplified
const element11 = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};




ReactDOM.render(
  element,
  document.getElementById('root')
);
