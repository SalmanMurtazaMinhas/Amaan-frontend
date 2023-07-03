import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'

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
                <Link to="/create-journal">Add a Journal</Link> &nbsp;
                <div style={{  backgroundColor: 'pink' }}>
                    <Editor
                    readOnly={true}
                    editorState={journal.data.editorBody}
                    />
                </div>
                    
            </>
        )
    }

}

