import {View, Dimensions, Image} from 'react-native';
import styled from 'styled-components/native';

export const StyledView = styled.View`
  width: ${Dimensions.get('window').width - 20};
  elevation: 5;
  display: flex;
  border: 0.3px;
  justify-content: center;
  align-items: center;
  //  margin-left: 100px;
  border-radius: 10px;
  //margin-top: 140px;
  height: 200px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 20;
`;
