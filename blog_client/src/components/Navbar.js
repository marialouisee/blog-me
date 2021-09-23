import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar-posts'>
                <NavLink activeClassName='active' to="/">Home</NavLink>
                <NavLink activeClassName='active' to="/posts">Posts</NavLink>
                <NavLink activeClassName='active' to="/write">Create</NavLink>
            </div>

            <div className='navbar-user'>
                <NavLink activeClassName='active' to="/login">Login</NavLink>
                <NavLink activeClassName='active' to="/register">Register</NavLink>
            </div>
        </div>
    )
}

export default Navbar
