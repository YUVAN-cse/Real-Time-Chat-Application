import { createSlice } from '@reduxjs/toolkit'
import io from 'socket.io-client'

// ✅ Socket instance lives OUTSIDE Redux — not serializable
let socketInstance = null

const initialState = {
    isConnected: false,
    onlineUsers: []
}

export const socketSlice = createSlice({
    name: 'socket',  // ✅ Fixed: was incorrectly named 'user'
    initialState,
    reducers: {
        setConnected: (state, action) => {
            state.isConnected = action.payload  // true / false
        },
        updateOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    },
})

export const { setConnected, updateOnlineUsers } = socketSlice.actions

// ✅ Socket init as a Thunk — side effects belong here, not in reducers
export const initializeSocket = (userId) => (dispatch) => {
    // Prevent duplicate connections
    if (socketInstance) return

    socketInstance = io(
        'http://localhost:3000',
        {
            query: { userId },
            withCredentials: true,
        }
    )

    socketInstance.on('connect', () => {
        dispatch(setConnected(true))
    })

    socketInstance.on('disconnect', () => {
        dispatch(setConnected(false))
    })
}

// ✅ Getter so other files (Home.jsx) can access the socket instance
export const getSocket = () => socketInstance

// ✅ Clean disconnect thunk
export const disconnectSocket = () => (dispatch) => {
    if (socketInstance) {
        socketInstance.disconnect()
        socketInstance = null
        dispatch(setConnected(false))
    }
}

export default socketSlice.reducer