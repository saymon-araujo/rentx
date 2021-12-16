import React, { useEffect, useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { Car } from "../../components/Car";
import { LoadAnimated } from "../../components/LoadAnimated";

import Logo from "../../assets/logo.svg";
import api from "../../services/api";

import { CarDTO } from "../../dtos/CarDTO";
import { useNetInfo } from "@react-native-community/netinfo";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();

  const navigation = useNavigation();

  function handleNavigate(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }
  function APISearch() {
    let isMounted = true;
    setLoading(true);

    api
      .get("/cars")
      .then((response) => {
        if (isMounted) {
          setCars(response.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }

  useEffect(() => {
    APISearch();
  }, []);

  useEffect(() => {
    if (netInfo.isInternetReachable) {
      Alert.alert("Você está Online");
    } else {
      Alert.alert("Você está Offline");
    }
  }, [netInfo.isInternetReachable]);
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
