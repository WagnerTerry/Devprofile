import React from 'react';
import {
  Container,
  Content,
  CreateAccount,
  CreateAccountTitle,
  ForgotPasswordButton,
  ForgotPasswordTitle,
  Icon,
  Logo,
  Title,
} from './styles';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button } from '../../components/Form/Button';
import { useNavigation } from '@react-navigation/native';
import { InputControl } from '../../components/Form/InputControl';
import { useForm, FieldValues } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from '../../assets/logo.png';
import { AuthContext } from '../../context/AuthContext';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  email: yup.string().email('Email inválido').required('Informe o email'),
  password: yup.string().required('Informe a senha'),
});

const resolver = async (data: IFormInputs) => {
  try {
    await formSchema.validate(data, { abortEarly: false });
    return { values: data, errors: {} };
  } catch (error) {
    return {
      values: {},
      errors: error.inner.reduce(
        (
          allErrors: Record<string, string>,
          currentError: yup.ValidationError,
        ) => {
          allErrors[currentError.path as string] = currentError.message;
          return allErrors;
        },
        {},
      ),
    };
  }
};

export const SignIn: React.FunctionComponent = () => {
  const auth = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  console.log('auth', auth);
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<FieldValues>({
    resolver: resolver,
  });

  const { navigate } = useNavigation<ScreenNavigationProp>();

  const handleSignIn = (form: IFormInputs) => {
    const data = {
      email: form.email,
      password: form.password,
    };
    console.log(data);
    setLoading(true);
    auth.signIn();
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
            <View>
              <Title>Faça seu login</Title>
            </View>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              // error={errors.email ? errors.email?.message : undefined}
            />
            <InputControl
              control={control}
              name="password"
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry
              // error={errors.password ? errors.password?.message : undefined}
            />

            <Button
              title="Entrar"
              disabled={loading}
              onPress={handleSubmit(handleSignIn)}
            />

            <ForgotPasswordButton>
              <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount
        onPress={() => {
          navigate('SignUp');
        }}
      >
        <Icon name="log-in" />
        <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};
