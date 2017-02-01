import React from 'react';

class App extends React.Component {
    render() {
        let txt = this.props.txt;
        let color = this.props.color;
        return <h1> {txt} + {this.props.cat} + {color}</h1>;
    }
}

// podemos definir de que tipos serán los props
App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
  txt: 'Texto por defecto',
  cat: 1,
  color: 'red'
}

export default App;
