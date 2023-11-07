/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { loaderStyles } from '../theme/loaderTheme';

export const Loader = () => {
    return (
        <>
            <LottieView
                source={require('../assets/loaders/cat.json')}
                style={loaderStyles.lottie}
                autoPlay
            />

            <Text style={loaderStyles.text}>Loading...</Text>
        </>
    )
}
