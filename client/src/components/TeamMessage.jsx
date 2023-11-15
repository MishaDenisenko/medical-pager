import React from 'react';
import {
    MessageText,
    MessageActions,
    MessageOptions,
    MessageTimestamp,
    MessageDeliveredIcon,
    MessageSimple,
    Message
} from "stream-chat-react";

const TeamMessage = ({key, props}) => {
    const message = <MessageSimple {...props}/>
    return (
        <div>
            {message}
        </div>

    );
};

export default TeamMessage;