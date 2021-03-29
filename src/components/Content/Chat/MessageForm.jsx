import React from 'react';
import classes from './Chat.module.css';
import {Field, reduxForm} from "redux-form";




const MessageForm = (props) => {
    return (
                <div className={classes.inputArea}>
                    <form onSubmit={props.handleSubmit}>
                        <Field component={'input'}
                               type={'textarea'}
                               name={'message'}
                               placeholder={"Yo"}
                               className={classes.textarea}
                               rows="3"
                        />
                        <button className={classes.button}>
                            Send
                        </button>
                    </form>
                </div>
    )
}

const ReduxMessageForm = reduxForm({form: 'messageForm'})(MessageForm)

export default ReduxMessageForm;