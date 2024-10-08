import React from 'react';
import './App.css';
import AppTheme from './App.theme';
import { Home } from './screen';

const App = () => {
  return (
    <AppTheme>
      <React.StrictMode>
        <Home />
      </React.StrictMode>
    </AppTheme>
  )
}
export default App;
