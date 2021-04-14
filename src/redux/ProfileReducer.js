import {ProfileAPI} from "../api/api";
import imgdefault from '../assets/default-avatar.png'

const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE'
const SET_STATUS = 'SET_STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'
const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE'

let initialState = {
    MyProfile: null,
    CurrentProfile: null,
    CurrentProfileStatus: '---'
}

const profileReducer = (state = initialState, action) => {
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

export const setCurrentProfile = (data) => {
    return {type: SET_CURRENT_PROFILE, data: data}
}
export const setCurrentProfileStatus = (status) => {
    return {type: SET_STATUS, status: status}
}

export const updateStatus = (status) => {
    return {type: UPDATE_STATUS, status: status}
}

export const clearCurrentProfile = () => {
    return {type: CLEAR_CURRENT_PROFILE}
}

export const getCurrentProfile = (userId) => {
    return (dispatch) => {
        ProfileAPI.getCurrentProfile(userId).then(data => {
            dispatch(setCurrentProfile(data))
        })
    }
}

export const getCurrentProfileStatus = (userId) => {
    return (dispatch) => {
        ProfileAPI.getCurrentProfileStatus(userId).then(status => {
            dispatch(setCurrentProfileStatus(status))
        })
    }
}

export const sendToUpdateStatus = (status) => {
    return (dispatch) => {
        ProfileAPI.sendToUpdateStatus(status).then(resultCode => {
            if (resultCode === 0)
                dispatch(updateStatus(status))
            else dispatch(updateStatus('Exceeded max length'))
        })
    }
}

export default profileReducer