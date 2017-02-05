import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';


// componente en su forma mas simple, acepta un objeto props como argumento y
// devuelve un elmento React
// se le llama componente funcional pq efectivamente, es una funcion
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// este componente es equivalente al anterior, pero las clases tienen
// caractericticas adicionales.
class Welcome2 extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// los elementos pueden representar componentes definidos
const element = <div />;
// cuando React detecta un componente definido le pasa los atributos JSX a este
// componente como un unico objeto, que llamamos "props"
// el componente Welcome recibe un atributo name de valor Sara
const element2 = <Welcome name="Sara" />;

// un componente puede usar otros componentes
// un componente debe devolver un solo elemento raiz, aunque este tenga otros
// elementos como nodos hijos
function App(){
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}


/******************************************************************************
██████  ██ ██    ██ ██ ██████  ██ ███████ ███    ██ ██████   ██████
██   ██ ██ ██    ██ ██ ██   ██ ██ ██      ████   ██ ██   ██ ██    ██
██   ██ ██ ██    ██ ██ ██   ██ ██ █████   ██ ██  ██ ██   ██ ██    ██
██   ██ ██  ██  ██  ██ ██   ██ ██ ██      ██  ██ ██ ██   ██ ██    ██
██████  ██   ████   ██ ██████  ██ ███████ ██   ████ ██████   ██████
Dividiendo componentes en otros mas pequeños
******************************************************************************/

function Comment(props) {
 return (
   <div className="Comment">
     <div className="UserInfo">
       <img className="Avatar"
         src={props.author.avatarUrl}
         alt={props.author.name}
       />
       <div className="UserInfo-name">
         {props.author.name}
       </div>
     </div>
     <div className="Comment-text">
       {props.text}
     </div>
     <div className="Comment-date">
       {formatDate(props.date)}
     </div>
   </div>
 );
}


function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function CommentDivided_1(props) {
 return (
   <div className="Comment">
     <div className="UserInfo">
       <Avatar user={props.author} />
       <div className="UserInfo-name">
         {props.author.name}
       </div>
     </div>
     <div className="Comment-text">
       {props.text}
     </div>
     <div className="Comment-date">
       {formatDate(props.date)}
     </div>
   </div>
 );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function CommentDivided_2(props) {
 return (
   <div className="Comment">
     <UserInfo user={props.author} />
     <div className="Comment-text">
       {props.text}
     </div>
     <div className="Comment-date">
       {formatDate(props.date)}
     </div>
   </div>
 );
}

/*
  All React components must act like pure functions with respect to their props.
*/


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
