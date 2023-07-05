import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { faFaceMehBlank } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import '../mood/mood.css'



import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';

export default function MoodTracker(props) {

  
  const [mood, setMood] = useState({ mood: null });
  const [userMessage, setUserMessage] = useState('')

  const [moods, setMoods] = useState([])
    const [userId, setUserId] = useState(props.userid)
    console.log(userId)
    console.log(props.userid)




    useEffect(() => {
      getAllMoods()

  },[])

  const getAllMoods = async () => {
    const response = await axios.get('mood/index',
    {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    )
    console.log(response)
    setMoods(response.data)

}
  const handleMoodChange = (mood) => {
    const currentmood = mood;
    console.log(mood)
    setMood(currentmood);
    
  };



  const handleSaveMood = async (e) => {
    try 
{    e.preventDefault()
    mood.date = new Date()
    
            const response = await axios.post('mood/add', mood , 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        )
    console.log(response)

    if (response.status === 201){
      setUserMessage('Your Mood Has Been Added')
  }
  else setUserMessage('Something Went Wrong')}
  
  catch(error){
    console.log(error.message)
  }

     
  };

  const allMoods = moods.map ( mood => {

        if(mood.user === userId){
return (
  <div>
    {mood.user}
    <h3>{mood.iconName}</h3>
  </div>
)

        }
      
      })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
    <div className="mood-tracker">
      <h1>How are you feeling today?</h1>

{moment().format("dddd, MMMM Do YYYY")}


      <div className="mood-icons">
        <button 
        className="mood"
         onClick={() => handleMoodChange(faFaceSmileBeam)}>
        <FontAwesomeIcon
          className="mood-icon"
          icon={faFaceSmileBeam}
          style={{ color: "green" }}
          size="2xl"
         
        />
        </button>
        <button
        className="mood"

         onClick={() => handleMoodChange(faFaceMehBlank)}>
        <FontAwesomeIcon
          className="mood-icon"
          icon={faFaceMehBlank}
          style={{ color: "yellow" }}
          size="2xl"
        />
        </button>
        <button
        className="mood"
         onClick={() => handleMoodChange(faFaceFrownOpen)}>
        <FontAwesomeIcon
          className="mood-icon"
          icon={faFaceFrownOpen}
          style={{ color: "red" }}
          size="2xl"
        />
        </button>
      </div>

      <Button variant="primary" onClick={handleSaveMood}>
        Save
      </Button>

{allMoods}
      {/* <DateCalendar /> */}
    </div>
    </LocalizationProvider>
  );
}
