/* eslint-disable prettier/prettier */

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    errorMessage: string;
    user: string | null;
}

type AuthAction =
    | { type: 'signUp' }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated'
            }

        case 'notAuthenticated':
        case 'logout':
            return {
                ...state,
                status: 'not-authenticated',
                user: null
            }
        
        default:
            return state;
    }
}