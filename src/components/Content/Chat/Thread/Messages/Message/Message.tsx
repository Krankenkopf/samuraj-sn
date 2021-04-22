import React, {FC} from 'react';
import classes from './../../Thread.module.css';

type TMessageProps = {
    message: string
}

const Message: FC<TMessageProps> = ({message}) => {
    return (
        <div className={classes.yourMessage}>
            {message}
        </div>
    )
}

export default Message;