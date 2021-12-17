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
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database/";
import { Car as ModelCar } from "../../database/model/Car";

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();

  const navigation = useNavigation();

  function handleNavigate(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }
  async function APISearch() {
    let isMounted = true;
    setLoading(true);

    try {
      const carCollection = database.get<ModelCar>("cars");

      const cars = await carCollection.query().fetch();

      if (isMounted) {
        setCars(cars);
      }
    } catch (err) {
      () => {};
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }

  async function offlineSyncronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("users/sync", user);
      },
    });
  }

  useEffect(() => {
    if (netInfo.isInternetReachable === true) {
      offlineSyncronize();
    }
  }, [netInfo.isInternetReachable]);

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
