import React from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import { Button } from '../../components/Form/Button';
import { api } from '../../services/api';
import {
  BackToSignIn,
  BackToSignInTitle,
  Container,
  Content,
  Icon,
  Logo,
  Title,
} from './styles';

import logo from '../../assets/logo.png';
import { KeyboardAvoidingView } from 'react-native';
import { useForm, FieldValues } from 'react-hook-form';
import { InputControl } from '../../components/Form/InputControl';

import { useNavigation } from '@react-navigation/native';

interface ScreenNavigationProp {
  goBack: () => void;
}

interface IFormInputs {
  [name: string]: any;
}

export const SignUp: React.FunctionComponent = () => {
  const { handleSubmit, control } = useForm<FieldValues>();

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handleSignUp = async (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    try {
      await api.post('users', data);
      Alert.alert(
        'Cadastro realizado',
        'Você ja pode fazer login na aplicação',
      );
    } catch (error) {
      Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer o cadastro');
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Logo source={logo} />

            <Title>Crie sua conta</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome completo"
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
            />
            <InputControl
              control={control}
              name="password"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
            />

            <Button
              title="Criar uma conta"
              onPress={handleSubmit(handleSignUp)}
            />
          </Content>
        </Container>
      </ScrollView>
      <BackToSignIn onPress={() => goBack()}>
        <Icon name="arrow-left" />
        <BackToSignInTitle>Voltar para logon</BackToSignInTitle>
      </BackToSignIn>
    </KeyboardAvoidingView>
  );
};
