import React from 'react'

const UserInfo = ({user}) => {
    console.log(user)
    return (
        <div className='user-info'>
            <img src={user.avatar} style={{width: '100%'}}/>
            <div><p>Username: </p><p>{user.username}</p></div>
            <div><p>Email: </p><p>{user.email}</p></div>
            <div><p>Member since: </p><p>{user?.createdAt.substring(0,10)}</p></div>
        </div>
    )
}

export default UserInfo
