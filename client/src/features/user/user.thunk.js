import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export const userLoginThunk = createAsyncThunk(
  'users/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/users/login`,
        { email, password },
        { withCredentials: true }
      )

      toast.success("Login Success")
      return data.data
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

export const userRegisterThunk = createAsyncThunk(
    'users/register',
    async ({ email, password, username, avatar }, { rejectWithValue }) => {
        try {

            const response = await axios.post(`http://localhost:3000/users/register`, {
                email,
                password,
                username,
                avatar
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            },{
                withCredentials: true
            })

            toast.success("register Success")
            return response.data.data
        } catch (error) {
            console.log(error)
            let errorMsg = error.response.data.message
            toast.error(errorMsg)
            return rejectWithValue(errorMsg)

        }

    }
)

export const userLogoutThunk = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/logout`,{
          withCredentials: true
        }
      );

      toast.success("Logout Success");
      return response.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message;
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  'users/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/profile`,{
          withCredentials: true
        }
      );
      return response.data.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const getAllUsersThunk = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/message/allUsers`,
        { withCredentials: true }
      )

      return response.data.data
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message
      return rejectWithValue(errorMsg)
    }
  }
)