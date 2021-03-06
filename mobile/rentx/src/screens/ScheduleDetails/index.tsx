import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, StatusBar } from "react-native";
import { format } from "date-fns";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlataformDate";

import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriodProps {
  start: string;
  end: string;
}

export function ScheduleDetails() {
  const route = useRoute();
  const theme = useTheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);

  const { car, dates } = route.params as Params;
  const rentTotal = Number(dates.length * car.price);

  async function SendInfoToApi() {
    setLoading(true);

    await api.post(`/rentals`, {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), "dd/MM/yyyy"),
    });

    const scheduleByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [...scheduleByCar.data.unavailable_dates, ...dates];

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        handleNavigate();
      })

      .catch(() => {
        setLoading(false);
        Alert.alert("N??o foi poss??vel confirmar o agendamento");
      });
  }

  async function handleConfirmRental() {
    setLoading(true);

    await api
      .post("/rentals", {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(),
        end_date: new Date(),
        total: rentTotal,
      })
      .then(() => {
        handleNavigate();
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("N??o foi poss??vel confirmar o agendamento.");
      });
  }

  function handleNavigate() {
    navigation.navigate("SuccessInAction", {
      title: "Carro Alugado!",
      message: `Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX\npegar o seu autom??vel.`,
      navigationRoute: "Home",
    });
  }
  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), "dd/MM/yyyy"),
    });
  }, []);

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {car.accessories && (
          <Acessories>
            {car.accessories.map((accessory) => (
              <Accessory
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
                key={accessory.type}
              />
            ))}
          </Acessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>AT??</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} di??rias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
