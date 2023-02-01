import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivetRoute = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("voosh-user-Token"))
    if (!token) {
        return <Navigate to="/login-user" />
    }
    return children
}

export default PrivetRoute