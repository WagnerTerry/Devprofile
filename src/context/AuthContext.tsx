import React from 'react';
import { api } from '../services/api';
import { Alert } from 'react-native';

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  name: string;
  signIn(credentials: ICredentials): void;
}

interface IProps {
  children: React.ReactElement;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const signIn = async ({ email, password }: ICredentials) => {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, verifique as credenciais.',
      );
    }
  };
  return (
    <AuthContext.Provider value={{ name: 'Terry', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
