import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { getUserProfileThunk } from './features/user/user.thunk.js'
import { getAllUsersThunk } from './features/user/user.thunk.js'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  
  useEffect( () => {
  (
    async () => {
      await dispatch(getUserProfileThunk())
      await dispatch(getAllUsersThunk())
    }
  )();

  }, [])

  return (
    <>
      <h1>CHAT-APP</h1>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App