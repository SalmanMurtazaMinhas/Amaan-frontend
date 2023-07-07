import React from 'react'
import homepageImg from '../../images/HomePage.png'
import MoodTrackImg from '../../images/Faces.png'
import JournalingImg from '../../images/ThoughtsWithDoctor.png'
import TherapySessionImg from '../../images/TherapySession.png'
import GroupSessionImg from '../../images/DarkLight.png'
import { Typography } from '@material-ui/core'
import { Button, withStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MoodTracker from '../mood/MoodTracker'

import { useNavigate, Link } from 'react-router-dom';

const StyledButtons = withStyles({
    root: {
      background: '#BEAEE2',
      color: '#FFFFFF',
      width: '300px',
      fontSize: 15,
      marginTop: 5,
      '&:hover' : {
        background: '#CDF0EA',
        color: '#000'
      }
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

export default function HomePage(props) {
  // console.log(props)





const userid = props.userid
// console.log(userid)
const todayMood = props.todayMood


  const navigate = useNavigate()

   const navigateJournal = () => {
        navigate('/journal')
    }

    const navigateJHome = () => {
      navigate('/')
  }

    const navigateBookAppointment = () => {
      navigate('/bookappointment')
  }
  const navigateMoodTracker = () => {
    navigate('/mood')
}

  return (
    <div>

        <div className="firstsection">
        
            <img className="homepage" id="homepageImg" src={homepageImg} alt='homepage' />
            <h1 className="homepageGreeting">
                Hello,  <br />
                Not feeling like yourself lately? You are not alone. <br /> We are here to help
                <StyledButtons onClick={navigateBookAppointment}>BOOK COUNSELING SESSION</StyledButtons>
            </h1>

        </div>

        {props.isAuth? (
          <div className="app-mood">
            <div className="app-and-mood">
                <h4>Upcoming appointments</h4>
            </div>
            
            <div className="app-and-mood2">
                <h4>How are you feeling today?</h4>

                <MoodTracker userid={userid} todayMood={todayMood} />
            </div>
        </div>
        ):(<></>)}
        

        <Typography variant='h3' className="sentence">Amaan is a mental health support app <br/>that offers services to aid you in <br/>your journey towards healing</Typography>

        <div className="ourServices">
            <div className='service'>
                <img className="images" src={MoodTrackImg} ></img>
                <div className="titleAndDescription">
                <h5>Mood Tracking</h5>
                <p>Tracking your mood can help identify triggers and track the effectivesness of intervention.</p>
                </div>

                <StyledButtons onClick={navigateMoodTracker}>Track my mood</StyledButtons>

                </div>
            
            <div className='service'>
            <img className="images" src={JournalingImg} ></img>
            <div className="titleAndDescription">
                <h5>Journaling</h5>
                <p>Recording your thoughts and emotions in a journal helps you process emotions, reflect and set goals.</p>
            </div>
            <StyledButtons onClick={navigateJournal} >Journal</StyledButtons>
            </div>

            <div className='service'>
            <img className="images" src={TherapySessionImg} ></img>
            <div className="titleAndDescription">
                <h5>Counseling Sessions</h5>
                <p>Intervention helps you develop healthy coping mechanisms and manage a variety of mental health issues.</p>
            </div>
            <StyledButtons onClick={navigateBookAppointment}>Book counseling session</StyledButtons>
            </div>

            <div className='service'>
            <img className="images" src={GroupSessionImg} ></img>
            <div className="titleAndDescription">
            <h5>Support Groups</h5>
                <p>Group therapy can provide you with support and feedback from others who share similar experiences.</p>
            </div>
            <StyledButtons>Book support group</StyledButtons>
            </div>

        </div>
    </div>
  )
}
