import React from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../../pages/Main';
import Light from '../../pages/Light';

const Tab = createMaterialBottomTabNavigator()

const Menu = () => {
  return (
      <NavigationContainer>
          <Tab.Navigator options={{headerShown: 'none'}}>
              <Tab.Screen name='Tempo' component={Main} options={{headerShown: 'none'}}/>
              <Tab.Screen name='Lâmpada' component={Light}/>
          </Tab.Navigator>
      </NavigationContainer>
  );
}

export default Menu;