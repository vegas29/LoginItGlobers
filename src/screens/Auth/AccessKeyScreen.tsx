/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect } from 'react';
import { InitialStackParams } from '../../navigator/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../../context/AuthContext';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm } from '../../hooks/useForm';
import { loginStyles } from '../../theme/loginTheme';



interface Props extends StackScreenProps<InitialStackParams, 'AccessKeyScreen'> {}

export const AccessKeyScreen = ({route, navigation} : Props) => {

  const { user } = route.params;

  const { confirmAccessKey, errorMessage, removeError } = useContext( AuthContext );

  const [visibleError, setVisibleError] = useState<boolean>(false);

  const {accessKey, onChange} = useForm({
    accessKey : ''
  });

  useEffect(() => {
    if(errorMessage.length === 0) return;

    Alert.alert(
        'Solicitud fallida', 
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

  const onSubmit = () => {
    Keyboard.dismiss();

    if (accessKey === '' || accessKey.length === 0) {
      Alert.alert(
        'Wrong login', 
        'AccessKey is required'
      );
      return false;
    }

    const respconfirmAccess = confirmAccessKey(user);

    if (respconfirmAccess) {
      navigation.navigate('HomeScreen', { user });
    }

  }

  return ( 
    <KeyboardAvoidingView
      style={loginStyles.keyboardAvoidView}
      behavior={(Platform.OS) === 'ios' ? 'padding' : 'height'}
    >
      <View style={loginStyles.container}>

        <Text style={loginStyles.textTitle}>Confirm your session</Text>

        <TextInput
          placeholder='Enter your access key'
          placeholderTextColor="#000"
          keyboardType="numeric"
          style={loginStyles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, 'accessKey')}
          value={accessKey}
        />

        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={onSubmit}
          >
            <Text style={loginStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
