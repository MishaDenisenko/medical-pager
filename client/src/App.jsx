import React, {useState} from 'react';
import {StreamChat} from "stream-chat";
import {Chat} from "stream-chat-react";
import Cookies from "universal-cookie/es6";
import 'stream-chat-react/dist/css/index.css'
import './App.css';

import {ChannelListContainer, ChannelContainer, Auth} from "./components";

const api_key = '2b7stuffutcm';
const stream_client = StreamChat.getInstance(api_key);
const theme = 'team light';

const cookies = new Cookies();

const authToken = cookies.get('token');
if (authToken) {
    stream_client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber')
    }, authToken);
}

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (!authToken) return <Auth/>;

    return (
        <div className="app__wrapper">
            <Chat client={stream_client} theme={theme}>
                <ChannelListContainer
                    isCreating={isCreating}
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    isEditing={isEditing}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
};

export default App;