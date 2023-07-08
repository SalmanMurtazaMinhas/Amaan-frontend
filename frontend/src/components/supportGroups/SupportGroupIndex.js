import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, CardContent, Button, Typography, withStyles, makeStyles} from '@material-ui/core';

export default function SupportGroupIndex() {

    const [supportGroups, setSupportGroups] = useState([])

    useEffect(() => {
        getAllSessions()
    },[])

    const getAllSessions = async () => {
        try {
            const response = await axios.get('supportgroup/index')
            console.log('Hello', response) 
            setSupportGroups(response.data)
        } catch (error){
            console.log(error.message)
        }
    }

    const allSupportGroups = supportGroups.map(supportGroup => {
        return (
            <div key={supportGroup._id}>
                <Card>
                    <CardContent>
                        <div>
                            <Typography>{supportGroup.title}</Typography>
                            <Typography>{supportGroup.specialist}</Typography>
                            <Typography>{supportGroup.description}</Typography>
                        </div>
                        <div>
                            <Typography>{supportGroup.date}</Typography>
                            <Typography>{supportGroup.time}</Typography>
                            <Typography>{supportGroup.noOfSeats}</Typography>
                            <Typography>{supportGroup.location}</Typography>
                            <Typography>{supportGroup.cost}</Typography>
                        </div>
                        <Button>Book</Button>
                    </CardContent>
                </Card>
            </div>
        )
    })

    return (
        <>
        {allSupportGroups}
        </>
    )
    
}



