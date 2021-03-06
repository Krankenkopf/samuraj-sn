import imgdefault from "../assets/default-avatar.png"
import {Dispatch} from "react";
import {TState} from "./store";
import { ThunkAction } from "redux-thunk";
import {UsersAPI} from "../api/users-api";
import {TGetItems} from "../api/api";

const TOGGLE = 'TOGGLE';
const GET_USERS = 'GET_USERS';
const REPROCCING_USERS = 'REPROCCING_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const IS_FETCHING_SWITCH = 'IS_FETCHING_SWITCH';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'



export type TIncomingDataUser = {
    id: number
    name: string,
    status: string | null,
    followed: boolean,
    photos: {
        small: string | null,
        large: string | null
    }
}

export type TInternalDataUser = {
    id: number
    firstName: string,
    pastName: string,
    imgsrc: string,
    isAhrlist: {value: boolean},
    location: {
        city: string
        country: string
    } | null
    position: string | null

}

type TInitialState = typeof initialState

type TActions = ToggleIsAhrActionType | GetUsersActionType
    | ReproccingUsersActionType | SetCurrentPageActionType
    | IsFetchingSwitchActionType | ToggleFollowingInProgressActionType

const initialState = {
    Users: [] as Array<TInternalDataUser>,
    PageCount: 0,
    PageSize: 10,
    CurrentPage: 1,
    PagesSet: [] as Array<number>,
    isFetching: true,
    UserFollowingInProgress: [] as Array<number>,
    fib() {
        const FibArray = []
        const a = (1 + 5 ** 0.5) / 2;
        for (let j = 1; j <= 17; j++) {
            FibArray.push(Math.round(a ** j / 5 ** 0.5))
        }
        return this.FibArray = FibArray
    },
    FibArray: [] as Array<number>
}
initialState.fib()
const contactsReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case TOGGLE: {
            return {
                ...state,
                Users: state.Users.map(u => {
                    if (u.id === action.id) {
                        if (u.isAhrlist.value) {
                            return {...u, ...u.isAhrlist, isAhrlist: {value: false}}
                        } else return {...u, ...u.isAhrlist, isAhrlist: {value: true}}
                    }
                    return u
                })
            }
        }
        case GET_USERS: {
            return {
                ...state,
                Users: [...action.contacts],
                PageCount: Math.ceil(action.contacts.length / state.PageSize)
            }
        }
        case REPROCCING_USERS: {
            return {
                ...state,
                Users: action.data.items.map((u: any): TInternalDataUser => {
                    if (u.photos.large === null) {
                        u.photos.large = imgdefault
                    }
                    if (u.status === null) {
                        u.status = ''
                    }
                    return {
                        id: u.id,
                        firstName: u.name,
                        pastName: '',
                        imgsrc: u.photos.large,
                        isAhrlist: {value: u.followed},
                        location: null,
                        position: u.status
                    }
                }),
                PageCount: Math.ceil(action.data.totalCount / state.PageSize)
            }
        }
        case SET_CURRENT_PAGE: {
            state.PagesSet = []
            for (let i = 1; i <= state.PageCount; i++) {
                if ((i <= action.currentPage + 20 && i >= action.currentPage - 20)
                    || i === Math.trunc(i / 300) * 300
                    || i === Math.trunc(i / 200) * 200
                    || state.FibArray.some(f => f === i)
                    || i === state.PageCount) {
                    state.PagesSet.push(i)
                }

            }
            return {
                ...state,
                CurrentPage: action.currentPage,
            }
        }
        case IS_FETCHING_SWITCH: {
            if (action.status === 200)
                return {
                    ...state,
                    isFetching: false
                }
            else return {
                ...state,
                isFetching: true
            }
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            if (state.UserFollowingInProgress.find(id => id === action.id) === action.id)
                return {
                    ...state,
                    UserFollowingInProgress: state.UserFollowingInProgress.filter(id => id !== action.id)
                }
            else return {
                ...state,
                UserFollowingInProgress: [...state.UserFollowingInProgress, action.id]
            }
        }
        default:
            return state;
    }

}

type ToggleIsAhrActionType = {
    type: typeof TOGGLE
    id: number
}
export const toggleIsAhr = (id: number): ToggleIsAhrActionType => {
    return {type: TOGGLE, id: id};
}

type GetUsersActionType = {
    type: typeof GET_USERS
    contacts: Array<TInternalDataUser>
}

export const getUsers = (contacts: Array<TInternalDataUser>): GetUsersActionType => {
    return {type: GET_USERS, contacts: contacts};
}

type ReproccingUsersActionType = {
    type: typeof REPROCCING_USERS
    data: TGetItems
}

export const reproccingUsers = (data: TGetItems): ReproccingUsersActionType => {
    return {type: REPROCCING_USERS, data: data};
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage};
}

type IsFetchingSwitchActionType = {
    type: typeof IS_FETCHING_SWITCH
    status: number | null
}

export const isFetchingSwitch = (status: number | null): IsFetchingSwitchActionType => {
    return {type: IS_FETCHING_SWITCH, status: status};
}

type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    id: number
}

export const toggleFollowingInProgress = (id: number): ToggleFollowingInProgressActionType => {
    return {type: TOGGLE_FOLLOWING_IN_PROGRESS, id: id}
}

const toggleAhrlistize =
    async (dispatch: Dispatch<ToggleIsAhrActionType | ToggleFollowingInProgressActionType>,
           id: number, toggleRequesting: (id: number) => Promise<number> ) => {
        if (await toggleRequesting(id) === 0) {
            dispatch(toggleIsAhr(id))
            dispatch(toggleFollowingInProgress(id))
        }
}

type TDispatch = Dispatch<TActions>

/*thunki*/

export const toggle = (id: number, isAhrlist: boolean) => {
    return (dispatch: TDispatch) => {
        dispatch(toggleFollowingInProgress(id))
        isAhrlist
            ? toggleAhrlistize(dispatch, id, UsersAPI.disahrlistize)
            : toggleAhrlistize(dispatch, id, UsersAPI.ahrlistize)
    }
}

type TThunk = ThunkAction<Promise<void>, TState, any, TActions>

export const setUsers = (PageSize: number, CurrentPage: number): TThunk => {
    return async (dispatch) => {
        dispatch(isFetchingSwitch(null))
        const response = await UsersAPI.getUsers(PageSize, CurrentPage)
            dispatch(reproccingUsers(response.data))
            dispatch(setCurrentPage(CurrentPage))
            dispatch(isFetchingSwitch(response.status))
    }
}


export default contactsReducer;