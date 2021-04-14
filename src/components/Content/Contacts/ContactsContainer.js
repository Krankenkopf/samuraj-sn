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
/*        this.props.getUsers([
            {
                id: "1",
                imgsrc: img1,
                isAhrlist: {value: false},
                firstName: "Hermann",
                pastName: "Schulze",
                position: "Executive Director",
                location: {country: "Belarus", city: "Petrukow"}
            },
            {
                id: "2",
                imgsrc: img2,
                isAhrlist: {value: true},
                firstName: "Alexandre",
                pastName: "Pripyatsky",
                position: "Concept Designer",
                location: {country: "Belarus", city: "Pinsk"}
            },
            {
                id: "3",
                imgsrc: img3,
                isAhrlist: {value: true},
                firstName: "Dzjakuj",
                pastName: "Jakzkusta",
                position: "President of The World Young Ahrlist Party",
                location: {country: "Antarctic", city: "Eschipobezhdaj"}
            },
            {
                id: "4",
                imgsrc: img4,
                isAhrlist: {value: true},
                firstName: "Kott",
                pastName: "Taporwrot",
                position: "Issues Consultant",
                location: {country: "Antarctic", city: "Eschipobezhdaj"}
            }])*/
        this.props.setUsers(this.props.PageSize, this.props.CurrentPage)
/*        this.props.setCurrentPage(1)*/
    }



/*    setUsers = (page) => {
                UsersAPI.getUsers(this.props.PageSize, page).then( response => {
                    this.props.reproccingUsers(response.data)
                    this.props.setCurrentPage(page)
                    this.props.isFetchingSwitch(response.status)
                })
        }*/

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

/*let mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (contacts) => {
            dispatch(getUsers(contacts))
        },
        reproccingUsers: (data) => {
            dispatch(reproccingUsers(data))
        },
        toggle: (id) => {
            dispatch(toggle(id))
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPage(currentPage))
        },
        isFetchingSwitch: (status) => {
            dispatch(isFetchingSwitch(status))
        }
    }
}*/

export default connect(mapStateToProps,
    {getUsers, reproccingUsers, setCurrentPage,
        isFetchingSwitch, toggleFollowingInProgress,
        /*thunks*/
        toggle, setUsers})(ContactsContainer);