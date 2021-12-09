import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { Car } from "../../components/Car";
import { LoadAnimated } from "../../components/LoadAnimated";

import Logo from "../../assets/logo.svg";
import api from "../../services/api";

import { CarDTO } from "../../dtos/CarDTO";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function handleNavigate(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }
  function APISearch() {
    setLoading(true);

    api
      .get("/cars")
      .then((response) => setCars(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    APISearch();
  }, []);
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

          {!loading ? (
            <TotalCars>Total de {cars.length} carros</TotalCars>
          ) : (
            <></>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <CarList
          data={cars}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleNavigate(item)} />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      )}
    </Container>
  );
}
