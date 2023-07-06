import React, {useState} from 'react'
import {Container, Form } from "react-bootstrap"
import axios from 'axios'
import {DraftRichText} from '../UniversalComponents';
import {EditorState, convertToRaw} from 'draft-js'
import JournalCreateImage from '../../images/NightSky.png'
import { Button, withStyles } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';

const JournalButton = withStyles({
    root: {
        background: '#BEAEE2',
        color: '#FFFFFF',
        marginTop: '10px',
        marginLeft: '40px',
        width: '150px',
      '&:hover' : {
        background: '#CDF0EA',
        color: '#000'
      }
    }
})(Button);

export default function JournalCreate() {

    const [newJournal, setNewJournal] = useState({title: null, body: EditorState.createEmpty()})
    const [userMessage, setUserMessage] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const attribute = e.target.name
        const value = e.target.value
        console.log(attribute, value)

        const currentNewJournal = {...newJournal}
        currentNewJournal[attribute]= value
        setNewJournal(currentNewJournal)
        console.log(newJournal)
    }

    const handleValueChange = (value) => {

        if(value){
         const valueRaW = JSON.stringify(convertToRaw(value.getCurrentContent()));
         console.log('valueRaW:', valueRaW);

            const currentNewJournal = {...newJournal, body: valueRaW};
        setNewJournal(currentNewJournal);
        console.log('I am currentNewJournal:', currentNewJournal);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await axios.post('journal/add', newJournal , 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        )
        console.log(response)

        if (response.status === 201){
            setUserMessage('Your Journal Has Been Added')
            navigate('/journal')
        }
        else setNewJournal('Something Went Wrong')
    }

  return (
    <div>
        
        <h2 className="journalTitle">What's on your mind? Let it out.</h2>
        <div class="createJournal">
        <Container>
            <Form.Group>
                <Form.Label className="journalLabel">Title</Form.Label>
                <Form.Control name="title" onChange={handleChange} className="journalInput"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label className="journalLabel">Date</Form.Label>
                <Form.Control name="date" type='date' onChange={handleChange} className="journalInput"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label className="journalLabel">Journal</Form.Label>
                {/* <Form.Control name="body" onChange={handleChange} ></Form.Control> */}
            </Form.Group>
            <DraftRichText onChangeCallBack={handleValueChange}  />


            {/* <Form.Group>
                <Form.Label className="journalLabel">Date</Form.Label>
                <Form.Control name="date" type='date' onChange={handleChange} className="journalInput"></Form.Control>
            </Form.Group> */}

            <JournalButton  variant='primary' onClick={handleSubmit}>Save</JournalButton>
        </Container>
        <img className="createJournalImg" src={JournalCreateImage} alt=""/>
        </div>
        
    </div>
  )
}
