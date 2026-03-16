import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { messageGetThunk, sendMessageThunk } from '../../features/message/message.thunk.js';

const Mainbar = () => {
  const { selectedUser, userProfile } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    dispatch(messageGetThunk({ recieverId: selectedUser._id }));
  }, [selectedUser, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      dispatch(sendMessageThunk({ message: input, recieverId: selectedUser._id }));
      setInput('');
    }
  };

  const getBubbleStyle = (isSender) => ({
    borderTopLeftRadius: isSender ? '18px' : '4px',
    borderTopRightRadius: isSender ? '4px' : '18px',
    borderBottomLeftRadius: '18px',
    borderBottomRightRadius: '18px',
    maxWidth: '65%',
    wordBreak: 'break-word',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
  });

  return (
    <>
      {!selectedUser ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center h-100 text-muted"
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center mb-3"
            style={{ width: 64, height: 64, backgroundColor: '#f0f2f5' }}
          >
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="#adb5bd">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="fw-semibold" style={{ color: '#6c757d', fontSize: '0.95rem' }}>
            Select a conversation to start chatting
          </p>
        </div>
      ) : (
        <div
          className="d-flex flex-column border rounded-3 overflow-hidden"
          style={{ height: '89vh', backgroundColor: '#f0f2f5', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
        >
          {/* ── Chat Header ── */}
          <div
            className="d-flex align-items-center px-3 py-2 bg-white border-bottom"
            style={{ minHeight: '68px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          >
            <div className="position-relative me-3">
              <img
                src={
                  selectedUser?.avatar ||
                  'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'
                }
                alt="User Avatar"
                className="rounded-circle"
                width="46"
                height="46"
                style={{ objectFit: 'cover', border: '2px solid #d1fae5' }}
              />
              {/* Online indicator */}
              <span
                className="position-absolute rounded-circle border border-white"
                style={{
                  width: 11, height: 11,
                  backgroundColor: '#22c55e',
                  bottom: 1, right: 1,
                }}
              />
            </div>
            <div>
              <div className="fw-semibold" style={{ color: '#1a1a2e', fontSize: '0.95rem' }}>
                {selectedUser?.username}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 500 }}>Online</div>
            </div>

            {/* Header actions */}
            <div className="ms-auto d-flex gap-1">
              <button
                className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, border: 'none' }}
                title="Search"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6c757d">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
              </button>
              <button
                className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36, border: 'none' }}
                title="More options"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6c757d">
                  <circle cx="12" cy="5" r="1.2" fill="#6c757d" />
                  <circle cx="12" cy="12" r="1.2" fill="#6c757d" />
                  <circle cx="12" cy="19" r="1.2" fill="#6c757d" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Messages Area ── */}
          <div
            className="flex-grow-1 overflow-auto px-3 py-3 d-flex flex-column gap-2"
            style={{ backgroundColor: '#eae6df' }}
          >
            {messages.length === 0 && (
              <p className="text-center text-muted mt-4" style={{ fontSize: '0.8rem' }}>
                No messages yet — say hello! 👋
              </p>
            )}

            {messages.map((message, index) => {
              const isSender = message.senderId === userProfile?._id;
              return (
                <div
                  key={index}
                  className={`d-flex align-items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Receiver avatar beside bubble */}
                  {!isSender && (
                    <img
                      src={
                        selectedUser?.avatar ||
                        'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg'
                      }
                      alt=""
                      className="rounded-circle flex-shrink-0"
                      width="28"
                      height="28"
                      style={{ objectFit: 'cover', marginBottom: 2 }}
                    />
                  )}

                  <div
                    className={isSender ? 'text-white' : 'text-dark bg-white'}
                    style={{
                      ...getBubbleStyle(isSender),
                      backgroundColor: isSender ? '#25d366' : '#ffffff',
                      padding: '8px 12px',
                    }}
                  >
                    <div>{message.message}</div>
                    {message.createdAt && (
                      <div
                        style={{
                          fontSize: '0.68rem',
                          textAlign: 'right',
                          marginTop: 3,
                          opacity: 0.75,
                        }}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input Area ── */}
          <div
            className="px-3 py-2 bg-white border-top d-flex align-items-center gap-2"
            style={{ minHeight: '60px' }}
          >
            {/* Attachment icon */}
            <button
              className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: 36, height: 36, border: 'none', color: '#6c757d' }}
            >
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            <input
              type="text"
              className="form-control rounded-pill border-0"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                backgroundColor: '#f0f2f5',
                fontSize: '0.875rem',
                padding: '8px 16px',
                boxShadow: 'none',
              }}
            />

            <button
              className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              onClick={sendMessage}
              disabled={!input.trim()}
              style={{
                width: 38,
                height: 38,
                backgroundColor: input.trim() ? '#25d366' : '#e9ecef',
                border: 'none',
                transition: 'background-color 0.2s',
              }}
            >
              <svg
                width="16"
                height="16"
                fill={input.trim() ? 'white' : '#adb5bd'}
                viewBox="0 0 24 24"
                style={{ transform: 'rotate(90deg)' }}
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Mainbar;