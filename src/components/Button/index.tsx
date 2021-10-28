import React from "react";
import { Container, Title } from "./styles";
import { useTheme } from "styled-components";

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
}
// handleNavigate
export function Button({ title, color, onPress }: Props) {
  const theme = useTheme();

  return (
    <Container onPress={onPress} color={color ? color : theme.colors.main}>
      <Title>{title}</Title>
    </Container>
  );
}
