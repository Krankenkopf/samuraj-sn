import React from 'react'
import {connect} from "react-redux";
import {getCurrentProfile,
    getCurrentProfileStatus,
    sendToUpdateStatus,
    clearCurrentProfile} from "../../../redux/ProfileReducer";
import Profile from './Profile'
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {selectMyId, selectCurrentProfile, selectIsAuth, selectCurrentStatus} from "../../../selectors/selectors";

class ProfileContainer extends React.Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getCurrentProfile(this.props.match.params.id)
            this.props.getCurrentProfileStatus(this.props.match.params.id)
        } else if (this.props.isAuth) {
            this.props.getCurrentProfile(this.props.myId)
            this.props.getCurrentProfileStatus(this.props.myId)
        }
    }
    componentWillUnmount() {
        this.props.clearCurrentProfile()
        }

    render() {
        if (!this.props.isAuth && !this.props.match.params.id) {
            return <Redirect to={'/login'} />
        }
        else return <Profile {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        CurrentProfile: selectCurrentProfile(state),
        CurrentStatus: selectCurrentStatus(state),
        isAuth: selectIsAuth(state),
        myId: selectMyId(state)
    }
}

export default compose(
    connect(mapStateToProps,{getCurrentProfile,
    getCurrentProfileStatus,
    sendToUpdateStatus,
    clearCurrentProfile}),
    withRouter)
(ProfileContainer)