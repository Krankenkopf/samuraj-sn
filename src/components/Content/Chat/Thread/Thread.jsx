import React from 'react';
import Messages from './Messages/Messages'

const Thread = (props) => {
    return (
        <div>
            <div>
                <Messages Messages={props.Messages} />
            </div>

        </div>

    )
}

export default Thread;