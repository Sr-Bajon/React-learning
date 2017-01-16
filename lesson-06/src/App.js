import React from 'react';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            txt: 'this is the state text'
        }
    }

    update(e) {
        this.setState({txt: e.target.value})
    }

    render() {
        return (
            <div>
                <h1>{this.state.txt}</h1>
                <Widget update={this.update.bind(this)} otroAttributo="prueba"/>
            </div>
        );
    }
}

// creo un componente stateless
const Widget = (props) => {
    // props contiene los atributos que tenga el widget, en este caso
    // update y otroAttributo
    // Ademas el atributo es del tipo que le hayamos pasado, update es una
    // funcion y otroAttributo es un string
    console.log(props);
    return <input type="text" onChange={props.update}/>
}

export default App;
