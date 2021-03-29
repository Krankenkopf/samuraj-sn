import React from 'react';
import classes from './Chat.module.css';
import Thread from "./Thread/Thread";
import Person from "./Person/Person";
import ReduxMessageForm from "./MessageForm";


const Chat = (props) => {
    let PersonElement = props.PersonalData.map(name => (
        <Person person={name.person} id={name.id} setThread={props.setThread}/>));
    let thread = props.Threads.find(t => (t.isActive === true))
    let onSubmit = (message) => {
        props.addMessage(message, thread.id)
    }
    return (
        <div className={classes.chat}>
            <div>
                {PersonElement}
            </div>
            <div className={classes.chatArea}>
                <div>
                    <Thread Messages={thread.messages} />
                </div>
                <ReduxMessageForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Chat;