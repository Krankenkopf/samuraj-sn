import {ProfileAPI, ResultCodes} from "../api/api";
import imgdefault from '../assets/default-avatar.png'
import {ThunkAction} from "redux-thunk";
import {TState} from "./store";
import {stopSubmit} from "redux-form";

const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE'
const SET_STATUS = 'SET_STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'
const UPDATE_PROFILE_PHOTO = 'UPDATE_PROFILE_PHOTO'
const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE'

type TIncomingDataProfile = TProfileData & TProfilePhotos

type TProfileData = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
}

type TProfilePhotos = {
    photos: {
        small: string | null
        large: string | null
    }
}

type TInitialState = typeof initialState
type TActions = SetCurrentProfileActionType | SetCurrentProfileStatusActionType
    | UpdateStatusActionType | UpdateProfilePhotoActionType | ClearCurrentProfileActionType

let initialState = {
    CurrentProfile: null as TProfileData | null,
    CurrentProfilePhotos: null as TProfilePhotos | null,
    CurrentProfileStatus: '---',
    hasPhoto: false
}

const profileReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case SET_CURRENT_PROFILE: {
            let hasPhoto = false
            action.data.photos.large ? hasPhoto = true : action.data.photos.large = imgdefault
            return {
                ...state,
                CurrentProfile: {
                    userId: action.data.userId,
                    aboutMe: action.data.aboutMe,
                    contacts: { ...action.data.contacts},
                    lookingForAJob: action.data.lookingForAJob,
                    lookingForAJobDescription: action.data.lookingForAJobDescription,
                    fullName: action.data.fullName,
                },
                CurrentProfilePhotos: {
                    photos: { ...action.data.photos}
                },
                hasPhoto: hasPhoto
            }
        }
        case SET_STATUS:
        case UPDATE_STATUS:
            return {
                ...state,
                CurrentProfileStatus: action.status
            }
        case UPDATE_PROFILE_PHOTO:
            return {
                ...state,
                CurrentProfilePhotos: {
                    photos: { ...action.data.photos}
                }
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                CurrentProfile: null,
                CurrentProfilePhotos: null,
                CurrentProfileStatus: '',
                hasPhoto: false
            }
        default:
            return state
    }
}

type SetCurrentProfileActionType = {
    type: typeof SET_CURRENT_PROFILE
    data: TIncomingDataProfile
}

export const setCurrentProfile = (data: TIncomingDataProfile): SetCurrentProfileActionType => {
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

type UpdateProfilePhotoActionType = {
    type: typeof UPDATE_PROFILE_PHOTO
    data: any
}

export const updateProfilePhoto = (data: any): UpdateProfilePhotoActionType => {
    return {type: UPDATE_PROFILE_PHOTO, data: data}
}

type ClearCurrentProfileActionType = {
    type: typeof CLEAR_CURRENT_PROFILE
}

export const clearCurrentProfile = (): ClearCurrentProfileActionType => {
    return {type: CLEAR_CURRENT_PROFILE}
}

type TThunk = ThunkAction<Promise<void>, TState, any, TActions>


export const getCurrentProfile = (userId: number): TThunk => {
    return async (dispatch) => {
        const data = await ProfileAPI.getCurrentProfile(userId)
            dispatch(setCurrentProfile(data))
        }
}

export const getCurrentProfileStatus = (userId: number): TThunk => {
    return async (dispatch) => {
        const status = await ProfileAPI.getCurrentProfileStatus(userId)
            dispatch(setCurrentProfileStatus(status))
    }
}

export const sendToUpdateStatus = (status: string): TThunk => {
    return async (dispatch) => {
        const resultCode = await ProfileAPI.sendToUpdateStatus(status)
            if (resultCode === ResultCodes.SUCCESS)
                dispatch(updateStatus(status))
            else dispatch(updateStatus('Exceeded max length'))
    }
}

export const sendToUpdateProfileData = (formData: any): TThunk => {
    return async (dispatch) => {
        const response = await ProfileAPI.sendToUpdateProfileData(formData)
        if (response.resultCode === ResultCodes.SUCCESS)
            await dispatch(getCurrentProfile(formData.userId))
        else {
            let action = stopSubmit('profileForm', {fullName: response.messages[0]})
            dispatch(action)
        }
    }
}

export const sendToUpdateProfilePhoto = (photoFile: any): TThunk => {
    return async (dispatch) => {
        const response = await ProfileAPI.sendToUpdateProfilePhoto(photoFile)
        if (response.resultCode === ResultCodes.SUCCESS)
            await dispatch(updateProfilePhoto(response.data))
    }
}

export default profileReducer