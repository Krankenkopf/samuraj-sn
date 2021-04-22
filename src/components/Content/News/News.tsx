import React, {FC} from 'react';
import classes from './News.module.css';
import Post from './Posts/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utilities/Validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";


export type TPostFormData = {post: string}

type TNewsProps = {
    texts: Array<{id: number, text: string}>
    addPost: (post: string) => void
}

const News: FC<TNewsProps> = ({texts, addPost}) => {
    let posts = texts.map((txt) => {
        return (<Post key={txt.id} text={txt.text}/>);
    });
    let onSubmit = ({post}: TPostFormData) => {
        addPost(post)
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

const PostForm: FC<InjectedFormProps<TPostFormData>> = (props) => {
    return (
        <div className={classes.addPost}>
            <h3> News </h3>
            <form onSubmit={props.handleSubmit}>
                <Field component={Textarea}
                       name={'post'}
                       placeholder={'Schreib new post hier!'}
                       validate={[requiredField, maxLength]}
                       className={classes.area}/>
                <button> Add </button>
            </form>
        </div>
    )
}

const ReduxPostForm = reduxForm<TPostFormData, {}, string>({form: 'postForm'})(PostForm)

export default News;
