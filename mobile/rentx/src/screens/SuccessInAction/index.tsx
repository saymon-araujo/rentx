import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWindowDimensions, StatusBar } from "react-native";

import { ConfirmButton } from "../../components/ConfirmButton";
import { Container, Content, Title, Message, Footer } from "./styles";

import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";

interface Props {
  title: string;
  message: string;
  navigationRoute: string;
}

export function SuccessInAction() {
  const navigation = useNavigation();

  const route = useRoute();

  const { width } = useWindowDimensions();
  const { title, message, navigationRoute } = route.params as Props;

  function handleNavigate() {
    navigation.navigate(navigationRoute);
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

        <Title>{title}</Title>

        <Message>{message}</Message>

        <Footer>
          <ConfirmButton title="OK" onPress={handleNavigate} />
        </Footer>
      </Content>
    </Container>
  );
}
