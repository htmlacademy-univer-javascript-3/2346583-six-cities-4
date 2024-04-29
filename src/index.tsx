import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { loadOffers } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(loadOffers());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);
