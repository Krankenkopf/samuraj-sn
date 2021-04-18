import {createSelector} from "reselect";
import {TState} from "../redux/store";
import {InternalDataUserType} from "../redux/ContactsReducer";

export const selectCurrentProfile = (state: TState) => (state.Profile.CurrentProfile)
export const selectCurrentProfilePhotos = (state: TState) => (state.Profile.CurrentProfilePhotos)
export const selectCurrentStatus = (state: TState) => (state.Profile.CurrentProfileStatus)
export const selectIsAuth = (state: TState) => (state.Auth.isAuth)
export const selectLogin = (state: TState) => (state.Auth.login)
export const selectMyId = (state: TState) => (state.Auth.id)
export const selectPersonalData = (state: TState) => (state.Chat.PersonsData)
export const selectThreads = (state: TState) => (state.Chat.Threads)
export const selectUsers = (state: TState) => (state.Contacts.Users)
export const usersSelector = createSelector(selectUsers, (users:Array<InternalDataUserType>) => {
   return users.filter( (u: InternalDataUserType) => true)
})