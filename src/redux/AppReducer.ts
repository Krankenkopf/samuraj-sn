import {authMe} from "./AuthReducer";
import {ThunkAction} from "redux-thunk";
import {TInferActions, TState} from "./store";

const SET_INITIALISING_STATUS = 'SET_INITIALISING_STATUS'



type TActions = TInferActions<typeof actions>

const initialState = {
    initialisingComplete: false
}

type TInitialState = typeof initialState

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

export const actions = {
    initialisingComplete: () => ({type: SET_INITIALISING_STATUS} as const)
}

const initialisingComplete = ():InitialisingCompleteActionType  => ({type: SET_INITIALISING_STATUS})

export type TInitThunk = ThunkAction<Promise<void>, TState, any, TActions>

export const initializeApp = (): TInitThunk => async (dispatch) => {
    await dispatch(authMe())
    dispatch(initialisingComplete())
}

export default appReducer