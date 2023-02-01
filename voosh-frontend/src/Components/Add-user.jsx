import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const intialState = {
    name: "",
    phone_number: "",
    password: "",
}

const AddUser = () => {
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
        if (data.name == "" || data.phone_number == "" || data.password == "") {
            alert("Please fill all the fields")
        } else {
            try {
                axios.post("http://localhost:8080/add-user", data).then((res) => {
                    alert("Signup successfull")
                    navigate("/login-user")
                })
                    .catch((e) => {
                        if (e.request.status == 403) {
                            alert("User already exist in our database! Please try with some different credential.")
                        } else {
                            alert("we are facing some issue in our backend! Please try after some time.")
                        }
                    })
            }
            catch (e) {
                alert("we are facing some issue in our backend! Please try after some time.")
            }

        }

    }
    return (
        <div>
            <div className='my_form'>
                <form action="" onSubmit={handleSubmit} id="form">
                    <h1>SignUp</h1>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Your UserName' name='name' value={data.name} onChange={handleChange} required />
                    <label htmlFor="">Phone_Number</label>
                    <input type="text" name="phone_number" id="" onChange={handleChange} value={data.phone_number} placeholder="Enter Your Phone Number" required />
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" onChange={handleChange} value={data.password} required placeholder='Enter Your Password' />
                    <p>Already have an account ?<span onClick={() => navigate("/login-user")}> Login here</span></p>
                    <input type="submit" value="Submit" className='btn' />
                </form>
            </div>
        </div>
    )
}

export default AddUser