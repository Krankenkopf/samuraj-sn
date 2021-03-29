import imgdefault from '../default-avatar.png'
import {UsersAPI} from "../api/api";

const TOGGLE = 'TOGGLE';
const GET_USERS = 'GET_USERS';
const REPROCCING_USERS = 'REPROCCING_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const IS_FETCHING_SWITCH = 'IS_FETCHING_SWITCH';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'
let initialState = {
    Users: [],
    PageCount: 0,
    PageSize: 10,
    CurrentPage: 1,
    PagesSet: [],
    isFetching: true,
    UserFollowingInProgress: [],
    fib() {
        let FibArray = []
        const a = (1 + 5 ** 0.5) / 2;
        for (let j = 1; j <= 17; j++) {
            FibArray.push(Math.round(a ** j / 5 ** 0.5))
        }
        return this.FibArray = FibArray
    },
    FibArray: []
}
initialState.fib()
const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE: {
            return {
                ...state,
                Users: state.Users.map(u => {
                    if (u.id === action.id) {
                        if (u.isAhrlist.value === true) {
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
                Users: action.data.items.map(u => {
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
                        location: {},
                        position: u.status
                    }
                }),
                PageCount: Math.ceil(action.data.totalCount / state.PageSize)
            }
        }
        case SET_CURRENT_PAGE: {
            state.PagesSet = []
            for (let i = 1; i <= state.PageCount; i++) {
                if (i <= action.currentPage + 20 && i >= action.currentPage - 20
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
                    UserFollowingInProgress: state.UserFollowingInProgress.map(id => id !== action.id)
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
export const toggleIsAhr = (id) => {
    return {type: TOGGLE, id: id};
}

export const getUsers = (contacts) => {
    return {type: GET_USERS, contacts: contacts};
}

export const reproccingUsers = (data) => {
    return {type: REPROCCING_USERS, data: data};
}

export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage};
}

export const isFetchingSwitch = (status) => {
    return {type: IS_FETCHING_SWITCH, status: status};
}

export const toggleFollowingInProgress = (id) => {
    return {type: TOGGLE_FOLLOWING_IN_PROGRESS, id: id}
}

const toggleAhrlistize = async (dispatch, id, toggleRequesting) => {
        if (await toggleRequesting(id) === 0) {
            dispatch(toggleIsAhr(id))
            dispatch(toggleFollowingInProgress(id))
        }
}

/*thunki*/

export const toggle = (id, isAhrlist) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(id))
        isAhrlist
            ? toggleAhrlistize(dispatch, id, UsersAPI.disahrlistize)
            : toggleAhrlistize(dispatch, id, UsersAPI.ahrlistize)
    }
}

export const setUsers = (PageSize, CurrentPage) => {
    return async (dispatch) => {
        dispatch(isFetchingSwitch(null))
        const response = await UsersAPI.getUsers(PageSize, CurrentPage)
            dispatch(reproccingUsers(response.data))
            dispatch(setCurrentPage(CurrentPage))
            dispatch(isFetchingSwitch(response.status))
    }
}


export default contactsReducer;