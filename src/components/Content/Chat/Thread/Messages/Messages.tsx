import React, {FC} from 'react';
import classes from './../Thread.module.css';
import Message from "./Message/Message";
import {TChatMessage} from "../../../../../redux/ChatReducer";

type TMessagesProps = {
    messages: Array<TChatMessage>
}

const Messages: FC<TMessagesProps> = ({messages}) => {
    const mapMessages = () => {
       return messages.map (m => (<Message key={m.id} message={m.message} />))
    }

    return (
        <div className={classes.messageArea}>
            {messages ? mapMessages() : ''}
        </div>
    )
}

export default Messages;