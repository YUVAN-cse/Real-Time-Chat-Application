import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {

    const {isAuthenticated , isScreenLoading} = useSelector((state) => state.user)

    const navigate = useNavigate()

    useEffect(() => {
      if (!isAuthenticated && !isScreenLoading) {
        navigate("/login")
      }
    }, [isAuthenticated, isScreenLoading])

  return (
   children
  )
}

export default ProtectRoute