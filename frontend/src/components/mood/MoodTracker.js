import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { faFaceMehBlank } from "@fortawesome/free-solid-svg-icons";
import '../mood/mood.css'



import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';

export default function MoodTracker() {


  const [mood, setMood] = useState({ mood: null });

  const handleMoodChange = (mood) => {
    const currentmood = mood;
    console.log(mood)
    setMood(currentmood);
    
  };

  const handleSaveMood = async (e) => {
    await axios
      .post("/mood/add", { mood })
      .then((res) => {
        console.log(`Mood has been saved as ${mood}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
    <div className="mood-tracker">
      <h1>How are you feeling today?</h1>

      <div className="mood-icons">
        <button 
        className="mood"
         onClick={() => handleMoodChange("Happy")}>
        <FontAwesomeIcon
          className="mood-icon"
          icon={faFaceSmileBeam}
          style={{ color: "green" }}
          size="2xl"
         
        />
        </button>
        <button
        className="mood"

         onClick={() => handleMoodChange("Meh")}>
        <FontAwesomeIcon
          className="mood-icon"
          icon={faFaceMehBlank}
          style={{ color: "yellow" }}
          size="2xl"
        />
        </button>
        <button
        className="mood"
         onClick={() => handleMoodChange("Sad")}>
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

      <DateCalendar />
    </div>
    </LocalizationProvider>
  );
}
