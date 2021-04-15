import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/AuthReducer";
import {selectIsAuth, selectLogin, selectMyId} from "../../selectors/selectors";
import {TState} from "../../redux/store";


type TMappedState = {
    login: string,
    myId: number | null,
    isAuth: boolean
}

type TDispatchProps = {
    logout: () => void
}

class HeaderContainer extends React.Component<TMappedState & TDispatchProps> {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state: TState): TMappedState => {
    return {
        login: selectLogin(state),
        myId: selectMyId(state),
        isAuth: selectIsAuth(state)
    }

}

export default connect<TMappedState, TDispatchProps, {}, TState>(mapStateToProps, {logout})(HeaderContainer)