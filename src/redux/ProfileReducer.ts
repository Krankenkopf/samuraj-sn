import {ProfileAPI} from "../api/api";
import imgdefault from '../assets/default-avatar.png'

const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE'
const SET_STATUS = 'SET_STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'
const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE'

type TInitialState = typeof initialState


let initialState = {
    MyProfile: null as object | null,
    CurrentProfile: null as object | null,
    CurrentProfileStatus: '---'
}

const profileReducer = (state = initialState, action: any): TInitialState => {
    switch (action.type) {
        case SET_CURRENT_PROFILE: {
            if (action.data.photos.large === null) {
                action.data.photos.large = imgdefault
            }
            return {
                ...state,
                CurrentProfile: action.data
            }
        }
        case SET_STATUS:
            return {
                ...state,
                CurrentProfileStatus: action.status
            }
        case UPDATE_STATUS:
            return {
                ...state,
                CurrentProfileStatus: action.status
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                CurrentProfile: null,
                CurrentProfileStatus: '---'
            }
        default:
            return state
    }
}

type SetCurrentProfileActionType = {
    type: typeof SET_CURRENT_PROFILE
    data: object
}

export const setCurrentProfile = (data: object): SetCurrentProfileActionType => {
    return {type: SET_CURRENT_PROFILE, data: data}
}

type SetCurrentProfileStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export const setCurrentProfileStatus = (status: string): SetCurrentProfileStatusActionType => {
    return {type: SET_STATUS, status: status}
}

type UpdateStatusActionType = {
    type: typeof UPDATE_STATUS
    status: string
}

export const updateStatus = (status: string): UpdateStatusActionType => {
    return {type: UPDATE_STATUS, status: status}
}

type ClearCurrentProfileActionType = {
    type: typeof CLEAR_CURRENT_PROFILE
}

export const clearCurrentProfile = (): ClearCurrentProfileActionType => {
    return {type: CLEAR_CURRENT_PROFILE}
}

export const getCurrentProfile = (userId: number) => {
    return (dispatch: Function) => {
        ProfileAPI.getCurrentProfile(userId).then(data => {
            dispatch(setCurrentProfile(data))
        })
    }
}

export const getCurrentProfileStatus = (userId: number) => {
    return (dispatch: any) => {
        ProfileAPI.getCurrentProfileStatus(userId).then(status => {
            dispatch(setCurrentProfileStatus(status))
        })
    }
}

export const sendToUpdateStatus = (status: string) => {
    return (dispatch: any) => {
        ProfileAPI.sendToUpdateStatus(status).then(resultCode => {
            if (resultCode === 0)
                dispatch(updateStatus(status))
            else dispatch(updateStatus('Exceeded max length'))
        })
    }
}

export default profileReducer