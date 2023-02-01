import React from 'react'
import { Route, Routes } from "react-router-dom"
import AddOrder from '../Components/Add-order'
import AddUser from '../Components/Add-user'
import GetOrder from '../Components/Get-order'
import LoginUser from '../Components/Login-user'
import PrivetRoute from './PrivetRoute'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<AddUser/>}></Route>
            <Route path='/login-user' element={<LoginUser/>}></Route>
            <Route path='/add-order' element={<PrivetRoute><AddOrder/></PrivetRoute>}></Route>
            <Route path='/get-order' element={<PrivetRoute><GetOrder/></PrivetRoute>}></Route>
        </Routes>
    )
}

export default Router