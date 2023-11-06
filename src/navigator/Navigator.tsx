import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Auth/LoginScreen';

export type InitialStackParams = {
  LoginScreen: {user:string, password:string}
}

const Stack = createStackNavigator<InitialStackParams>();

export const Navigator = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name="LoginScreen" component={LoginScreen} />

    </Stack.Navigator>
  );
}