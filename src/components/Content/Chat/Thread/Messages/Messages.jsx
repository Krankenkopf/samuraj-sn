import React from 'react';
import classes from './../Thread.module.css';
import Message from "./Message/Message";

const Messages = (props) => {
    let message = props.Messages.map (m => {
    return (<Message Message={m.message} />)
    })
    return (
        <div className={classes.messageArea}>
        {message}
        </div>
    )
}

export default Messages;