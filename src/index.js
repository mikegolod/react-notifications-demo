import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.css';
import { Provider } from 'react-redux';
import { Chance } from 'chance';
import { store } from './store';
import { addEvent } from './actions';

ReactDOM.render(
  <Provider store={store}>
    <App title="Notifications Demo"/>
  </Provider>
  ,
  document.getElementById('root')
);

const chance = new Chance()

setInterval(() => {
  const text = chance.sentence() 
  store.dispatch(addEvent(text))
}, 20000)
