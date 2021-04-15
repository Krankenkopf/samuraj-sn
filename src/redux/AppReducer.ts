import {authMe} from "./AuthReducer";

const SET_INITIALISING_STATUS = 'SET_INITIALISING_STATUS'

type TInitialState = {
    initialisingComplete: boolean
}

let initialState: TInitialState = {
    initialisingComplete: false
}

const appReducer = (state=initialState, action: any): TInitialState => {
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


type InitialisingCompleteActionType = { type: typeof SET_INITIALISING_STATUS}

const initialisingComplete = ():InitialisingCompleteActionType  => ({type: SET_INITIALISING_STATUS})

export const initializeApp = () => async (dispatch: any) => {
    await dispatch(authMe())
    dispatch(initialisingComplete())
}

export default appReducer