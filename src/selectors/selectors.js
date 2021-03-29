import {createSelector} from "reselect";

export const selectCurrentProfile = (state) => (state.Profile.CurrentProfile)
export const selectCurrentStatus = (state) => (state.Profile.CurrentProfileStatus)
export const selectIsAuth = (state) => (state.Auth.isAuth)
export const selectLogin = (state) => (state.Auth.login)
export const selectMyId = (state) => (state.Auth.id)
export const selectPersonalData = (state) => (state.Chat.PersonalData)
export const selectThreads = (state) => (state.Chat.Threads)
export const selectUsers = (state) => (state.Contacts.Users)
export const usersSelector = createSelector(selectUsers, (users) => {
   return users.filter( u => true)
})