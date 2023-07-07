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

const faCheckPascalCased = faCheck;
library.add(faCheckPascalCased);

export default function MoodTracker(props) {
  console.log(props)
  const [mood, setMood] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [moods, setMoods] = useState([]);
  const [userId, setUserId] = useState(props.userid);

  const [lastMood, setLastMood] = useState('')

  const getDate = new Date();
  const currentYear = getDate.getFullYear();
  const currentMonth = getDate.getMonth();
  const currentDay = getDate.getDay();
  const [currentDate, setCurrentDate] = useState(
    `${currentDay}-${currentMonth}-${currentYear}`
  );
  const [todayMood, setTodayMood] = useState({});

  console.log("Today's date is " + currentDate);

  useEffect(() => {
    getAllMoods();


  }, []);

  useEffect(() => {
    getLastMood()
  })

  const getAllMoods = async () => {
    const response = await axios.get("mood/index", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    // console.log(response)
    setMoods(response.data);

  };

  const getLastMood = () => {
    console.log(moods)
    let lastMood = moods.splice( -1, 1)
    console.log(lastMood)

  }

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
  };

  const handleSaveMood = async (e) => {
    console.log(mood);
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
      console.log(response);

      setTodayMood(
        response.data.mood === "face-smile-beam"
          ? faFaceSmileBeam
          : response.data.mood === "face-meh-blank"
          ? faFaceMehBlank
          : response.data.mood === "face-frown-open"
          ? faFaceFrownOpen
          : null
      );
      
      console.log(todayMood)

      if (response.status === 201) {
        setUserMessage("Your Mood Has Been Added");
      } else setUserMessage("Something Went Wrong");
    } catch (error) {
      console.log(error.message);
    }
  };

  const allMoods = moods.map((mood) => {
    if (mood.user === userId) {
      if (mood.date === currentDate) {
        return (
          <div>
            <FontAwesomeIcon
              className="mood-icon"
              icon={
                mood.mood === "face-smile-beam"
                  ? faFaceSmileBeam
                  : mood.mood === "face-meh-blank"
                  ? faFaceMehBlank
                  : mood.mood === "face-frown-open"
                  ? faFaceFrownOpen
                  : null
              }
              style={
                mood.mood === "face-smile-beam"
                  ? { color: "green" }
                  : mood.mood === "face-meh-blank"
                  ? { color: "yellow" }
                  : mood.mood === "face-frown-open"
                  ? { color: "red" }
                  : null
              }
              size="2xl"
            />
          </div>
        );
      }
    }
  });


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <div className="mood-tracker">

        {moment().format("dddd, MMMM Do YYYY")}

        <div className="mood-icons">
          <button
            className="mood"
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
            className="mood"
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
            className="mood"
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

        <Button variant="primary" onClick={handleSaveMood}>
          Save
        </Button>
        <FontAwesomeIcon
          className="mood-icon"
          icon={lastMood}
          style={lastMood.mood === 'face-smile-beam' ? { color: "green" } : lastMood.mood === 'face-meh-blank' ? { color: "yellow" } : lastMood.mood === 'face-frown-open' ? { color: "red" } : null}
          size="2xl"
        />

        {/* <DateCalendar /> */}
      </div>
    </LocalizationProvider>
  );
}
