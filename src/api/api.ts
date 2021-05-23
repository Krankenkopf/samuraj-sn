import axios from 'axios';
import {TIncomingDataUser} from "../redux/ContactsReducer";


export const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': '32502240-6472-451a-97f8-de9750e9e16e'
        }

    }
)

export type TGetItems = {
    items: Array<TIncomingDataUser>
    totalCount: number
    error: string | null
}

export type TResponse<TData = {}, TRC = ResultCodes> = {
    data: TData
    resultCode: TRC
    messages: Array<string>
}

export enum ResultCodes {
    SUCCESS = 0,
    ERROR = 1
}

