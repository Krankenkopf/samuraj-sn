import React from 'react'
import {connect} from "react-redux";
import {
    getCurrentProfile,
    getCurrentProfileStatus,
    sendToUpdateStatus,
    clearCurrentProfile, sendToUpdateProfileData, sendToUpdateProfilePhoto
} from "../../../redux/ProfileReducer";
import Profile from './Profile'
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {
    selectMyId,
    selectCurrentProfile,
    selectIsAuth,
    selectCurrentStatus,
    selectCurrentProfilePhotos, selectHasPhoto
} from "../../../selectors/selectors";
import PreLoader from "../../Preloader";

class ProfileContainer extends React.Component {

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
        this.props.clearCurrentProfile()
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
}

let mapStateToProps = (state) => {
    return {
        CurrentProfile: selectCurrentProfile(state),
        CurrentProfilePhotos: selectCurrentProfilePhotos(state),
        CurrentStatus: selectCurrentStatus(state),
        hasPhoto: selectHasPhoto(state),
        isAuth: selectIsAuth(state),
        myId: selectMyId(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        getCurrentProfile,
        getCurrentProfileStatus,
        sendToUpdateStatus,
        sendToUpdateProfileData,
        sendToUpdateProfilePhoto,
        clearCurrentProfile
    }),
    withRouter)
(ProfileContainer)