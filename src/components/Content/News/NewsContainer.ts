import {addPost} from "../../../redux/MainPageReducer";
import News from "./News";
import {connect} from "react-redux";
import {TState} from "../../../redux/store";

type TMappedState = {
    texts: Array<{id: number, text: string}>
}

type TDispatchProps = {
    addPost: (post: string) => void
}

const mapStateToProps = (state: TState) : TMappedState => {
    return {
        texts: state.MainPage.Texts
    }
}

const NewsContainer = connect<TMappedState, TDispatchProps, {}, TState>(mapStateToProps, {addPost})(News);

export default NewsContainer;
