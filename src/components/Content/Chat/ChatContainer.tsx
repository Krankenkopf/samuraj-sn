import Chat from "./Chat";
import {
    addMessage,
    AddMessageActionType,
    PersonDataType,
    setThread,
    SetThreadActionType,
    ThreadType
} from "../../../redux/ChatReducer";
import {connect} from "react-redux";
import AuthHoc from "../../Hocs/AuthHoc";
import {compose} from "redux";
import {selectThreads, selectPersonalData} from "../../../selectors/selectors";
import {TState} from "../../../redux/store";

type TMappedState = {
    PersonalData:  Array<PersonDataType>
    Threads: Array<ThreadType>
}

type TDispatchProps = {
    setThread: (id: number) => SetThreadActionType
    addMessage: (message: string, id: number) => AddMessageActionType
}

let mapStateToProps = (state: TState): TMappedState => {
    return {
        PersonalData: selectPersonalData(state),
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

