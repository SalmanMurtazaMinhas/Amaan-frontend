
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


export default function JournalIndex(props){

    const [journals, setJournals] = useState([])
    const [userId, setUserId] = useState(props.userid)
    console.log(props)

    useEffect(() => {
        getAllJournals()
    },[])

    const getAllJournals = async () => {
        const response = await axios.get('journal/index',
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        )
        console.log(response)
        const formattedData = convertToJsonToEditor(response.data);
        console.log('formattedData:',formattedData);
        setJournals(formattedData)

    }

    const convertToJsonToEditor = (journalData) => {
     const loopToConvert = journalData.map( journal => {
        const editorBody =  convertFromRaw(JSON.parse(journal.body));
        const editorState = EditorState.createWithContent(editorBody);
        return {...journal, editorBody: editorState }
     });
     return loopToConvert;
    }

    const handleDelete = async (journalId) => {
        console.log(journalId)
        const response = await axios.post(`journal/delete?id=${journalId}`)
        getAllJournals()
    }

    const allJournals = journals.map(journal => {

        if(journal.user === userId){
      return (
            <div key={journal._id}>

                <Link to={`/journal/detail/${journal._id}`}><h3>{journal.title}</h3></Link>
                {/* <div style={{  backgroundColor: 'pink' }}>
                <Editor
                    readOnly={true}
                    editorState={journal.editorBody}
                />
                
                </div> */}
         
                <button onClick={() => {handleDelete(journal._id)}}>Delete</button>
            </div>
        )
        }

  
    })

    return (
        <>

        <Link to="/create-journal">Add a Journal</Link> &nbsp;
        {allJournals}
        </>
    )

}

