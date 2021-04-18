import {authMe} from "./AuthReducer";
import {ThunkAction} from "redux-thunk";
import {TState} from "./store";

const SET_INITIALISING_STATUS = 'SET_INITIALISING_STATUS'

type TInitialState = {
    initialisingComplete: boolean
}

type TActions = InitialisingCompleteActionType

let initialState: TInitialState = {
    initialisingComplete: false
}

const appReducer = (state=initialState, action: TActions): TInitialState => {
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

export type TInitThunk = ThunkAction<Promise<void>, TState, any, TActions>

export const initializeApp = (): TInitThunk => async (dispatch) => {
    await dispatch(authMe())
    dispatch(initialisingComplete())
}

export default appReducer