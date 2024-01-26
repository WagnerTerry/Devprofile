import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';
import { AuthProvider } from './src/context/AuthContext';
import { StatusBar } from 'react-native';

const App: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
