import React from 'react'
import { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/Global";

import { Home } from './pages';

const theme = {
  primary: '#222'
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
     
  );
}

export default App;
