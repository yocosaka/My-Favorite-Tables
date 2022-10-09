import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter';
import './styles/style.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const isMobile = window.innerWidth < 600;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <AppRouter />
      </DndProvider>
    </Provider>
  </React.StrictMode>,
);
