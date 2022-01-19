import React from 'react'

import { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/Global";
import { Container } from './styles';

import { Header, Footer } from './components';

import { 
  Home,
  Dogs

} from './pages';

const theme = {
  colorPrimary: '#FFAD62',
  colorMedium: '#FFC499',
  colorLight: '#FFEFD8'
}

/* 930px breakpoint: header, landing */

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <Container>
          <Header />
          <Dogs />
        </Container>
        <Footer />
    </ThemeProvider>
     
  );
}

export default App;
