import {addPost} from "../../../redux/MainPageReducer";
import News from "./News";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        Texts: state.MainPage.Texts,
        NewText: state.MainPage.NewText
    }
}

const NewsContainer = connect(mapStateToProps, {addPost})(News);

export default NewsContainer;
