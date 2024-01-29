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
  Container,
  Content,
  GoBackButton,
  Header,
  HeaderTitle,
  Icon,
  Logo,
  Title,
  UserAvatar,
} from './styles';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import avatarDefault from '../../assets/avatar02.png';

interface ScreenNavigationProp {
  goBack: () => void;
}

interface IFormInputs {
  [name: string]: any;
}

// const {
//   handleSubmit,
//   control,
//   formState: { errors },
// } = useForm<FieldValues>({
//   resolver: yupResolver(formSchema),
//   defaultValues: {
//     name: user.name,
//     email: user.email,
//   },
// });

export const UserProfileEdit: React.FunctionComponent = () => {
  const { user } = useAuth();
  const { handleSubmit, control } = useForm<FieldValues>();

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handleProfileEdit = async (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
    };

    try {
      await api.put('profile', data);
      Alert.alert(
        'Perfil atualizado',
        'Os dados do seu perfil foram atualizados.',
      );
      goBack();
    } catch (error) {
      Alert.alert(
        'Erro ao atualizar',
        'Ocorreu um erro ao atualizar o perfil. Tente novamente.',
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
          <Header>
            <GoBackButton onPress={goBack}>
              <Icon name="chevron-left" />
            </GoBackButton>
            <HeaderTitle>Seu perfil</HeaderTitle>
            <UserAvatar
              source={
                user.avatar_url ? { uri: user.avatar_url } : avatarDefault
              }
            />
          </Header>
          <Content>
            <Logo source={logo} />
            <Title>Editar dados do perfil</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome completo"
              // error={errors.name && errors.name.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              // error={errors.email && errors.email.message}
            />
            <Button
              title="Salvar alterações"
              onPress={handleSubmit(handleProfileEdit)}
              // disabled={!!errors.name || !!errors.email}
            />{' '}
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
