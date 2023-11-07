/* eslint-disable prettier/prettier */
import React, { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authReducer, AuthState } from "./authReducer";
import itglobersApi from "../api/itglobersApi";
import { GetToken, SentOTP, ValidateAccessKey } from "../interfaces/appInterfaces";

type AuthContextProps = {
    errorMessage: string;
    user: string | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: ( email: string ) => object | boolean;
    confirmAccessKey: (accessKey: string) => object | boolean;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState<string>('');

    const domain = 'https://itgloberspartnerpe.myvtex.com';
    const scope = 'itgloberspartnerpe';

    useEffect(()=>{
        checkToken();
    }, []);
    
    const checkToken = async () => {  
        const token = await AsyncStorage.getItem('token');
        
        if (!token) return dispatch({type: 'notAuthenticated'});

        dispatch({
            type: 'signUp'
        });
    }


    const getToken = async (user: string) => {
        try {
            const tokenData:any = await itglobersApi.get<GetToken>(`/api/vtexid/pub/authentication/start?callbackUrl=${domain}/api/vtexid/oauth/finish&account=${user}&scope=${scope}`);
            const { authenticationToken } = tokenData.data;
            setUser(user);
            return authenticationToken;
        } catch (error) {
            console.log('error in GetToken', error);
        }
    }

    const sendOTP = async (user: string, respToken: string, locale: string = 'es-CO') => {
        const data = {
            email: user,
            authenticationToken: respToken,
            locale
        };

        try {
            const sendOTP:any = await itglobersApi.post<SentOTP>(`/api/vtexid/pub/authentication/accesskey/send`, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: [(data) => {
                return Object.entries(data)
                        .map(([key, value]:any) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                        .join('&');
                    }
                ],
            });
            return sendOTP;
        } catch (error) {
            console.log('error in SendOTP', error);
        }
    }

    const validateSignIn = async (accessKey: string) => {
        const data = {
            accessKey,
            authenticationToken: token,
            login: user
        };

        try {
            const respValidateSignIn:any = await itglobersApi.post<ValidateAccessKey>(`/api/vtexid/pub/authentication/accesskey/validate`, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest: [(data) => {
                return Object.entries(data)
                        .map(([key, value]:any) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                        .join('&');
                    }
                ],
            });
            return respValidateSignIn;
        } catch (error) {
            console.log('error in Validate SignIn', error);
        }
    }

    const signIn = async( user:string ) => {

        try {
            const respToken = await getToken(user);
            const respOTP = await sendOTP(user, respToken);
            setToken(respToken);
            setUser(user);

            if (!respOTP) {
                return dispatch({ 
                    type: 'addError',
                    payload: "Ha ocurrido un error, inténtalo más tarde"
                });

            } 
            
            return respOTP.data ? true : false;

        } catch (error) {
            console.log('error in SignIn', error);
        }
    };

    const confirmAccessKey = async( user:string ) => {
        try {
            const respValidateSignIn = await validateSignIn(user);

            const { authStatus } = respValidateSignIn.data;

            if (respValidateSignIn.status === 400 || authStatus === 'WrongCredentials' || authStatus === 'BlockedUser') {
                return dispatch({ 
                    type: 'addError',
                    payload: 'Error ' + respValidateSignIn.data.authStatus
                });
            } 
            
            dispatch({
                type: 'signUp'
            });

            await AsyncStorage.setItem('token', token);

            return authStatus;

        } catch (error) {
            console.log('error', error);
            dispatch({
                type: 'addError',
                payload: 'Ha ocurrido un error' + error 
            });
        }
    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');

        dispatch({type: 'logout'});
    };
    
    const removeError = () => {
        dispatch({type: 'removeError'});
    };
    
    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            user,
            confirmAccessKey,
            logOut,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    )
}