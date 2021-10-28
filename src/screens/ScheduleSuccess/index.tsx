import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions, StatusBar } from "react-native";

import { ConfirmButton } from "../../components/ConfirmButton";
import { Container, Content, Title, Message, Footer } from "./styles";

import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";

export function ScheduleSuccess() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("Home");
  }

  return (
    <Container>
      <LogoSvg width={width} />
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro Alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>

        <Footer>
          <ConfirmButton title="OK" onPress={handleNavigate} />
        </Footer>
      </Content>
    </Container>
  );
}
