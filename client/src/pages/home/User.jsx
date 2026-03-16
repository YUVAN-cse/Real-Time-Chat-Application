import React from 'react';
import './User.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../../features/user/user.slice.js';

const User = ({ user }) => {
  const { selectedUser } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const isSelected = selectedUser?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  const handleSlected = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={handleSlected}
      className={`chat-user-preview ${isSelected ? 'selected' : ''}`}
    >
      {/* Avatar with online dot */}
      <div className="avatar-wrapper">
        <img
          src={
            user.avatar ||
            'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'
          }
          alt={user.username}
          className="avatar"
        />
        {isOnline && <span className="online-dot" />}
      </div>

      {/* Info */}
      <div className="chat-info">
        <div className="chat-header">
          <span className={`chat-name ${isOnline ? 'online' : ''}`}>
            {user.username}
          </span>
          {isOnline && (
            <span className="online-label">Online</span>
          )}
        </div>
        <div className="chat-bottom">
          <span className="chat-message">
            {isOnline ? 'Active now' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default User;