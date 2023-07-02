
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { convertFromRaw, EditorState, Editor } from 'draft-js';


export default function JournalIndex(){

    const [journals, setJournals] = useState([])

    useEffect(() => {
        getAllJournals()
    },[])

    const getAllJournals = async () => {
        const response = await axios.get('journal/index')
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
        return (
            <div key={journal._id}>
                <h3>{journal.title}</h3>
                <div style={{  backgroundColor: 'pink' }}>
                <Editor
                    readOnly={true}
                    editorState={journal.editorBody}
        // onChange={this._handleChange}
                />
                </div>
         
                {/* <button onClick={() => {handleDelete(journal._id)}}>Delete</button> */}
            </div>
        )
    })

    return (
        <>
        {allJournals}
        </>
    )

}

