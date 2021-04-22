import React, {FC} from 'react';
import classes from './Chat.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TMessageFormData} from "./Chat";


type TMessageForm = InjectedFormProps<TMessageFormData>

const MessageForm: FC<TMessageForm> = (props) => {
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


export default reduxForm<TMessageFormData, {}, string>({form: 'messageForm'})(MessageForm)