import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userRegisterThunk } from '../../features/user/user.thunk.js'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated } = useSelector((state) => state.user)

    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])

    const handleInput = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setRegisterData({
                ...registerData,
                avatar: files[0],   // store the file object
            });
        } else {
            setRegisterData({
                ...registerData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(registerData)

        let response = await dispatch(userRegisterThunk(registerData))

        setRegisterData({
            username: "",
            email: "",
            password: ""
        })

        console.log("response is ", response.payload.success)

        if (response.payload.success) {
            navigate("/")
        }
    }

    return (
        <div className="container text-center" style={{ height: "90vh", overflowY: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="row text-start" style={{ fontSize: "20px", backgroundColor: "gray", color: "white", padding: "10px 30px", borderRadius: "20px", width: "400px" }}>
                <h3>Please Register </h3>
                <hr />
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                        <input type="text" name='username' className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInput} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAvatar" className="form-label">Avatar</label>
                        <input type="file" name='avatar' className="form-control" id="exampleInputAvatar" onChange={handleInput} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
                <p>Already have an account? <Link to="/login" style={{ color: "black" }}>Login</Link></p>
            </div>
        </div>
    )
}

export default Register
