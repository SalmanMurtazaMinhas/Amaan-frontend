import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFaceFrownOpen} from '@fortawesome/free-solid-svg-icons'
import { faFaceSmileBeam} from '@fortawesome/free-solid-svg-icons'
import { faFaceMehBlank} from '@fortawesome/free-solid-svg-icons'

export default function MoodTracker() {

const [newMood, setNewMood] = useState({mood: null})

const handleMoodChange = (mood) => {
    console.log(mood)
    const currentNewMood = mood
    setNewMood(currentNewMood)
}
  return (
    <div className='mood-tracker'>
        <h1>How are you feeling today?</h1>
        <div className='mood-icons'>
        <FontAwesomeIcon className='mood-icon' icon={faFaceSmileBeam}  style={{color: "green"}} size='2xl' onClick={() => handleMoodChange('Happy')}/>
        <FontAwesomeIcon  className='mood-icon' icon={faFaceMehBlank}  style={{color: "yellow"}} size='2xl' />
        <FontAwesomeIcon  className='mood-icon' icon={faFaceFrownOpen}  style={{color: "red",}} size='2xl' />
        </div>

    </div>
  )
}


