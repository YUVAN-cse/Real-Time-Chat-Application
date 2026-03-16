import React from 'react'
import User from './User'
import { userLogoutThunk } from '../../features/user/user.thunk'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { otherUsers } = useSelector((state) => state.user)

  const handleLogout = async () => {
    let response = await dispatch(userLogoutThunk())
    if (response.type === 'users/logout/fulfilled') {
      navigate('/login')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        padding: '16px',
        gap: '12px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e9ecef',
      }}
    >
      {/* ── Search Bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: '#f0f2f5',
          borderRadius: '12px',
          padding: '8px 14px',
          border: '1px solid #e9ecef',
        }}
      >
        {/* Search icon */}
        <svg
          width="15"
          height="15"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#9ca3af"
          style={{ flexShrink: 0 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search or start a new convo"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '0.85rem',
            color: '#1a1a2e',
          }}
        />
      </div>

      {/* ── Section Label ── */}
      <div
        style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#9ca3af',
          textTransform: 'uppercase',
          paddingLeft: 4,
        }}
      >
        Conversations
      </div>

      {/* ── Users List ── */}
      <div
        style={{
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {otherUsers && otherUsers.length > 0 ? (
          otherUsers.map((user) => (
            <User key={user._id} user={user} />
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: 10,
              color: '#9ca3af',
            }}
          >
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#d1d5db">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6zM3 14a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
            <span style={{ fontSize: '0.8rem' }}>No users found</span>
          </div>
        )}
      </div>

      {/* ── Logout Button ── */}
      <div style={{ flexShrink: 0 }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            height: '42px',
            border: 'none',
            borderRadius: '12px',
            backgroundColor: '#fff1f2',
            color: '#e11d48',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffe4e6'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff1f2'}
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar