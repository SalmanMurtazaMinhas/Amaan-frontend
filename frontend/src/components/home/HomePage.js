import React from 'react'
import homepageImg from '../../images/HomePage.png'
import MoodTrackImg from '../../images/Faces.png'
import JournalingImg from '../../images/ThoughtsWithDoctor.png'
import TherapySessionImg from '../../images/TherapySession.png'
import GroupSessionImg from '../../images/DarkLight.png'
import { Typography } from '@material-ui/core'

export default function HomePage() {

  return (
    <div>

        <div className="firstsection">
        
            <img className="homepage" id="homepageImg" src={homepageImg} alt='homepage' />
            <h1 className="homepageGreeting">
                Hello,  <br />
                Not feeling like yourself lately? You are not alone. <br /> We are here to help
            </h1>
            
        </div>

        <div className="app-mood">
            <div className="app-and-mood">
                <h4>Upcoming appointments</h4>
            </div>
            
            <div className="app-and-mood2">
                <h4>Today's mood</h4>
            </div>
        </div>

        <Typography variant='h3' className="sentence">Amaan is a mental health support app <br/>that offers services to aid you in <br/>your journey towards healing</Typography>

        <div className="ourServices">
            <div className='service'>
                <img className="images" src={MoodTrackImg} ></img>
                <div className="titleAndDescription">
                <h5>Mood Tracking</h5>
                <p>Tracking your mood can help identify triggers and track the effectivesness of intervention.</p>
                </div>
            </div>
            
            <div className='service'>
            <img className="images" src={JournalingImg} ></img>
            <div className="titleAndDescription">
                <h5>Journaling</h5>
                <p>Recording your thoughts and emotions in a journal helps you process emotions, reflect and set goals.</p>
            </div>
            </div>

            <div className='service'>
            <img className="images" src={TherapySessionImg} ></img>
            <div className="titleAndDescription">
                <h5>Counseling Sessions</h5>
                <p>Intervention helps you develop healthy coping mechanisms and manage a variety of mental health issues.</p>
            </div>
            </div>

            <div className='service'>
            <img className="images" src={GroupSessionImg} ></img>
            <div className="titleAndDescription">
            <h5>Support Groups</h5>
                <p>Group therapy can provide you with support and feedback from others who share similar experiences.</p>
            </div>
            </div>

        </div>
    </div>
  )
}
