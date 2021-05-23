import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {
    getCurrentProfile,
    getCurrentProfileStatus,
    sendToUpdateStatus,
    sendToUpdateProfileData,
    sendToUpdateProfilePhoto,
    actions
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



const ProfileContainer = (props) => {
    const refreshProfile = () => {
        if (props.match.params.id) {
            props.getCurrentProfile(props.match.params.id)
            props.getCurrentProfileStatus(props.match.params.id)
        } else if (props.isAuth) {
            props.getCurrentProfile(props.myId)
            props.getCurrentProfileStatus(props.myId)
        }
    }

    useEffect(() => {
        refreshProfile()
        return () => {
            props.clearCurrentProfile()
        }
    }, [props.match.params.id])

    if (!props.isAuth && !props.match.params.id)
        return <Redirect to={'/login'}/>
    else if (props.CurrentProfile === null)
        return <PreLoader/>
    else if (props.isAuth && props.CurrentProfile.userId === props.myId)
        return <Profile isAuthedOwner={true} {...props}/>
    else return <Profile {...props}/>
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
        clearCurrentProfile: actions.clearCurrentProfile
    }),
    withRouter)
(ProfileContainer)