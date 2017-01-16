import React from 'react';

class App_1 extends React.Component {
  render() {
    return <h1 > Hello first form < /h1>
  }
}

class App_2 extends React.Component {
  render() {
    return React.createElement('h1', null, 'Hello Second form')
  }
}

const App_3 = () => < h1 > Hello stateless < /h1>;

export default App;
