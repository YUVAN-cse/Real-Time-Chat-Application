import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { useState } from 'react'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { userLoginThunk } from '../../features/user/user.thunk.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated } = useSelector((state) => state.user)


    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])

    const handleInput = (e) => {
        e.preventDefault()
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await dispatch(userLoginThunk(loginData))

        if (response.payload.success) {
            navigate("/")
        }
    }

    return (
        <div className="container text-center" style={{ height: "90vh", overflowY: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="row text-start" style={{ backgroundColor: "gray", color: "white", padding: "30px", borderRadius: "20px", width: "400px" }}>
                <h2>Please Login </h2>
                <hr />
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInput} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={handleInput} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
                <p>Don't have an account <Link to="/register" style={{ color: "black" }}>Register</Link></p>
            </div>
        </div>
    )
}

export default Login
