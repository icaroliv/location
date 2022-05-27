import React from 'react';
import { View} from 'react-native';
import {StyledView,Title} from './style'
// import { Container } from './styles';

const Card = (props) => {
  return (
      <StyledView>
           <Title>Temperatura: {props.temperatura} ºC</Title>
           <Title>Umidade: {props.umidade} %</Title>
      </StyledView>
  );
}

export default Card;