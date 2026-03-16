import { createSlice } from '@reduxjs/toolkit'
import {  getAllUsersThunk, getUserProfileThunk, userLoginThunk, userLogoutThunk, userRegisterThunk } from './user.thunk.js'

const initialState = {
  isAuthenticated: false,
  isScreenLoading: true,
  isButtonLoading: false,
  selectedUser: null,
  otherUsers: [],
  userProfile: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
      console.log("selected user is ", state.selectedUser)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginThunk.pending, (state, action) => {
      console.log("pending")
      state.isButtonLoading = true
    })
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      console.log("fulfilled")
      state.isAuthenticated = true
      state.isButtonLoading = false
      state.userProfile = action.payload
    })
    builder.addCase(userLoginThunk.rejected, (state, action) => {
      console.log("rejected")
      state.isAuthenticated = false
      state.isButtonLoading = false
    })


    builder.addCase(userRegisterThunk.pending, (state, action) => {
      console.log("pending")
    })
    builder.addCase(userRegisterThunk.fulfilled, (state, action) => {
      console.log("fulfilled")
      state.isAuthenticated = true
      state.userProfile = action.payload
    })
    builder.addCase(userRegisterThunk.rejected, (state, action) => {
      console.log("rejected")
      state.isAuthenticated = false
    })


     builder.addCase(userLogoutThunk.pending, (state, action) => {
      console.log("pending")
    })
         builder.addCase(userLogoutThunk.fulfilled, (state, action) => {
      console.log("fulfilled")
      state.isAuthenticated = false
      state.userProfile = null
      state.isScreenLoading = false
    })
    builder.addCase(userLogoutThunk.rejected, (state, action) => {
      console.log("rejected")
      state.isAuthenticated = false
      state.isScreenLoading = false
    })


    
     builder.addCase(getUserProfileThunk.pending, (state, action) => {
      console.log("pending")
    })
         builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      console.log("fulfilled")
      state.isAuthenticated = true
      state.isScreenLoading = false
      state.userProfile = action.payload
    })
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      console.log("rejected")
      state.isAuthenticated = false
      state.isScreenLoading = false
    })



      builder.addCase(getAllUsersThunk.pending, (state, action) => {
      console.log("pending")
    })
         builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      console.log("fulfilled")
      state.isScreenLoading = false
      state.otherUsers = action.payload
    })
    builder.addCase(getAllUsersThunk.rejected, (state, action) => {
      console.log("rejected")
      state.isScreenLoading = false
    })

  },
})

// Action creators are generated for each case reducer function
export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer