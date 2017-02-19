const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const { createStore } = Redux;
// var createStore = Redux.createStore;
// import { createStore } from 'redux';

const store = createStore(counter);

console.log(store.getState());  // 0


store.dispath({ type: 'INCREMENT' });
console.log(store.getState()); // 1

store.subscribe(()=>{
  document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
