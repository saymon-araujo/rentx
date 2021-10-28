import React from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

export function Home() {
  const carData = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
  };
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("CarDetails");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleNavigate} />
        )}
        keyExtractor={(item) => String(item)}
      />
    </Container>
  );
}
