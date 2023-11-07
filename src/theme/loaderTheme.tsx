/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "./settings/colors";

export const loaderStyles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    },
    text: {
        marginVertical: 10,
        textAlign: 'center',
        color: COLORS.PRIMARYLIGHT2,
        fontWeight: 'bold'
    }
});