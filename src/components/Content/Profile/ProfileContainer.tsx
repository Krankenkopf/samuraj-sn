import React, {FC, useEffect} from 'react'
import {connect} from "react-redux";
import {
    getCurrentProfile,
    getCurrentProfileStatus,
    sendToUpdateStatus,
    sendToUpdateProfileData,
    sendToUpdateProfilePhoto,
    actions, TProfileData, TProfilePhotos
} from "../../../redux/ProfileReducer";
import Profile from './Profile'
import {Redirect, withRouter, RouteComponentProps} from "react-router-dom";
import {compose} from "redux";
import {
    selectMyId,
    selectCurrentProfile,
    selectIsAuth,
    selectCurrentStatus,
    selectCurrentProfilePhotos, selectHasPhoto
} from "../../../selectors/selectors";
import PreLoader from "../../Preloader";
import {TState} from "../../../redux/store";

type TPathParams = {
    id: string
}

type TMappedState = {
    CurrentProfile: TProfileData | null
    CurrentProfilePhotos: TProfilePhotos
    CurrentStatus: string
    hasPhoto: boolean
    isAuth: boolean
    myId: number | null
}

type TDispatchProps = {
    getCurrentProfile: (id: number) => void
    getCurrentProfileStatus: (id: number) => void
    sendToUpdateStatus: (status: string) => void
    sendToUpdateProfileData: (formData: any) => void
    sendToUpdateProfilePhoto: (photoFile: File) => void
    clearCurrentProfile: () => void
}

type TProfileContainerProps = TMappedState & TDispatchProps

const ProfileContainer: FC<TProfileContainerProps & RouteComponentProps<TPathParams>>
    = ({   match, isAuth, myId,
           CurrentProfile, getCurrentProfile, getCurrentProfileStatus,
           clearCurrentProfile, ...restProps}) => {

    useEffect(() => {
        const refreshProfile = () => {
            const userId = Number(match.params.id)
            if (userId) {
                getCurrentProfile(userId)
                getCurrentProfileStatus(userId)
            } else if (isAuth && myId) {
                getCurrentProfile(myId)
                getCurrentProfileStatus(myId)
            }
        }
        refreshProfile()
        return () => {
            clearCurrentProfile()
        }
    }, [match.params.id, clearCurrentProfile, getCurrentProfile, getCurrentProfileStatus, isAuth, myId])

/*  render*/

    if (!isAuth && !match.params.id)
        return <Redirect to={'/login'}/>
    else if (!CurrentProfile)
        return <PreLoader/>
    else if (isAuth && CurrentProfile.userId === myId)
        return <Profile isAuthedOwner={true} CurrentProfile={CurrentProfile} {...restProps}/>
    else return <Profile CurrentProfile={CurrentProfile} {...restProps}/>
}



/*class ProfileContainer extends React.Component {
    refreshProfile() {
        if (this.props.match.params.id) {
            this.props.getCurrentProfile(this.props.match.params.id)
            this.props.getCurrentProfileStatus(this.props.match.params.id)
        } else if (this.props.isAuth) {
            this.props.getCurrentProfile(this.props.myId)
            this.props.getCurrentProfileStatus(this.props.myId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.refreshProfile()
        }
    }

    componentWillUnmount() {
        this.props.actions.clearCurrentProfile()
    }

    render() {
        if (!this.props.isAuth && !this.props.match.params.id)
            return <Redirect to={'/login'}/>
        else if (this.props.CurrentProfile === null )
            return <PreLoader/>
        else if (this.props.isAuth && this.props.CurrentProfile.userId === this.props.myId)
            return <Profile isAuthedOwner={true} {...this.props}/>
        else return <Profile {...this.props}/>
    }
}*/



let mapStateToProps = (state: TState): TMappedState => {
    return {
        CurrentProfile: selectCurrentProfile(state),
        CurrentProfilePhotos: selectCurrentProfilePhotos(state),
        CurrentStatus: selectCurrentStatus(state),
        hasPhoto: selectHasPhoto(state),
        isAuth: selectIsAuth(state),
        myId: selectMyId(state)
    }
}

export default compose<React.ComponentType>(
    connect<TMappedState, TDispatchProps, {}, TState>(mapStateToProps, {
        getCurrentProfile,
        getCurrentProfileStatus,
        sendToUpdateStatus,
        sendToUpdateProfileData,
        sendToUpdateProfilePhoto,
        clearCurrentProfile: actions.clearCurrentProfile
    }),
    withRouter)
(ProfileContainer)