import React , { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'


const Navbar = () => {

const {user} = useContext(UserContext)
// console.log(user)

// todo login/logout when user ready
    return (
        <div className='navbar'>
            <div className='navbar-posts'>
                <NavLink activeClassName='active' to="/">Home</NavLink>
                <NavLink activeClassName='active' to="/posts">Posts</NavLink>
                <NavLink activeClassName='active' to="/users/:id/write">Create</NavLink>
            </div>

            <div className='navbar-user'>
                {user? <NavLink activeClassName='active' to="/users/:id">{user.username}</NavLink> : <> <NavLink activeClassName='active' to="/login">Login</NavLink> 
                <NavLink activeClassName='active' to="/register">Register</NavLink></> }
            </div>
        </div>
    )
}

export default Navbar
