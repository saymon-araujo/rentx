import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
  padding:0 24px;
  background-color:${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  margin-top:${getStatusBarHeight() + 115}px;
`;


export const Title = styled.Text`
  color:${({ theme }) => theme.colors.title};
  font-family:${({ theme }) => theme.fonts.secondary_600};
  font-size:${RFValue(40)}px;
`;

export const Form = styled.View`

  width: 100%;

  margin:64px 0;

`;

export const Subtitle = styled.Text`
  color:${({ theme }) => theme.colors.text};
  font-family:${({ theme }) => theme.fonts.primary_400};
  font-size:${RFValue(20)}px;

  line-height:${RFValue(25)}px;

  margin-top:16px;
`;


export const Footer = styled.View`


`;


