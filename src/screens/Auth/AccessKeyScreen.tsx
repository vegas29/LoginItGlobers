/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect } from 'react';
import { InitialStackParams } from '../../navigator/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { Loader } from '../../components/Loader';
import { loginStyles } from '../../theme/loginTheme';


interface Props extends StackScreenProps<InitialStackParams, 'AccessKeyScreen'> {}

export const AccessKeyScreen = ({route, navigation} : Props) => {

  const { user } = route.params;

  const { confirmAccessKey, errorMessage, removeError } = useContext( AuthContext );

  const [visibleError, setVisibleError] = useState<boolean>(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState<boolean>(false);

  const {accessKey, onChange} = useForm({
    accessKey : ''
  });

  useEffect(() => {
    ToastAndroid.show('Check your inbox!', ToastAndroid.SHORT);
  }, []);

  useEffect(() => {
    if(errorMessage.length === 0) return;

    Alert.alert(
        'Solicitud fallida', 
        errorMessage,
        [
          {
            text: 'OK',
            onPress: () => {removeError(), setIsVisibleLoading(false)}
          }
        ]
    );

    setVisibleError(!visibleError);
}, [errorMessage]);

  const onSubmit = async () => {
    Keyboard.dismiss();
    
    setIsVisibleLoading(!isVisibleLoading);

    if (accessKey === '' || accessKey.length === 0) {
      Alert.alert(
        'Wrong login', 
        'AccessKey is required',
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

    console.log('user', user)
    const respconfirmAccess = await confirmAccessKey(accessKey);

    if (respconfirmAccess === 'Successs') {
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

        {isVisibleLoading && (
          <Loader/>
        )}

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
