import { createSlice } from '@reduxjs/toolkit'
import { messageGetThunk, sendMessageThunk } from './message.thunk.js'

const initialState = {
  isButtonLoading: false,
  messages: [], // array of { _id, senderId, receiverId, message, createdAt }
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      // Get messages
      .addCase(messageGetThunk.pending, (state) => {
        state.isButtonLoading = true
      })
      .addCase(messageGetThunk.fulfilled, (state, action) => {
        state.isButtonLoading = false
        console.log(action.payload)
        state.messages = action.payload // array
      })
      .addCase(messageGetThunk.rejected, (state) => {
        state.isButtonLoading = false
      })

      // Send message
      .addCase(sendMessageThunk.pending, (state) => {
        state.isButtonLoading = true
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isButtonLoading = false
        state.messages.push(action.payload) 
      })
      .addCase(sendMessageThunk.rejected, (state) => {
        state.isButtonLoading = false
      })
  },
})

export const { setNewMessage } = messageSlice.actions
export default messageSlice.reducer
