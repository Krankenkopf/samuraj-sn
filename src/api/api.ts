import axios from 'axios';
import {TFormData} from "../components/Login/Login";

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': '32502240-6472-451a-97f8-de9750e9e16e'
        }

    }
)

export const UsersAPI = {
    getUsers(PageSize: number, CurrentPage: number) {
        return (
            instance.get(`users?count=${PageSize}&page=${CurrentPage}`).then(response => {
                return {
                    data: response.data,
                    status: response.status
                }
            })
        )
    },

    ahrlistize(id: number) {
        return (
            instance.post(`follow/${id}`).then(response => response.data.resultCode)
            )
    },
    disahrlistize(id: number) {
        return (
            instance.delete(`follow/${id}`).then(response => response.data.resultCode)
        )
    }
}

export enum ResultCodes {
    SUCCESS = 0,
    ERROR = 1
}

type TAuthMeResponse = {
    data: { id: number, email: string, login: string }
    resultCode: number
    messages: Array<string>
}

export const AuthAPI = {
    login({email, password, rememberMe=false}: TFormData) {
        return (
            instance.post(`auth/login`, {email, password, rememberMe})
        )
    },

    logout() {
        return (
            instance.delete(`auth/login`)
        )
    },

    authMe() {
        return (
            instance.get<TAuthMeResponse>(`auth/me`).then(response => {
                return {resultCode: response.data.resultCode, ...response.data.data, }
            })
        )
    },
}

export const ProfileAPI = {
    getCurrentProfile(userId: number) {
        return (
            instance.get(`profile/${userId}`).then(response => response.data)
        )
    },
    getCurrentProfileStatus(userId: number) {
        return (
            instance.get(`profile/status/${userId}`).then(response => response.data)
        )
    },
    sendToUpdateStatus(status: string) {
        return (
            instance.put(`profile/status`, {status}).then(response => response.data.resultCode)
        )
    },
    sendToUpdateProfileData(formData: any) {
        return (
            instance.put(`profile`, formData).then(response => response.data)
        )
    },
    sendToUpdateProfilePhoto(photo: any) {
        return (
            instance.put(`profile/photo`, photo).then(response => response.data)
        )
    }
}