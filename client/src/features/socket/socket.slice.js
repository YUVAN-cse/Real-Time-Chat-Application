import { createSlice } from '@reduxjs/toolkit'
import io from "socket.io-client";

const initialState = {
    socket: null,
    onlineUsers: []
}

export const socketSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initializeSocket: (state, action) => {
            const socket = io("http://localhost:3000", {
                query: {
                    userId: action?.payload
                }
            });

            state.socket = socket
        },

        updateOnlineUsers: (state, action) => {
            state.onlineUsers = action?.payload
        }
    },
})


export const { initializeSocket , updateOnlineUsers } = socketSlice.actions

export default socketSlice.reducer