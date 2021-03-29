import React from 'react';
import classes from './News.module.css';
import Post from './News1/newsDefault';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utilities/Validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";


const News = (props) => {
    let posts = props.Texts.map((txt) => {
        return (<Post text={txt.text}/>);
    });
    let onSubmit = (post) => {
        props.addPost(post.newPost)
    }
    return (
        <div>
            <ReduxPostForm onSubmit={onSubmit} />
            <div>
                {posts}
            </div>
        </div>
    )
}

let maxLength = maxLengthCreator(10)

const PostForm = (props) => {
    return (
        <div className={classes.addPost}>
            <h3> News </h3>
            <form onSubmit={props.handleSubmit}>
                <Field component={Textarea}
                       name={'newPost'}
                       placeholder={'Schreib new post hier!'}
                       validate={[requiredField, maxLength]}
                       className={classes.area}/>
                <button> Add </button>
            </form>
        </div>
    )
}

const ReduxPostForm = reduxForm({form: 'postForm'})(PostForm)

export default News;
