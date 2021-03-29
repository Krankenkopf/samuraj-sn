import React from 'react';
import classes from './../../Thread.module.css';

const Message = (props) => {
    return (
        <div className={classes.yourMessage}>
            {props.Message}
        </div>
    )
}

export default Message;