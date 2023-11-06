import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginStyles } from '../../theme/loginTheme';

export const LoginScreen = () => {

  const onSubmit = () => {
    console.log('submit');
  }

  return ( 
    <KeyboardAvoidingView
      style={{ flex: 1 }}
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
          value={'User'}
        />

        <TextInput
          placeholder='Enter your password'
          placeholderTextColor="#000"
          secureTextEntry
          style={loginStyles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, 'password')}
          value={'Password'}
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
