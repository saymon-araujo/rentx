import React, { useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useAuth } from "../../hooks/auth";
import { Feather } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";

import theme from "../../styles/theme";

import { BackButton } from "../../components/BackButton";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { Button } from "../../components/Button";

export function Profile() {
  const navigation = useNavigation();
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">(
    "passwordEdit"
  );

  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState("");
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleGoBack() {
    navigation.goBack();
  }
  function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Se você sair, irá precisar de internet para conectar-se novamente.",
      [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Confirmar",
          onPress: () => signOut(),
        },
      ]
    );
  }

  function handleChangeOption(selected: "dataEdit" | "passwordEdit") {
    setOption(selected);
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleUpdateProfile() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        name: Yup.string().required("Nome é obrigatório"),
      });

      const data = { name, driverLicense };

      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.id,
        email: user.email,
        name: data.name,
        driver_license: data.driverLicense,
        avatar: avatar,
        token: user.token,
      });

      Alert.alert(":)", "Perfil Atualizado");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", `${error.message}`);
      } else {
        console.log(error);

        Alert.alert("Opa", "Não foi possível atualizar o perfil");
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleGoBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ paddingBottom: useBottomTabBarHeight() + 20 }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleChangeOption("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleChangeOption("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>

            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  value={name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  autoCorrect={false}
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  value={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha Atual" />
                <PasswordInput iconName="lock" placeholder="Nova Senha" />
                <PasswordInput iconName="lock" placeholder="Repetir Senha" />
              </Section>
            )}

            <Button title="Salvar Alterações" onPress={handleUpdateProfile} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
