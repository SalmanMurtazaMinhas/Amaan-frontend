import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import JournalDetailImage from '../../images/SheepSleep.png'
import { Button, withStyles } from '@material-ui/core'

const IndexButton = withStyles({
    root: {
        background: '#BEAEE2',
        color: '#FFFFFF',
        marginTop: '10px',
        marginLeft: '40px',
        width: '300px',
      '&:hover' : {
        background: '#CDF0EA',
        color: '#000'
      }
    }
})(Button);

export default function JournalDetail(){

    const {journalId} = useParams()

    const [journal, setJournal] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getJournalDetail()
    },[])

    const getJournalDetail = async () => {
        const response = await axios.get(`/journal/detail?id=${journalId}`)

        const editorBody =  convertFromRaw(JSON.parse(response.data.body));
        const editorState = EditorState.createWithContent(editorBody);

        journal.data = response.data
        journal.data.editorBody = editorState

        setJournal({...journal})
        setLoading(false)
    }

    const handleDelete = async (journalId) => {
        console.log(journalId)
        const response = await axios.post(`journal/delete?id=${journalId}`)
        getJournalDetail()
    }

    if (!loading) {
        return (
            <>
                {/* <img className="journalDetailImage" src={JournalDetailImage} alt=""/> */}
                <IndexButton><Link to="/create-journal" className="addJournalButton">Add a Journal</Link></IndexButton> &nbsp;
                
                <div style={{  backgroundColor: '#F7DBF0', margin: '20px', padding: '30px', width: '700px' }}>
                    <Editor
                    readOnly={true}
                    editorState={journal.data.editorBody}
                    />
                </div>
                    
            </>
        )
    }

}

