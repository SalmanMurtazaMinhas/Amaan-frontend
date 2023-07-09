import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { convertFromRaw, EditorState, Editor } from 'draft-js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Card, CardContent, Button, withStyles, ListItem, ListItemText } from '@material-ui/core'
import Lottie, {LottieRefCurrentProps, } from "lottie-react";
import { InteractivityProps } from 'lottie-react';

import writingJournal from '../../assets/man-writing.json'
import writingLamp from '../../assets/man-working-under-lamp-light.json'

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

const IndexButton = withStyles({
    root: {
        background: '#BEAEE2',
        color: '#FFFFFF',
        marginBottom: '10px',
        marginLeft: '40px',
        width: '300px',
      '&:hover' : {
        background: '#CDF0EA',
        color: '#000'
      }
    }
})(Button);

export default function JournalIndex(props){

    // const writingRef = useRef<LottieRefCurrentProps>(null)

    const [journals, setJournals] = useState([])
    const [userId, setUserId] = useState(props.userid)
    // console.log(props)
  const [loading, setLoading] = useState(true)

  const [userName, setUserName] = useState('')

  const style = {
    height: 400,
  };
  
//   const interactivity = {
//     mode: "scroll",
//     actions: [
//       {
//         visibility: [0, 0.2],
//         type: "stop",
//         frames: [0],
//       },
//       {
//         visibility: [0.2, 0.45],
//         type: "seek",
//         frames: [0, 45],
//       },
//       {
//         visibility: [0.45, 1.0],
//         type: "loop",
//         frames: [45, 60],
//       },
//     ],
//   };

    

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

        
        if(journal.user._id === userId){
            
            if(!userName) {
                setUserName(journal.user.firstName)
            }
            
      return (
        <div className='listItem'>
            
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
        <h1 style={{margin : '0 auto', width: '20%'}}>My Journals</h1>
        <IndexButton><Link to="/create-journal" className="addJournalButton">Add a Journal</Link> &nbsp;</IndexButton>
        
        <div style={{margin: '0, auto', position: 'absolute', left: '700px'}}>
            <Lottie
                // lottieRef={writingRef}   
                // animationData={writingJournal}
                animationData={writingLamp}
                style={style}
                // interactivity={interactivity}
                />
        </div>
        <div className='list'>

        {allJournals}
        </div>
        </>
    )

}

