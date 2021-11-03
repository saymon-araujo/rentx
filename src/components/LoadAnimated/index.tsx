import React from "react";
import { Container } from "./styles";
import LottieView from "lottie-react-native";
import AnimatedCarLoading from "../../assets/animated_car_loading.json";

export function LoadAnimated() {
  return (
    <Container>
      <LottieView
        source={AnimatedCarLoading}
        autoPlay
        loop
        style={{ height: 200 }}
        resizeMode="contain"
      />
    </Container>
  );
}
