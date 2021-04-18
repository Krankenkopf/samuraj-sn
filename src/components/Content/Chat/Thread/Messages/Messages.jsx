import React from 'react';
import classes from './../Thread.module.css';
import Message from "./Message/Message";

const Messages = (props) => {
    const mapMessages = () => {
       return props.Messages.map (m => (<Message Message={m.message} />))
    }


    return (
        <div className={classes.messageArea}>
        {props.Messages ? mapMessages() : ''}
        </div>
    )
}

export default Messages;