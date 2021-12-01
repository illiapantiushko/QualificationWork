import React from 'react'
import { Breadcrumb } from 'antd';
import { NavLink } from "react-router-dom";

const Navbar=()=> {
    return (
        <div>
    <Breadcrumb>
    <Breadcrumb.Item>
    <NavLink to="/">Home</NavLink> 
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    <NavLink to="/login">Login</NavLink> 
    </Breadcrumb.Item>

  </Breadcrumb>,
        </div>
    )
}

export default Navbar;
