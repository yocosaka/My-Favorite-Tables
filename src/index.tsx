import React from 'react';
import './styles/style.scss';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';

import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
);
