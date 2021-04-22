import Chat from "./Chat";
import {
    addMessage,
    AddMessageActionType,
    TPersonData,
    setThread,
    SetThreadActionType,
    TThread
} from "../../../redux/ChatReducer";
import {connect} from "react-redux";
import AuthHoc from "../../Hocs/AuthHoc";
import {compose} from "redux";
import {selectThreads, selectPersonalData} from "../../../selectors/selectors";
import {TState} from "../../../redux/store";

type TMappedState = {
    PersonData:  Array<TPersonData>
    Threads: Array<TThread>
}

type TDispatchProps = {
    setThread: (id: number) => SetThreadActionType
    addMessage: (message: string, id: number) => AddMessageActionType
}

let mapStateToProps = (state: TState): TMappedState => {
    return {
        PersonData: selectPersonalData(state),
        Threads: selectThreads(state),
    }

}

type TMappedAuthData = {
    isAuth: boolean
}

let mapAuthDataToProps = (state: TState): TMappedAuthData => {
    return {
        isAuth: state.Auth.isAuth
    }
}

export default compose(
    connect<TMappedState, TDispatchProps, {}, TState>(mapStateToProps, {setThread, addMessage}),
    connect<TMappedAuthData, {}, {}, TState>(mapAuthDataToProps),
    AuthHoc
)(Chat)

