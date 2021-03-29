import {AuthAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const AUTH = 'AUTH'

let initialState = {
    email: null,
    id: null,
    login: 'Not logged',
    isAuth: false
}

const authReducer = (state = initialState, action) => {
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

export const auth = ({resultCode, email, id, login}) => {
    return {type: 'AUTH', data: {email, id, login}, resultCode: resultCode}
}

export const authMe = () => async (dispatch) => {
    const authData = await AuthAPI.authMe()
    dispatch(auth(authData))
}

export const login = ({email, password, rememberMe}) => async (dispatch) => {
    const response = await AuthAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    } else {
        let action = stopSubmit('login', {email: response.data.messages[0], password: response.data.messages[0]})
        dispatch(action)
    }
}
export const logout = () => async (dispatch) => {
    const response = await AuthAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    }
}
export default authReducer