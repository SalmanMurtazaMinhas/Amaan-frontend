import React, { useState } from "react";
import axios from 'axios'

export default function SpecialistCreate(){

  const [newSpecialist, setNewSpecialist] = useState({})
  const [userMessage, setUserMessage] = useState('')

  const handleChange = (event) => {
      const attribute = event.target.name
      const value = event.target.value
      console.log(attribute, value)

      const currentnewSpecialist = {... newSpecialist}
      currentnewSpecialist[attribute] = value
      setNewSpecialist(currentnewSpecialist)
      console.log(newSpecialist)
  }

  const handleSubmit = async (event) => {
      event.preventDefault()
      console.log('okayy')
      const response = await axios.post('Specialist/add', newSpecialist)
      console.log(response)

      if (response.status === 201){
          setUserMessage('Specialist has been Saved')
      } else {
          setUserMessage('Something Went Wrong')
      }

  }

  return (
    <div>
    <form>
      <div>
        <h3>Name</h3>
      <input
        type="text"
        placeholder="Name"
        onChange={handleChange}
        name="Name"
      />
      </div>
      <div>
        <h3>Role</h3>
      <input
        type="text"
        placeholder="Role"
        onChange={handleChange}
        name="Role"
      />
      </div>
      <div>
        <h3>Years of Experience</h3>
      <input
        type="Number"
        placeholder="YearsofExperience"
        onChange={handleChange}
        name="YearsofExperience"
      />
      </div>

      <button type="submit" onClick={handleSubmit}>Create Specialist</button>
    </form>
    <p>{userMessage}</p>
    </div>
  );
};