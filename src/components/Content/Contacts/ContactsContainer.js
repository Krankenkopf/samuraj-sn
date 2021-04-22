import React from 'react';
import {connect} from "react-redux";
import Contacts from "./Contacts";
import {
    getUsers,
    reproccingUsers,
    setCurrentPage,
    toggle,
    isFetchingSwitch,
    toggleFollowingInProgress,
    setUsers
} from "../../../redux/ContactsReducer";
import {usersSelector} from "../../../selectors/selectors";

class ContactsContainer extends React.Component {

    componentDidMount() {
        this.props.setUsers(this.props.PageSize, this.props.CurrentPage)
    }

    render() {
        return <Contacts {...this.props}/>;
    }
}



let mapStateToProps = (state) => {
    return {
        Users: usersSelector(state),
        PageCount: state.Contacts.PageCount,
        PageSize: state.Contacts.PageSize,
        CurrentPage: state.Contacts.CurrentPage,
        PagesSet: state.Contacts.PagesSet,
        isFetching: state.Contacts.isFetching,
        UserFollowingInProgress: state.Contacts.UserFollowingInProgress
    }
}


export default connect(mapStateToProps,
    {getUsers, reproccingUsers, setCurrentPage,
        isFetchingSwitch, toggleFollowingInProgress,
        /*thunks*/
        toggle, setUsers})(ContactsContainer);