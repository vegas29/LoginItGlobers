/* eslint-disable prettier/prettier */
export interface GetToken {
    authenticationToken:         string;
    oauthProviders:              any[];
    showClassicAuthentication:   boolean;
    showAccessKeyAuthentication: boolean;
    authCookie:                  null;
    isAuthenticated:             boolean;
    selectedProvider:            null;
    samlProviders:               any[];
}

export interface SentOTP {}


export interface ValidateAccessKey {
    authStatus:           string;
    promptMFA:            boolean;
    lastAttemptAvailable: null;
    clientToken:          null;
    authCookie:           AuthCookie;
    accountAuthCookie:    AuthCookie;
    expiresIn:            number;
    userId:               string;
    phoneNumber:          null;
    scope:                null;
}

export interface AuthCookie {
    Name:  string;
    Value: string;
}


