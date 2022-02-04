import React from "react";
import { SvgProps } from "react-native-svg";
import { Container, Name } from "./styles";
import theme from "../../styles/theme";

interface Props {
  name: string;
  icon: React.FC<SvgProps>;
}

export function Accessory({ name, icon: Icon }: Props) {
  return (
    <Container>
      <Icon width={32} height={32} fill={theme.colors.header} />
      <Name>{name}</Name>
    </Container>
  );
}
