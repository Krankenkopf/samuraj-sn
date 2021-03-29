import Chat from "./Chat";
import {addMessage, setThread} from "../../../redux/ChatReducer";
import {connect} from "react-redux";
import AuthHoc from "../../Hocs/AuthHoc";
import {compose} from "redux";
import {selectThreads, selectPersonalData} from "../../../selectors/selectors";

let mapStateToProps = (state) => {
    return {
        PersonalData: selectPersonalData(state),
        Threads: selectThreads(state),
    }

}

let mapAuthDataToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth
    }
}

/*const ChatContainer = ();
let withAuthDataChatContainer = ((ChatContainer))*/

export default compose(
    connect(mapStateToProps, {setThread, addMessage}),
    connect(mapAuthDataToProps),
    AuthHoc
)(Chat)

/*export default withAuthDataChatContainer;*/
