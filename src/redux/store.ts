import {applyMiddleware, combineReducers, compose, createStore, Action} from "redux"
import thunk, {ThunkAction} from "redux-thunk"
import mainPageReducer from "./MainPageReducer"
import chatReducer from "./ChatReducer"
import contactsReducer from "./ContactsReducer"
import profileReducer from './ProfileReducer'
import authReducer from "./AuthReducer"
import { reducer as formReducer } from "redux-form"
import appReducer from "./AppReducer"

type RootReducerType = typeof rootReducer
export type TState = ReturnType<RootReducerType>

let rootReducer = combineReducers(
    {
        App: appReducer,
        Auth: authReducer,
        MainPage: mainPageReducer,
        Contacts: contactsReducer,
        Profile: profileReducer,
        Chat: chatReducer,
        form: formReducer
    }
);

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)))
/*let store = createStore(rootReducer, applyMiddleware(thunk));*/

type TProperties<T> = T extends {[key: string]: infer U} ? U : never
export type TInferActions<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<TProperties<T>>
export type TThunk<A extends Action, R = Promise<void>> = ThunkAction<R, TState, unknown, A>

// @ts-ignore
window.store = store

export default store