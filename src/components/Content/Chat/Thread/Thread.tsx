import React, {FC} from 'react';
import Messages from './Messages/Messages'
import {TChatMessage} from "../../../../redux/ChatReducer";

type TThreadProps = {
    messages: Array<TChatMessage>
}

const Thread: FC<TThreadProps> = ({messages}) => {
    return (
        <div>
            <div>
                <Messages messages={messages} />
            </div>
        </div>
    )
}

export default Thread;