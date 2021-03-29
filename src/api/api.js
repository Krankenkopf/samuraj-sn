import axios from 'axios';

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
    getUsers(PageSize, CurrentPage) {
        return (
            instance.get(`users?count=${PageSize}&page=${CurrentPage}`).then(response => {
                return {
                    data: response.data,
                    status: response.status
                }
            })
        )
    },


    ahrlistize(id) {
        return (
            instance.post(`follow/${id}`).then(response => response.data.resultCode)
            )
    },
    disahrlistize(id) {
        return (
            instance.delete(`follow/${id}`).then(response => response.data.resultCode)
        )
    }
}

export const AuthAPI = {
    login(email, password, rememberMe=false) {
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
            instance.get(`auth/me`).then(response => {
                return {resultCode: response.data.resultCode, ...response.data.data, }
            })
        )
    },
}

export const ProfileAPI = {
    getCurrentProfile(userId) {
        return (
            instance.get(`profile/${userId}`).then(response => response.data)
        )
    },
    getCurrentProfileStatus(userId) {
        return (
            instance.get(`profile/status/${userId}`).then(response => response.data)
        )
    },
    sendToUpdateStatus(status) {
        return (
            instance.put(`profile/status`, {status}).then(response => response.data.resultCode)
        )
    }
}