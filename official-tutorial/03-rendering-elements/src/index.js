import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

const element = <h1>Hello world madafaca</h1>;



ReactDOM.render(
  element,
  document.getElementById('root')
);


function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root2')
  );
}

setInterval(tick, 1000);
