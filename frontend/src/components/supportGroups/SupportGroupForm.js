import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, TextField, Button, Typography, withStyles, makeStyles} from '@material-ui/core';
import GroupHugImg from '../../images/GroupHug.png'
import { useNavigate } from 'react-router-dom'

const supportGroupCustomStyles = makeStyles({
    containerdiv: {
        display: 'flex',
    }, 
    header: {
        color: '#a088d5',
        textAlign: 'center',
    },
    maincard: {
        width: '600px',
    }, 
    textField: {
        marginTop: 5,
        marginBottom: 5,
    },
    button: {
        background: '#BEAEE2',
        color: '#FFFFFF',
        width: '100%',
        fontSize: 15,
        marginTop: 5,
        '&:hover' : {
          background: '#CDF0EA',
          color: '#000'
      }
    }
})

export default function SupportGroupForm() {

    const classes = supportGroupCustomStyles()
    const [newGroup, setNewGroup] = useState({});
    const navigate = useNavigate()
    

    const changeHandler = (event) => {
        
        const attribute = event.target.name
        const value = event.target.value 
        console.log(attribute, value)

        const upcomingGroup = {...newGroup}
        upcomingGroup[attribute] = value
        setNewGroup(upcomingGroup)
        console.log(newGroup)

    };

    const saveHandler = async (event) => {
        event.preventDefault()
        console.log('Hey you clicked the save button for group therapy');
        const response = await axios.post('supportgroup/add', newGroup)
        console.log(response)
        navigate('/supportgroup/index')

        if (response.status === 201) {
            console.log('A new group therpy session has been created!')
        } else {
            console.log('Something went wrong while creating a new group therapy session!!!')
        }
    }

  return (
    <div>
        <div className={classes.containerdiv}>
        <img className="group-hug" src={GroupHugImg} alt="Connect with other people and support one another"></img>
            <Card className={classes.maincard}>
                <CardContent className={classes.cardContent}>
                
                    
                    <form>
                    <Typography className={classes.header} variant='h4'>Host a Support Group</Typography>
                        
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Title'
                            name='title'
                            required
                            fullWidth
                            >
                            </TextField>
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Lead By'
                            name='specialist'
                            required
                            fullWidth
                            >
                            </TextField>
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Description'
                            name='description'
                            required
                            fullWidth
                            >
                            </TextField>
                        
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Date'
                            name='date'
                            type='date'
                            required
                            fullWidth
                            >
                            </TextField>
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Time'
                            type='time'
                            name='time'
                            required
                            fullWidth
                            >
                            </TextField>
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Number of Seats'
                            type="number"
                            name='noOfSeats'
                            required
                            fullWidth
                            >
                            </TextField>
                        
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Duration'
                            name='duration'
                            required
                            fullWidth
                            >
                            </TextField>
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Location'
                            name='location'
                            required
                            fullWidth
                            >
                            </TextField>
                            <TextField
                            className={classes.textField}
                            onChange={changeHandler}
                            label='Cost'
                            name='cost'
                            required
                            fullWidth
                            >
                            </TextField>
                        
                        
                    </form>
                    <Button className={classes.button} onClick={saveHandler}>Save</Button>
                </CardContent>
            </Card>

        </div>
    </div>
  )
}
