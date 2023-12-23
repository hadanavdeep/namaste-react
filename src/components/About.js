import React from 'react'
import User from './User'
import UserClass from './UserClass'

const About = () => {
  return (
    <div>
        <h1>About</h1>
        <User name={"Navdeep Hada(from function)"}/>
        <UserClass name={"Navdeep Hada(from class)"} location={"Bangalore class"} />
    </div>
    
  )
}

export default About