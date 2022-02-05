import React from "react";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

import { RectButtonProps } from "react-native-gesture-handler";

import { Car as ModelCar } from "../../database/model/Car";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { useNetInfo } from "@react-native-community/netinfo";

interface Props extends RectButtonProps {
  data: ModelCar;
  onPress: () => void;
}

export function Car({ data, onPress }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  const netinfo = useNetInfo();

  return (
    <Container onPress={onPress}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${netinfo.isInternetReachable == true ? data.price : "..."}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
