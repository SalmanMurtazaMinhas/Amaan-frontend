import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Card, CardContent, Button, withStyles } from '@material-ui/core'


const DeleteButton = withStyles({
    root: {
        background: '#000',
        color: '#FFFFFF',
        marginTop: '10px',
        marginLeft: '40px',
        width: '50%',
        textAlign: 'center',
      '&:hover' : {
        background: '#CDF0EA',
        color: '#000'
      }
    }
})(Button);

export default function JournalIndex(props){

    const [journals, setJournals] = useState([])
    const [userId, setUserId] = useState(props.userid)
    console.log(props)
  const [loading, setLoading] = useState(true)

    

    useEffect(() => {
        getAllJournals()
    setLoading(false)

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
        <div>
            
            <div key={journal._id} className="parentJournalCards">
                <Card className="journalCards">
                    <CardContent>
                    <Link to={`/journal/detail/${journal._id}`} className="journalCardTitle"><h3>{journal.title}</h3></Link>
                    <DeleteButton className="journalCardDeleteButton" onClick={() => {handleDelete(journal._id)}}>Delete</DeleteButton>
                    </CardContent>
                </Card>
                  
                {/* <div style={{  backgroundColor: 'pink' }}>
                <Editor
                readOnly={true}
                editorState={journal.editorBody}
                />

                </div> */}

            
            </div>
            
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

