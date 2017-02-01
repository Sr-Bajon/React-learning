import React from 'react';

class App extends React.Component {
    render() {
        /*
        Esta linea no funciona
        return <h1>Hello World</h1> <b>Bold </b>

        porque sería lo mismo que poner una funcion a continuacion
        de otra, lo cual no es javascript valido
        return React.createElement('', , ) React.createElement('', , )
        */

        // asi si funciona porque metemos ambos elementos en otro
        return (
            <div>
                <h1>Hello World</h1>
                <b>Bold</b>
            </div>
        );

        /*
        Asi tb funciona
        return <div>
                <h1>Hello World</h1>
                <b>Bold</b>
            </div>

        Pero asi no
        return
            <div>
                <h1>Hello World</h1>
                <b>Bold</b>
            </div>
        */
    }
}

export default App;
