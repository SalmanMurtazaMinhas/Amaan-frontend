import React from 'react'
import homepageImg from '../../images/homepage.png'
import { Typography } from '@material-ui/core'

export default function HomePage() {

    // const homepageImg = './images/DrawKit Vector Illustration Mental Health & Psychology (6).png'
  return (
    <div>
        <Typography 
            variant='h4'
            >
                {/* hiiii, {user.firstName} hi */}
            </Typography>
            <>
            
            <img className="homepage" id="homepageImg" src={homepageImg} alt='homepage' />
            </>
    </div>
  )
}
