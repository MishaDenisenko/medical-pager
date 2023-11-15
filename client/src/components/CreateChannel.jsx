import React, {useState} from 'react';
import {useChatContext} from "stream-chat-react";
import {UserList} from './';
import {CloseCreateChannel} from "../assets";

const ChannelNameInput = ({channelName = '', setChannelName}) => {
    const handleChange = (e) => {
        e.preventDefault();
        setChannelName(e.target.value);
    }

    return (
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder='input channel name (withot spaces)'/>
            <p>Add members</p>
        </div>
    )
}

const CreateChannel = ({createType, setIsCreating}) => {
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);

    const [channelName, setChannelName] = useState('');
    
    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const newChannel = client.channel(createType, channelName, {name: channelName, members: selectedUsers});

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel (newChannel);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='create-channel__container'>
            <div className='create-channel__header'>
                <p>{createType === 'team' ? 'Create New Chat' : 'Send Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className='create-channel__button-wrapper' onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    );
};

export default CreateChannel;