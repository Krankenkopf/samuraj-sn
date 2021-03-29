import {authMe} from "./AuthReducer";

const SET_INITIALISING_STATUS = 'SET_INITIALISING_STATUS'

let initialState = {
    initialisingComplete: false
}

const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_INITIALISING_STATUS: {
            return {
                ...state,
                initialisingComplete: true
            }
        }
        default: return state
    }
}

const initialisingComplete = () => ({type: SET_INITIALISING_STATUS})

export const initializeApp = () => async (dispatch) => {
    await dispatch(authMe())
    dispatch(initialisingComplete())
}

export default appReducer