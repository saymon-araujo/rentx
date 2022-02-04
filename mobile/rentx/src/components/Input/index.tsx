import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, InputText, IconContainer } from "./styles";
import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: InputProps) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleIsFocused() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled
              ? theme.colors.main
              : theme.colors.text_details
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        onFocus={handleIsFocused}
        onBlur={handleInputBlur}
        isFocused={isFocused}
      />
    </Container>
  );
}
