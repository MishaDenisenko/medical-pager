import React from 'react';
import {AddChannel} from "../assets";

const TeamChannelList = ({setToggleContainer, children, err = false, loading, type, isCreating, setCreateType, setIsCreating, setIsEditing}) => {
    if (err) {
        return type === 'team' ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>
                    Connection error, please wait a moment ant try again.
                </p>
            </div>
        ) : null;
    }

    if (loading) {
        return (
            <div className='team-channel-list'>
                <p className='team-channel-list__message loading'>
                    {type === 'team' ? 'Channels' : 'Message'} loading...
                </p>
            </div>
        );
    }

    return (
        <div className='team-channel-list'>
            <div className='team-channel-list__header'>
                <p className='team-channel-list__header__title'>
                    {type === 'team' ? 'Channels' : 'Direct Message'}
                </p>
                <AddChannel
                    isCreating={isCreating}
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    type={type}
                />
            </div>
            {children.props?.children && children}
        </div>
    );
};

export default TeamChannelList;