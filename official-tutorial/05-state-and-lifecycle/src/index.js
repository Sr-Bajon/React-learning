import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

// ejemplo de un componente que actualiza el estado del DOM
function tick() {
  const element = (
    <div>
      <h1> Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);


// El mismo componente que antes pero mas reutilizable
// sigue teniendo el problema de que no se actualiza sólo sino que
// depende de una función externa
function Clock(props) {
  const oneHourMilliseconds = 1000*60*60;
  const fechaCanarias = new Date(props.date - oneHourMilliseconds);
  return (
    <div>
      <h1>Hello, world in Canarias!</h1>
      <h2>It is {fechaCanarias.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick2() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root2')
  );
}

setInterval(tick2, 1000);


// el mismo componente pero ahora como una clase, las clases permiten a los
// componentes tener estado, que es lo que queremos para nuestro reloj
class Clock2 extends React.Component {
  constructor(props){
    // hay que pasarle los props al constructor de la clase padre tb
    super(props);

    this.state = {date: this.getCanadianDate()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getCanadianDate(){
    const oneHourMilliseconds = 1000*60*60*7;
    return new Date(new Date() - oneHourMilliseconds);
  }

  tick(){
    // al llamar al metodo setState react sabe que ha cambiado el estado y llama
    //
    this.setState({
      date: this.getCanadianDate()
    });
  }

  render(){
    // en vez de props usamos state
    return (
      <div>
        <h1>Hello, world in Canada!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock2 />,
  document.getElementById('root3')
);



/******************************************************************************
███████ ████████  █████  ████████ ███████
██         ██    ██   ██    ██    ██
███████    ██    ███████    ██    █████
     ██    ██    ██   ██    ██    ██
███████    ██    ██   ██    ██    ███████
******************************************************************************/

/*
  No modificar el estado directamente

    this.state.comment = 'Hello';

  Eso no re-renderiza el componente, hay que usar

    this.setState({comment: 'Hello'});

  El unico sitio en el que inicializas el estado con this.state... es en el
  constructor
 */

 /*
  La actualizacion puede ser asincrona

  React encolará multiples setState en una sola actualizacion para mejorar el
  rendimiento, como this.props y this.state pueden actualizarse asincronamente
  no deberias confiar en sus valores para calcular el proximo estado

  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });

  Este codigo esta mal como hemos dicho, para solucionarlo usaremos otra forma
  de setState que acepta una función con dos argumentos, el primero es el estado
  anterior y el segundo es el props en el momento en que se aplica la
  actualización

  // Correct
  this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
  }));
  */

 /*
  El estado se mergea con setState

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }

  Si llamamos varias veces a setState solo se mergearan los cambios que hagamos
  dejando los demás valores de state intactos.

  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }

  */

 /*
    Data Flows Down
    Ningun componente puede saber si otro componente tiene estado o no, y no
    deberia importarle tampoco.
    De todas formas, un componente puede compartir su estado con sus hijos, ya
    sean elementos o componentes.

      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>

      <FormattedDate date={this.state.date} />
  */
