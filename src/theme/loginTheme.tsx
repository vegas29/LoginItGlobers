/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "./settings/colors";

export const loginStyles = StyleSheet.create({
    keyboardAvoidView:{
        flex:1
    },
    scrollViewContainer:{
        flexGrow: 1, 
        backgroundColor: COLORS.WHITE 
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 600,
      width: "100%",
      padding: 30,
      marginBottom: 130
    },
    textTitle: {
      color: COLORS.PRIMARYLIGHT2,
      fontWeight: 'bold',
      marginTop: 40,
      fontSize: 30,
      marginBottom: 30
    },
    input:{
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        width: '100%',
        marginBottom: 15,
        padding: 12
    },
    phoneContainer: {
        marginTop: 25,
        borderRadius: 12,
        width: '100%'
    },
    phoneTextContainer: {
        borderRadius: 12,
        height: 75
    },
    label:{
        marginTop: 25,
        marginBottom: 25,
        color: COLORS.WHITE
    },
    image: {
        width: 200,
        height: 100,
        marginTop: 50,
        resizeMode: 'contain'
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: COLORS.PRIMARYLIGHT2
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});