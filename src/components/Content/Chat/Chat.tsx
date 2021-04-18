import React from 'react';
import classes from './Chat.module.css';
import Thread from "./Thread/Thread";
import Person from "./Person/Person";
import ReduxMessageForm from "./MessageForm";
import {AddMessageActionType, PersonDataType, SetThreadActionType, ThreadType} from "../../../redux/ChatReducer";

type TProps = {
    PersonalData:  Array<PersonDataType>
    Threads: Array<ThreadType>
    isAuth: boolean
    setThread: (id: number) => SetThreadActionType
    addMessage: (message: string, id: number) => AddMessageActionType

}

const Chat = (props: TProps) => {
    let PersonElement = props.PersonalData.map(name => (
        <Person person={name.person} id={name.id} setThread={props.setThread}/>));
    let thread: ThreadType | undefined = props.Threads.find(t => t.isActive)
    let onSubmit = (message: string, threadId: number | undefined) => {
        if (threadId) props.addMessage(message, threadId)
    }



    return (
        <div className={classes.chat}>
            <div>
                {PersonElement}
            </div>
            <div className={classes.chatArea}>
                <div>
                    <Thread Messages={thread ? thread.messages : null} />
                </div>
                {/* @ts-ignore */}
                <ReduxMessageForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Chat;