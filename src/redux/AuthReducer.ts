import {ResultCodes} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {TInferActions, TThunk} from "./store";
import { TLoginFormData } from "../components/Login/LoginForm";
import {AuthAPI} from "../api/auth-api";

const AUTH = 'AUTH'

type TInitialState = {
    email: string | null
    id: number | null
    login: string
    isAuth: boolean
}

type TActions = TInferActions<typeof actions> | FormAction

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

type AuthDataType = {
    resultCode: number
    email: string | null
    id: number | null
    login: string | null
}

export const actions = {
    auth: ({resultCode, email, id, login}: AuthDataType) => {
        return {type: 'AUTH', data: {email, id, login}, resultCode: resultCode} as const}
}

export const authMe = (): TThunk<TActions> => async (dispatch) => {
    const authData: AuthDataType = await AuthAPI.authMe()
    dispatch(actions.auth(authData))
}

export const login = ({email, password, rememberMe}: TLoginFormData): TThunk<TActions> => async (dispatch) => {
    const response = await AuthAPI.login({email, password, rememberMe})
    if (response.data.resultCode === ResultCodes.SUCCESS) {
        await dispatch(authMe())
    } else {
        let action = stopSubmit('login', {email: response.data.messages[0], password: response.data.messages[0]})
        dispatch(action)
    }
}
export const logout = (): TThunk<TActions> => async (dispatch) => {
    const response = await AuthAPI.logout()
    if (response.data.resultCode === ResultCodes.SUCCESS) {
        await dispatch(authMe())
    }
}
export default authReducer