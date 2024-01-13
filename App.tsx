import React from 'react';
import { Home } from './src/pages/Home';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
