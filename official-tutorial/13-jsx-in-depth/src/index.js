import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {
        (index) => {
          return <div key={index}>This is item {index} in the list</div>
        }
      }
    </Repeat>
  );
}


ReactDOM.render(
  <div>{ListOfTenThings()}</div>,
  document.getElementById('root')
);
