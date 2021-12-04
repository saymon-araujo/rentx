import React, { useState } from "react";
import { TextInputProps, Pressable } from "react-native";
import { useTheme } from "styled-components";
import { Container, InputText, IconContainer } from "./styles";
import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleIsFocused() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  const theme = useTheme();

  function ChangeVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
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
        secureTextEntry={isPasswordVisible}
        onFocus={handleIsFocused}
        onBlur={handleInputBlur}
        isFocused={isFocused}
      />

      <Pressable onPress={ChangeVisibility}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_details}
          />
        </IconContainer>
      </Pressable>
    </Container>
  );
}
