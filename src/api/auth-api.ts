import {TLoginFormData} from "../components/Login/LoginForm";
import {instance, TResponse} from "./api";

type TAuthMeResponse = TResponse<{ id: number, email: string, login: string }>
type TLoginResponse = TResponse<{id: number}>
export const AuthAPI = {
    login({email, password, rememberMe = false}: TLoginFormData) {
        return (
            instance.post<TLoginResponse>(`auth/login`, {email, password, rememberMe})
        )
    },

    logout() {
        return (
            instance.delete<TResponse>(`auth/login`)
        )
    },

    authMe() {
        return (
            instance.get<TAuthMeResponse>(`auth/me`).then(response => {
                return {resultCode: response.data.resultCode, ...response.data.data,}
            })
        )
    },
}