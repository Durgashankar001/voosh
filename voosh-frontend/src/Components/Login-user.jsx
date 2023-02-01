import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from "axios"

const intialState = {
    phone_number: "",
    password: "",
}

const LoginUser = () => {
    const [data, setData] = useState(intialState)
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.phone_number == "" || data.password == "") {
            alert("Please fill all the fields")
        } else {
            try {
                axios.post("https://voosh-backend-production.up.railway.app/login-user", data).then((res) => {
                    localStorage.setItem("voosh-user-Token",JSON.stringify(res.data.token))
                    alert("Login Successfull")
                    navigate("/add-order")
                })
                .catch((e)=>{
                    if(e.request.status==401){
                        alert("No account registered with this number.")
                    }else if(e.request.status==403){
                        alert("wrong credential! Please try with some different credential.")
                    }else{
                        alert("we are facing some issue in our backend! Please try after some time.")
                    }
                })
            }
            catch(e) {
                alert("we are facing some issue in our backend! Please try after some time.")
                
            }

        }
    }
        return (
            <div>
                <div>
                    <div className='my_form'>
                        <form action="" onSubmit={handleSubmit} id="form">
                            <h1>Login</h1>
                            <label htmlFor="">Phone Number</label>
                            <input type="text" name="phone_number" id="" onChange={handleChange} value={data.email} placeholder="Enter Your Phone Number" required />
                            <label htmlFor="">Password</label>
                            <input type="password" name="password" onChange={handleChange} value={data.password} required placeholder='Enter Your Password' />
                            <p>Don't have any account ?<span onClick={()=>navigate("/")}> Signup here</span></p>
                            <input type="submit" value="Submit" className='btn' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    export default LoginUser