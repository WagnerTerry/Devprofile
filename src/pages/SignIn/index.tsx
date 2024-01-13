import React from 'react';
import { Container, Content, Title } from './styles';
import { Input } from '../../components/Form/Input';
import { ScrollView } from 'react-native';
import { Button } from '../../components/Form/Button';

export const SignIn: React.FunctionComponent = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Faça seu login</Title>
          <Input placeholder="Email" />
          <Input placeholder="Senha" />

          <Button title="Entrar" />
        </Content>
      </Container>
    </ScrollView>
  );
};
