import React, { useState } from "react";
import { BackButton } from "../../../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import {
  Container,
  Header,
  BulletWrapper,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

import api from "../../../services/api";
import theme from "../../../styles/theme";

interface Params {
  user: { name: string; email: string; driverLicense: string };
}

export function SignUpSecondStep() {
  const navigation = useNavigation();
  const route = useRoute();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { user } = route.params as Params;

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleNavigate() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Opa", "Informe a senha e a confirmação");
    }
    if (password !== passwordConfirm) {
      return Alert.alert("Opa", "As senhas não estão iguais");
    } else {
      await api
        .post("/users", {
          name: user.name,
          email: user.email,
          driver_license: user.driverLicense,
          password,
        })
        .then(() => {
          navigation.navigate("SuccessInAction", {
            title: "Conta Criada!",
            message: `Agora é só fazer login\ne aproveitar`,
            navigationRoute: "SignIn",
          });
        })
        .catch((error) => {
          Alert.alert("Opa", "Não foi possível cadastrar");
        });
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <BulletWrapper>
              <Bullet />
              <Bullet active />
            </BulletWrapper>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de{"\n"}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>02.Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleNavigate}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
