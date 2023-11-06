/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm } from '../../hooks/useForm';
import { loginStyles } from '../../theme/loginTheme';

export const LoginScreen = () => {

  const {user, password, onChange} = useForm({
    user : '',
    password: ''
  });

  const onSubmit = () => {
    Keyboard.dismiss();

    if (user === '' || user.length === 0) {
      Alert.alert(
        'Wrong login', 
        'Username is required'
      );
      return false;

    } else if (password === '' || password.length === 0) {
      Alert.alert(
        'Wrong login', 
        'Password is required'
      );
      return false;
    }
  }

  return ( 
    <KeyboardAvoidingView
      style={loginStyles.keyboardAvoidView}
      behavior={(Platform.OS) === 'ios' ? 'padding' : 'height'}
    >
      <View style={loginStyles.container}>

        <Text style={loginStyles.textTitle}>Login</Text>

        <TextInput
          placeholder='Enter your username'
          placeholderTextColor="#000"
          style={loginStyles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, 'user')}
          value={user}
        />

        <TextInput
          placeholder='Enter your password'
          placeholderTextColor="#000"
          secureTextEntry
          style={loginStyles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, 'password')}
          value={password}
        />

        {/* Button Login */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={onSubmit}
          >
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
          >
            <Text style={loginStyles.textNewUser}>¿Do you have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
