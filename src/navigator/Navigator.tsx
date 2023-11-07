/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { AccessKeyScreen } from '../screens/Auth/AccessKeyScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';

export type InitialStackParams = {
  LoginScreen: undefined
  AccessKeyScreen: {user: string},
  HomeScreen: {user: string}
}

const Stack = createStackNavigator<InitialStackParams>();

export const Navigator = () => {

  const { status } = useContext( AuthContext );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>

      {(status !== 'authenticated') 
        ? (
          <>  
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="AccessKeyScreen" component={AccessKeyScreen} />
          </>
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        )}

    </Stack.Navigator>
  );
}