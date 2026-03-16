import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Mainbar from './Mainbar'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, disconnectSocket, getSocket } from '../../features/socket/socket.slice'
import { updateOnlineUsers } from '../../features/socket/socket.slice'
import { setNewMessage } from '../../features/message/message.slice'
import { getAllUsersThunk } from '../../features/user/user.thunk'

const Home = () => {

    const dispatch = useDispatch()
    let { isAuthenticated, userProfile } = useSelector(state => state.user)

    // ✅ Removed: let { socket } = useSelector(state => state.socket)
    // Socket is no longer in Redux — read via getSocket()

    // 1️⃣ Initialize socket when user logs in
    useEffect(() => {
        if (!isAuthenticated) return
        if (!userProfile?._id) return   
        dispatch(initializeSocket(userProfile?._id))
    }, [isAuthenticated, userProfile])

    // 2️⃣ Fetch all users once on mount
    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [dispatch])

    // 3️⃣ Attach socket listeners after socket is initialized
    useEffect(() => {
        if (!isAuthenticated) return

        // Small delay to ensure initializeSocket thunk has run first
        const timeout = setTimeout(() => {
            const socket = getSocket()
            if (!socket) return

            socket.on('onlineUsers', (data) => {
                dispatch(updateOnlineUsers(data))
            })

            socket.on('message', (data) => {
                dispatch(setNewMessage(data))
            })
        }, 0)

        return () => {
            clearTimeout(timeout)
            dispatch(disconnectSocket())
        }

    }, [isAuthenticated])  // ✅ Depends on isAuthenticated, not socket object

    return (
        <div
            style={{
                height: '100vh',
                overflowX: 'hidden',
                overflowY: 'hidden',
                backgroundColor: '#f0f2f5',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* ── Top Navbar ── */}
            <div
                style={{
                    height: '10vh',
                    minHeight: '56px',
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 24px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    flexShrink: 0,
                    gap: 12,
                }}
            >
                {/* Logo / Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            backgroundColor: '#25d366',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.18-1.57A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87.99 1.02-3.76-.24-.38A9.94 9.94 0 012 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0122 12c0 5.52-4.48 10-10 10zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
                        </svg>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e', letterSpacing: '-0.3px' }}>
                        ChatApp
                    </span>
                </div>

                <div style={{ flex: 1 }} />

                {/* User avatar (top-right) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            backgroundColor: '#d1fae5',
                            border: '2px solid #25d366',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {userProfile?.data?.avatar ? (
                            <img
                                src={userProfile.data.avatar}
                                alt="me"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#16a34a' }}>
                                {userProfile?.data?.username?.[0]?.toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e' }}>
                        {userProfile?.data?.username || 'Me'}
                    </span>
                </div>
            </div>

            {/* ── Main Content: Sidebar + Mainbar ── */}
            <div
                className="row g-0"
                style={{ flex: 1, height: '90vh', overflow: 'hidden' }}
            >
                <div
                    className="col-4"
                    style={{
                        height: '100%',
                        borderRight: '1px solid #e9ecef',
                        backgroundColor: '#ffffff',
                        overflowY: 'auto',
                    }}
                >
                    <Sidebar />
                </div>

                <div
                    className="col-8"
                    style={{
                        height: '100%',
                        backgroundColor: '#f0f2f5',
                        overflowY: 'hidden',
                    }}
                >
                    <Mainbar />
                </div>
            </div>
        </div>
    )
}

export default Home