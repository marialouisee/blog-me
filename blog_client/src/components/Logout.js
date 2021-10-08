import React, { useContext } from 'react'
import { logoutUser } from '../helpers/apiCalls'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserProvider'

const Logout = () => {
    const history = useHistory()
    const { setUser } = useContext(UserContext);

    const logout = async () => {
        await logoutUser()
        history.push('/')
        setUser(null)
        toast('you are logged out')
    }
    
    return (
        <button onClick={logout} className='logout-button'>
            Logout
        </button>
    )
}

export default Logout
