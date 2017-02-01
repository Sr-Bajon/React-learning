import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            txt: 'this is the state txt'
        }

        this.anotherValue = 'Hola';
    }

    update(e) {
        // setState actualiza el valor de la clave txt
        // de this.state
        console.log(e);
        this.setState({txt: e.target.value})
    }

    render() {
        return (
            <div>
                Escribe un texto:
                <input  type="text"
                        // le pasamos a la función el elemento input
                        onChange={this.update.bind(this)}/>
                <h1>
                    {this.state.txt}
                    + {this.anotherValue}
                </h1>
            </div>
        );
    }
}

export default App;
