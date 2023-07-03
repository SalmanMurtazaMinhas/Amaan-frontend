import React, { useState } from "react";
import axios from 'axios'

export default function BookAppointmentCreate(){

  const [newAppointment, setNewAppointment] = useState({})
  const [userMessage, setUserMessage] = useState('')

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

  return (
    <div>
    <form>
      <input
        type="text"
        placeholder="Specialest"
        onChange={handleChange}
        name="specialist"
      />
      <input
        type="time"
        placeholder="Time"
        onChange={handleChange}
        name="time"
      />
      <input
        type="date"
        placeholder="Date"
        onChange={handleChange}
        name="date"
      />

      <button type="submit" onClick={handleSubmit}>Book Appointment</button>
    </form>
    <p>{userMessage}</p>
    </div>
  );
};

