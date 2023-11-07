/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { InitialStackParams } from '../../navigator/Navigator';
import { AuthContext } from '../../context/AuthContext';
import { Button, Text, View } from 'react-native';
import { homeStyles } from '../../theme/homeTheme';
import { COLORS } from '../../theme/settings/colors';

interface Props extends StackScreenProps<InitialStackParams, 'HomeScreen'> {}

export const HomeScreen = ({ navigation }: Props) => {

    const { logOut, user } = useContext( AuthContext );

    console.log('user', user);

    const onLogout = () => {
        logOut();
        navigation.navigate('LoginScreen');
    }

    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.title}>¡Welcome!</Text>
            <Text style={homeStyles.name}>{user}</Text>
            <Button color={COLORS.PRIMARYLIGHT2} title="Logout" onPress={() => onLogout()} />
        </View>
    );
}
