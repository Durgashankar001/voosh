import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"

const GetOrder = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("voosh-user-Token"))
        if (!token) {
            alert("Please login first to continue")
        } else {
            const decoded = jwt_decode(token)
            if (decoded.id) {
                axios.get(`http://localhost:8080/get-order?user_id=${decoded.id}`, {
                    headers: {
                        "x-authorization": `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        setData(res.data.data)
                    })
                    .catch((e) => {
                        alert("something went wrong while accessing the data")
                    })
            }
        }
    }, [])
    return (
        <div className='main-data'>
            {
                data && data.map((e) => (
                    <div className='main-data-body'>
                        <div className='data-body'></div>
                        <div className='data-text'>
                            <p>Phone : {e.phone_number}</p>
                            <p>sub-total : {e.sub_total}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default GetOrder