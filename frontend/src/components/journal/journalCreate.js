import React, {useState} from 'react'
import {Container, Form, Button} from "react-bootstrap"
import axios from 'axios'
import {DraftRichText} from '../UniversalComponents';
import {EditorState, convertToRaw} from 'draft-js'

export default function JournalCreate() {

    const [newJournal, setNewJournal] = useState({title: null, body: EditorState.createEmpty()})
    const [userMessage, setUserMessage] = useState('')

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
        }
        else setNewJournal('Something Went Wrong')
    }

  return (
    <div>
        <h1>Journal</h1>
        <Container>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" onChange={handleChange} ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Journal</Form.Label>
                {/* <Form.Control name="body" onChange={handleChange} ></Form.Control> */}
            </Form.Group>
            <DraftRichText onChangeCallBack={handleValueChange}  />


            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" type='date' onChange={handleChange} ></Form.Control>
            </Form.Group>

            <Button  variant='primary' onClick={handleSubmit}>Save</Button>
        </Container>
    </div>
  )
}
