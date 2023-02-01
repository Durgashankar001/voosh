import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode"
import axios from 'axios'
const intialState = {
    phone_number: "",
    sub_total: "",
}

const AddOrder = () => {
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
        if (data.phone_number == "" || data.sub_total == "") {
            alert("Please fill all the fields")
        } else {
            const token = JSON.parse(localStorage.getItem("voosh-user-Token"))
            if (!token) {
                return alert("Please login first to continue")
            }
            const decoded = jwt_decode(token)
            if (decoded.id) {
                try {
                    axios.post("http://localhost:8080/add-order", {
                        user_id: decoded.id,
                        phone_number: data.phone_number,
                        sub_total: data.sub_total
                    }, {
                        headers: {
                            "x-authorization": `Bearer ${token}`
                        }
                    }).then((res) => {
                        alert("order added Successfull")
                        navigate("/get-order")
                    })
                        .catch((e) => {
                            if(e.request.status==403){
                                alert("Please login first to continue")
                            }else{
                                alert("we are facing some issue in our backend! Please try after some time.")
                            }
                        })
                }
                catch (e) {
                    alert("we are facing some issue in our backend! Please try after some time.")

                }
            } else {
                alert("we are facing some issue in our backend! Please try after some time.")
            }


        }
    }
    return (
        <div>
            <div>
                <div className='my_form'>
                    <form action="" onSubmit={handleSubmit} id="form">
                        <h1>Add Order</h1>
                        <label htmlFor="">Phone Number</label>
                        <input type="text" name="phone_number" id="" onChange={handleChange} value={data.email} placeholder="Enter Your Phone Number" required />
                        <label htmlFor="">Sub Total</label>
                        <input type="text" name="sub_total" onChange={handleChange} value={data.sub_total} required placeholder='Enter sub Total amount' />
                        <input type="submit" value="Submit" className='btn' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddOrder