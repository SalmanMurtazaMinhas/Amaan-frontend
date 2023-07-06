import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SpecialistIndex(){

    const [specialists, setSpecialists] = useState([])

    useEffect(() => {
        getAllSpecialists()
    },[])

    const getAllSpecialists = async () => {
        try{       
            
        const response = await axios.get('/specialist/index')

        console.log('Specialists response', response)
        setSpecialists(response.data)
    }
        catch(error){
            console.log(error.message)
        }
    }

    const handleDelete = async (specialistId) => {
        console.log(specialistId)
        const response = await axios.post(`/specialist/delete?id=${specialistId}`)
        getAllSpecialists()
    }

    const allSpecialists = specialists.map(specialist => {
        return (
            <div key={specialist._id}>

                <h3>{specialist.Name}</h3>
                <h3>{specialist.Role}</h3>
                <h3>{specialist.YearsofExperience}</h3>

                <button onClick={() => {handleDelete(specialist._id)}}>Delete</button>
            </div>
        )
    })

    return (
        <>
        {allSpecialists}
        </>
    )

}