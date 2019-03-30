import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import TodoList from './containers/TodoList';
import reducer from './reducers/reducer';

const store = createStore(reducer);

const App = () => (
  <Provider store={store} >
    <TodoList />
  </Provider>
);

render(App, document.getElementById('root'));
