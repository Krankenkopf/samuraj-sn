import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/AuthReducer";
import {selectIsAuth, selectLogin, selectMyId} from "../../selectors/selectors";


class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        login: selectLogin(state),
        myId: selectMyId(state),
        isAuth: selectIsAuth(state)
    }

}

export default connect(mapStateToProps, {logout})(HeaderContainer);