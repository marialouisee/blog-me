import React, {useContext, useEffect, useState } from 'react'
import { UserContext } from "../context/UserProvider";
import banana from '../images/pexels-banana.png'
import bananaDive from '../images/pexels-banana-dive.png'

const Home = () => {
  const { user } = useContext(UserContext);
  const [ backgroundImage, setBackgroundImage ] = useState(banana);

  useEffect(() => {
    if (user) {
      setBackgroundImage(bananaDive);
    } else {
      setBackgroundImage(banana);
    }
  })

  return (
    <div className='home-bg' style={ {backgroundImage : `url(${backgroundImage})`} }>
   
      <h6>Blog-Me-If-You-Can</h6>
    </div>
  )
}

export default Home
