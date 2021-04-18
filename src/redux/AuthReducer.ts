import {AuthAPI, ResultCodes} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {TState} from "./store";
import {TFormData} from "../components/Login/Login";

const AUTH = 'AUTH'

type TInitialState = {
    email: string | null
    id: number | null
    login: string
    isAuth: boolean
}

type TActions = AuthActionType | FormAction

const initialState: TInitialState = {
    email: null,
    id: null,
    login: 'Not logged',
    isAuth: false
}

const authReducer = (state = initialState, action: any): TInitialState => {
    switch (action.type) {
        case AUTH:
            if (action.resultCode === ResultCodes.SUCCESS)
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

export type TAuthThunk = ThunkAction<Promise<void>, TState, any, TActions>

export const authMe = (): TAuthThunk => async (dispatch) => {
    const authData: AuthDataType = await AuthAPI.authMe()
    dispatch(auth(authData))
}

export const login = ({email, password, rememberMe}: TFormData): TAuthThunk => async (dispatch) => {
    const response = await AuthAPI.login({email, password, rememberMe})
    if (response.data.resultCode === ResultCodes.SUCCESS) {
        await dispatch(authMe())
    } else {
        let action = stopSubmit('login', {email: response.data.messages[0], password: response.data.messages[0]})
        dispatch(action)
    }
}
export const logout = () => async (dispatch: any) => {
    const response = await AuthAPI.logout()
    if (response.data.resultCode === ResultCodes.SUCCESS) {
        dispatch(authMe())
    }
}
export default authReducer