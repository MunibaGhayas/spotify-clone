import "./index.css";
import React from "react";
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { DataLayer } from './DataLayer';
import reducer, { initialState } from './reducer';

const root = createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>
);


