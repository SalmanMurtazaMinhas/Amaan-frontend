import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import moment from "moment";
import "../mood/mood.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { faFaceMehBlank } from "@fortawesome/free-solid-svg-icons";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en";
import $ from "jquery";


export default function MoodTracker(props) {
  const [userMessage, setUserMessage] = useState("");

  const [mood, setMood] = useState('');
  const [moods, setMoods] = useState(props.moods);
  const [userId, setUserId] = useState(props.userid);

  const [selectedMood, setSelectedMood] = useState(null);

  const [lastMood, setLastMood] = useState(props.lastMood)
  const getDate = new Date();
  const currentYear = getDate.getFullYear();
  const currentMonth = getDate.getMonth();
  const currentDay = getDate.getDay();
  const [currentDate, setCurrentDate] = useState(
    `${currentDay}-${currentMonth}-${currentYear}`
  );
  const [todayMood, setTodayMood] = useState({});


  // console.log("Today's date is " + currentDate);

  useEffect(() => {

  }, []);

  useEffect(() => {
    // getLastMood();
    // setMoods(props.moods)
    setLastMood(props.lastMood)


  })

  // const getAllMoods = async () => {
  //   const response = await axios.get("mood/index", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });
  //   // console.log(response)
  //   setMoods(response.data);

  // };

  // console.log(moods)

  // Function to get last mood in database
  // const getLastMood = async () => {
  
  //   let last = moods.length - 1
  //   console.log(last)
  //   setLastMood(moods[last])
  
  //   console.log(lastMood.mood)
  // }

  // Function that takes the mood of today
  // const currentMoodSetter = () => {
  //   console.log("running currentmoodsetter");

  //   moods.map((mood) => {
  //     if (mood.user === userId) {
  //       console.log('found moods for user')
  //       if (mood.date === currentDate) {
  //         console.log('todays mood found')
  //         setTodayMood(
  //           mood?.mood === "face-smile-beam"
  //             ? faFaceSmileBeam
  //             : mood?.mood === "face-meh-blank"
  //             ? faFaceMehBlank
  //             : mood?.mood === "face-frown-open"
  //             ? faFaceFrownOpen
  //             : null
  //         );
  //       }
  //     }
  //   });

  //   console.log(todayMood);
  // };



  const handleMoodChange = (mood) => {
    const currentMood = mood;
    // console.log(currentMood)
    setMood(currentMood);
    setSelectedMood(mood);

    // Disable the other buttons.
    $(".mood-button").prop("disabled", true);
    $(`#${mood}`).prop("disabled", false);
  };

  const handleSaveMood = async (e) => {
    // console.log(mood);
    try {
      e.preventDefault();

      const year = getDate.getFullYear();
      const month = getDate.getMonth();
      const day = getDate.getDay();

      const date = `${day}-${month}-${year}`;
      console.log("Mood was saved on " + date);
      const response = await axios.post(
        "mood/add",
        { mood, date },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setSelectedMood(null);
      $(".mood-button").prop("disabled", true);
      $(".mood-button").hide();
      $(".save-button").hide();
  
      // console.log(response);

      // setTodayMood(
      //   response.data.mood === "face-smile-beam"
      //     ? faFaceSmileBeam
      //     : response.data.mood === "face-meh-blank"
      //     ? faFaceMehBlank
      //     : response.data.mood === "face-frown-open"
      //     ? faFaceFrownOpen
      //     : null
      // );
      
      // console.log(todayMood)

      if (response.status === 201) {
        setUserMessage("Your Mood Has Been Added");
      } else setUserMessage("Something Went Wrong");
    } catch (error) {
      console.log(error.message);
    }
  };

  // const allMoods = moods.map((mood) => {
  //   if (mood.user === userId) {
  //     if (mood.date === currentDate) {
  //       return (
  //         <div>
  //           <FontAwesomeIcon
  //             className="mood-icon"
  //             icon={
  //               mood.mood === "face-smile-beam"
  //                 ? faFaceSmileBeam
  //                 : mood.mood === "face-meh-blank"
  //                 ? faFaceMehBlank
  //                 : mood.mood === "face-frown-open"
  //                 ? faFaceFrownOpen
  //                 : null
  //             }
  //             style={
  //               mood.mood === "face-smile-beam"
  //                 ? { color: "green" }
  //                 : mood.mood === "face-meh-blank"
  //                 ? { color: "yellow" }
  //                 : mood.mood === "face-frown-open"
  //                 ? { color: "red" }
  //                 : null
  //             }
  //             size="2xl"
  //           />
  //         </div>
  //       );
  //     }
  //   }
  // });


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <div className="mood-tracker">

        {moment().format("dddd, MMMM Do YYYY")}

        <div className="mood-icons">
          <button
            id="happy-button"
            className="mood-button"
            onClick={() => handleMoodChange("face-smile-beam")}
          >
            <FontAwesomeIcon
              className="mood-icon"
              icon={faFaceSmileBeam}
              style={{ color: "green" }}
              size="2xl"
            />
          </button>
          <button
            id="meh-button"
            className="mood-button"
            onClick={() => handleMoodChange("face-meh-blank")}
          >
            <FontAwesomeIcon
              className="mood-icon"
              icon={faFaceMehBlank}
              style={{ color: "yellow" }}
              size="2xl"
            />
          </button>
          <button
            id="sad-button"
            className="mood-button"
            onClick={() => handleMoodChange("face-frown-open")}
          >
            <FontAwesomeIcon
              className="mood-icon"
              icon={faFaceFrownOpen}
              style={{ color: "red" }}
              size="2xl"
            />
          </button>
        </div>

        <Button variant="primary" onClick={handleSaveMood} className="save-button" >
          Save
        </Button>
{lastMood.mood? 
        <FontAwesomeIcon
          className="mood-icon"
          icon={lastMood.mood === 'face-smile-beam' ? faFaceSmileBeam : lastMood.mood === 'face-meh-blank' ? faFaceMehBlank : lastMood.mood === 'face-frown-open' ? faFaceFrownOpen : null}
          style={lastMood.mood === 'face-smile-beam' ? { color: "green" } : lastMood.mood === 'face-meh-blank' ? { color: "yellow" } : lastMood.mood === 'face-frown-open' ? { color: "red" } : null}
          size="2xl"
        />
: <></>}
        {/* <DateCalendar /> */}
      </div>
    </LocalizationProvider>
  );
}
