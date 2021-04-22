import React, {FC} from 'react';
import classes from './Chat.module.css';
import Thread from "./Thread/Thread";
import Person from "./Person/Person";
import MessageForm from "./MessageForm";
import {AddMessageActionType, TPersonData, SetThreadActionType, TThread} from "../../../redux/ChatReducer";

type TChatProps = {
    PersonData:  Array<TPersonData>
    Threads: Array<TThread>
    setThread: (id: number) => SetThreadActionType
    addMessage: (message: string, id: number) => AddMessageActionType
}

export type TMessageFormData = {
    message: string
}

const Chat: FC<TChatProps> = ({PersonData, Threads, setThread, addMessage}) => {
    const PersonElement = PersonData.map(name => (
        <Person key={name.id} person={name.person} id={name.id} setThread={setThread}/>));
    const thread: TThread | undefined = Threads.find(t => t.isActive)
    const onSubmit = ({message}: TMessageFormData) => {
        if (thread) addMessage(message, thread.id)
    }


    return (
        <div className={classes.chat}>
            <div>
                {PersonElement}
            </div>
            <div className={classes.chatArea}>
                <div>
                    {thread ? <Thread messages={thread.messages} /> : ''}
                </div>
                {thread ? <MessageForm onSubmit={onSubmit}/> : ''}
            </div>
        </div>
    )
}

export default Chat;