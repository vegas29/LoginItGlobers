/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { InitialStackParams } from '../../navigator/Navigator';
import { useForm } from '../../hooks/useForm';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { loginStyles } from '../../theme/loginTheme';
import { loaderStyles } from '../../theme/loaderTheme';

interface Props extends StackScreenProps<InitialStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {

  const { signIn, errorMessage, removeError } = useContext( AuthContext );
  const [visibleError, setVisibleError] = useState<boolean>(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState<boolean>(false);

  const {user, onChange} = useForm({
    user : ''
  });

  useEffect(() => {
    if(errorMessage.length === 0) return;

    Alert.alert(
      'Login Incorrecto', 
      errorMessage,
      [
        {
          text: 'OK',
          onPress: removeError
        }
      ]
    );

    setVisibleError(!visibleError);
}, [errorMessage]);

  const onSubmit = async () => {
    Keyboard.dismiss();

    setIsVisibleLoading(!isVisibleLoading);

    if (user === '' || user.length === 0) {
      Alert.alert(
        'Wrong login', 
        'Email is required',
        [
          {
            text: 'OK',
            onPress: () => setIsVisibleLoading(false)
          }
        ]
      );
      setIsVisibleLoading(!isVisibleLoading);
      return false;
    }

    const respSignIn = await signIn(user);
    
    if (respSignIn) {
      navigation.navigate('AccessKeyScreen', {user});
    }
  }

  return ( 
    <KeyboardAvoidingView
      style={loginStyles.keyboardAvoidView}
      behavior={(Platform.OS) === 'ios' ? 'padding' : 'height'}
    >
      <View style={loginStyles.container}>

        <Text style={loginStyles.textTitle}>Login</Text>

        
        {isVisibleLoading && (
          <>
              <LottieView
                source={require('../../assets/loaders/squares.json')}
                style={loaderStyles.lottie}
                autoPlay
              />

              <Text style={loaderStyles.text}>Loading...</Text>
          </>
        )}

        <TextInput
          placeholder='Enter your email'
          placeholderTextColor="#000"
          keyboardType="email-address"
          style={loginStyles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, 'user')}
          value={user}
        />

        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={onSubmit}
          >
            <Text style={loginStyles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
