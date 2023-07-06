import React, { useEffect, useState } from "react";
import axios from 'axios'
import CounselingImg from '../../images/Counseling.png'

export default function BookAppointmentCreate(){
  useEffect(() => {
    getSpecialists()
  },[])

  const [newAppointment, setNewAppointment] = useState({})
  const [userMessage, setUserMessage] = useState('')
  const [specialists, setSpecialists] = useState([])

  const handleChange = (event) => {
      const attribute = event.target.name
      const value = event.target.value
      console.log(attribute, value)

      const currentnewAppointment = {... newAppointment}
      currentnewAppointment[attribute] = value
      setNewAppointment(currentnewAppointment)
      console.log(newAppointment)
  }

  const handleSubmit = async (event) => {
      event.preventDefault()
      console.log('okayy')
      const response = await axios.post('BookAppointment/add', newAppointment)
      console.log(response)

      if (response.status === 201){
          setUserMessage('Your Appointment has been Booked')
      } else {
          setUserMessage('Something Went Wrong')
      }

  }

  const getSpecialists = async (e) => {
    const specialists = await axios.get('specialist/index')
    console.log(specialists.data)
    
    setSpecialists(specialists.data)
    
    return specialists
  }

  const allSpecialists = specialists.map(function(specialist, index){
    return <option key={index} value={specialist._id}>{specialist.Name}</option>
  })

  return (
    
    <div>
      <h2 className="BookAppTitle">Book an Appointment with a Mental Health Specialist</h2>
      <div className="bookApp">
      <div>
      <img className="counselingImg "src={CounselingImg}/>
      </div>
      
      <div>
      <form className="bookAppForm">
      <div className="formInfo">
        <h4>Pick a specialist</h4>
      <select
        className="input"
        type="text"
        placeholder="Find a specialist"
        onChange={handleChange}
        name="specialist"
      >
        {allSpecialists}
      
      </select>
      </div>
      <div className="formInfo">
        <h4>Time</h4>
      <input
        className="input"
        type="time"
        placeholder="Time"
        onChange={handleChange}
        name="time"
      />
      </div>
      <div className="formInfo">
        <h4>Date</h4>
      <input
        className="input"
        type="date"
        placeholder="Date"
        onChange={handleChange}
        name="date"
      />
      </div>

      <button 
      className="formButton"
      type="submit" 
      onClick={handleSubmit}>
        Book Appointment
      </button>
    </form>
    <p>{userMessage}</p>
      </div>
      </div>
    </div>
  );
};

