import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import Contacts from "./Contacts";
import {
    setCurrentPage,
    toggle,
    isFetchingSwitch,
    setUsers, TInternalDataUser
} from "../../../redux/ContactsReducer";
import {usersSelector} from "../../../selectors/selectors";
import {TState} from "../../../redux/store";

type TMappedState = {
    users: Array<TInternalDataUser>
    pageCount: number
    pageSize: number
    currentPage: number
    pagesSet: Array<number>
    isFetching: boolean
    userFollowingInProgress: Array<number>
}

type TDispatchProps = {
    setCurrentPage: (page: number) => void
    isFetchingSwitch: (status: number) => void
    toggle: (id: number, isAhrlist: boolean) => void
    setUsers: (pageSize: number, currentPage: number) => void
}

const ContactsContainer: FC<TMappedState & TDispatchProps> =
    ({pageSize, currentPage, setUsers, ...restProps}) => {
    useEffect(() => {
        setUsers(pageSize, currentPage)
    }, [pageSize, currentPage, setUsers])

    return <Contacts pageSize={pageSize} currentPage={currentPage} {...restProps}/>
}

/*class ContactsContainerC extends React.Component {

    componentDidMount() {
        this.props.setUsers(this.props.PageSize, this.props.CurrentPage)
    }

    render() {
        return <Contacts {...this.props}/>;
    }
}*/



let mapStateToProps = (state: TState): TMappedState => {
    return {
        users: usersSelector(state),
        pageCount: state.Contacts.PageCount,
        pageSize: state.Contacts.PageSize,
        currentPage: state.Contacts.CurrentPage,
        pagesSet: state.Contacts.PagesSet,
        isFetching: state.Contacts.isFetching,
        userFollowingInProgress: state.Contacts.UserFollowingInProgress
    }
}


export default connect<TMappedState, TDispatchProps, {}, TState>(mapStateToProps,
    {setCurrentPage,
        isFetchingSwitch,
        /*thunks*/
        toggle, setUsers})(ContactsContainer);