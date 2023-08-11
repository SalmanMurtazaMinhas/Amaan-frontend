import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, CardContent, Button, Typography, withStyles, makeStyles} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import CalenderIcon from '../../images/calendar.png'
import ClockIcon from '../../images/clock.png'
import PeopleIcon from '../../images/people.png'
import LocationIcon from '../../images/placeholder.png'
import CostIcon from '../../images/money.png'

const SGIndexCustom = makeStyles({
    header: {
        textAlign: 'center',
        margin: '30px',
        color: '#a088d5'
    },
    maindiv: {
        display: 'flex',
        justifyContent: 'center'
    },
    SGICard: {
        width: '900px',
        backgroundColor: '',
        marginBottom: 20,
    },
    SGIdiv2: {
        display: 'flex',
        color: '#'
    },
    title: {
        color: '#a088d5',
        
    },
    SGIButton: {
        background: '#BEAEE2',
        color: '#fff',
        width: 150,
        marginTop: 5,
        '&:hover' : {
            background: '#CDF0EA',
            color: '#000'
        }
    },
    details: {
        paddingRight: 40,
    },
    icons: {
        width: 25,
    }
})

export default function SupportGroupIndex() {

    const classes = SGIndexCustom()
    const [supportGroups, setSupportGroups] = useState([])
    const [userMessage, setUserMessage] = useState('')
    const [noOfSeats, setNoOfSeats] = useState()


    useEffect(() => {
        getAllSessions()
        getNoOfSeats()
    },[])

    const getAllSessions = async () => {
        try {
            const response = await axios.get('/supportgroup/index')
            console.log(response) 
            setSupportGroups(response.data)
        } catch (error){
            console.log(error.message)
        }
    }

    const getNoOfSeats = async () => {
        const response = await axios.get('/supportgroup/index')
        console.log(response)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('You just clicked me!')
        // setUserMessage('Your spot is reserved. We look forward to seeing you!')
    }

    const allSupportGroups = supportGroups.map(supportGroup => {

        const date = new Date(supportGroup.date)
        const readableDate = date.toLocaleDateString();
        return (
            <div key={supportGroup._id} className={classes.maindiv}>
                <Card className={classes.SGICard}>
                    <CardContent>
                        <div className={classes.SGIdiv1}>
                            <Typography variant='h5' className={classes.title}>{supportGroup.title}</Typography>
                            <Typography>Specialist: {supportGroup.specialist}</Typography>
                            <Typography>"{supportGroup.description}"</Typography>
                        </div>
                        <div className={classes.SGIdiv2}>
                         
                            <Typography className={classes.details}><img className={classes.icons} src={CalenderIcon}></img> {readableDate}</Typography> 
                            <Typography className={classes.details}><img className={classes.icons} src={ClockIcon}></img> {supportGroup.time}</Typography> 
                            <Typography className={classes.details}><img className={classes.icons} src={PeopleIcon}></img> {supportGroup.noOfSeats}</Typography> 
                            <Typography className={classes.details}><img className={classes.icons} src={LocationIcon}></img> {supportGroup.location}</Typography>
                            <Typography className={classes.details}><img className={classes.icons} src={CostIcon}></img> {supportGroup.cost}</Typography>
                        </div>
                        <Button className={classes.SGIButton} onClick={handleSubmit}>Book</Button>
                        <Typography>{userMessage}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    })

    return (
        <div className="SGIparentdiv">
        <h1 className={classes.header}>Find a Support Group</h1>
        {allSupportGroups}
        </div>
    )
    
}