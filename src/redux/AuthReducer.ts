import {AuthAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const AUTH = 'AUTH'

type InitialStateType = {
    email: string | null
    id: number | null
    login: string
    isAuth: boolean
}

const initialState: InitialStateType = {
    email: null,
    id: null,
    login: 'Not logged',
    isAuth: false
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case AUTH:
            if (action.resultCode === 0)
                return {
                    ...state,
                    ...action.data,
                    isAuth: true
                }
            else return {
                ...state,
                email: null,
                id: null,
                login: 'Not logged',
                isAuth: false
            }

        default:
            return state
    }

}

type AuthActionType = {
    type: typeof AUTH
    data: {
        email: string | null
        id: number | null
        login: string | null
    }
    resultCode: number
}

type AuthDataType = {
    resultCode: number
    email: string | null
    id: number | null
    login: string | null
}

export const auth = ({resultCode, email, id, login}: AuthDataType): AuthActionType => {
    return {type: 'AUTH', data: {email, id, login}, resultCode: resultCode}
}

export const authMe = () => async (dispatch: any) => {
    const authData: AuthDataType = await AuthAPI.authMe()
    dispatch(auth(authData))
}

type LoginDataType = {
    email: string | null
    password: string | null
    rememberMe: boolean
}

export const login = ({email, password, rememberMe}: any) => async (dispatch: any) => {
    const response = await AuthAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    } else {
        let action = stopSubmit('login', {email: response.data.messages[0], password: response.data.messages[0]})
        dispatch(action)
    }
}
export const logout = () => async (dispatch: any) => {
    const response = await AuthAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    }
}
export default authReducer