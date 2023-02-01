import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    let token = JSON.parse(localStorage.getItem("voosh-user-Token"))
    useEffect(() => {
        if (token == null) {
            document.getElementById("addOrder").style.display = "none"
            document.getElementById("getOrder").style.display = "none"
            document.getElementById("logout").style.display = "none"
            document.getElementById("signup").style.display = "block"
            document.getElementById("login").style.display = "block"
        } else {
            document.getElementById("addOrder").style.display = "block"
            document.getElementById("getOrder").style.display = "block"
            document.getElementById("logout").style.display = "block"
            document.getElementById("signup").style.display = "none"
            document.getElementById("login").style.display = "none"
        }
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem("voosh-user-Token")
        window.location.reload()
    }

    return (
        <div className='nav'>
            <h1 id='signup' onClick={() => navigate("/")}>SiginUp</h1>
            <h1 id='login' onClick={() => navigate("/login-user")}>Login</h1>
            <h1 id='addOrder' onClick={() => navigate("/add-order")}>Add Order</h1>
            <h1 id="getOrder" onClick={() => navigate("/get-order")}>Get Order</h1>
            <h1 id="logout" onClick={() => handleLogout()}>logout</h1>
        </div>
    )
}

export default Navbar