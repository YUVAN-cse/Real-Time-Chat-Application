import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const messageGetThunk = createAsyncThunk(
  'get/messages',
  async ({ recieverId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/message/${recieverId}`,
        { withCredentials: true }
      )
      console.log(data)
      return data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      )
    }
  }
)

export const sendMessageThunk = createAsyncThunk(
  'send/message',
  async ({ recieverId, message }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/message/${recieverId}`,
        { message },
        { withCredentials: true }
      )

      return data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      )
    }
  }
)