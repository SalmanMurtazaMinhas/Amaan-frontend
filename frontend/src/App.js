import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import JournalCreate from './components/journal/journalCreate';
import JournalIndex from './components/journal/journalIndex';
import JournalDetail from './components/journal/journalDetail';

export default function App() {

    

    return(
        <div>
            <h1>React App</h1>
            <Router>
                <nav>
                    <div>
                    {/* <Link to="/create-journal">Add a Journal</Link> &nbsp; */}
                    <Link to="/journal">Journal</Link> &nbsp;
                    </div>
                </nav>
                <Routes>
                    <Route
                    path='/create-journal'
                    element={<JournalCreate />}
                    />
                    <Route
                    path='/journal'
                    element={<JournalIndex />}
                    />
                    <Route
                    path='/journal/detail/:journalId'
                    element={<JournalDetail/>}
                    />
                </Routes>
            </Router>
        </div>
    )
}