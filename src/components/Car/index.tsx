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

import { CarDTO } from "../../dtos/CarDTO";

import { getAcessoryIcon } from "../../utils/getAcessoryIcon";

interface Props extends RectButtonProps {
  data: CarDTO;
  onPress: () => void;
}

export function Car({ data, onPress }: Props) {
  const MotorIcon = getAcessoryIcon(data.fuel_type);

  return (
    <Container onPress={onPress}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
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
