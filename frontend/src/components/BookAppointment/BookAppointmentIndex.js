import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookAppointmentIndex(){

    const [bookAppointments, setBookAppointments] = useState([])

    useEffect(() => {
        getAllBookappointments()
    },[])

    const getAllBookappointments = async () => {
        try{       
            
        const response = await axios.get('/bookappointment/index')

        console.log('Book appointments response', response.data[0].specialist.Name)
        setBookAppointments(response.data)
        
    }
        catch(error){
            console.log(error.message)
        }
    }

    const handleDelete = async (bookAppointmentId) => {
        console.log(bookAppointmentId)
        const response = await axios.post(`/bookAppointment/delete?id=${bookAppointmentId}`)
        getAllBookappointments()
    }

    const allBookAppointments = bookAppointments.map(bookAppointment => {
        return (
            <div key={bookAppointment._id}>

                <h3>{bookAppointment.specialist.Name}</h3>
                <h3>{bookAppointment.time}</h3>
                {/* <h3>{bookAppointment.date}</h3> */}

                <button onClick={() => {handleDelete(bookAppointment._id)}}>Delete</button>
            </div>
        )
    })

    return (
        <>

        {/* <Link to="/create-journal">Add a Journal</Link> &nbsp; */}
        {allBookAppointments}
        </>
    )

}