import React from "react";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

import ArrowLeftSvg from "../../assets/arrow.svg";

export function Schedule() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("ScheduleDetails");
  }
  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <BackButton onPress={() => {}} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>

          <ArrowLeftSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleNavigate} />
      </Footer>
    </Container>
  );
}
