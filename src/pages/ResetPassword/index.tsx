import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { api } from '../../services/api';
import { Button } from '../../components/Form/Button';
import { InputControl } from '../../components/Form/InputControl';
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

interface ScreenNavigationProp {
  goBack: () => void;
  navigate(screen: string): void;
}

interface IFormInputs {
  [name: string]: any;
}

export const ResetPassword: React.FunctionComponent = () => {
  const { handleSubmit, control } = useForm<FieldValues>();

  const { goBack, navigate } = useNavigation<ScreenNavigationProp>();

  const handleResetPassword = async (form: IFormInputs) => {
    const data = {
      token: form.token,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };

    try {
      await api.post('password/reset', data);
      Alert.alert(
        'Senha redefinida',
        'A senha foi redefinida com sucesso. Efetue login para acessar',
      );
      navigate('SignIn');
    } catch (error) {
      Alert.alert(
        'Erro ao resetar senha',
        'Ocorreu um erro ao resetar sua senha. Tente novamente.',
      );
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
            <Title>Redefinir a senha</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="token"
              placeholder="Código"
            />
            <InputControl
              control={control}
              name="password"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
            />
            <InputControl
              control={control}
              name="password_confirmation"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
            />
            <Button
              title="Entrar"
              onPress={handleSubmit(handleResetPassword)}
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
