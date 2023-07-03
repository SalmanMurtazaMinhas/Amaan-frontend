
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import JournalCreate from './components/journal/journalCreate';
import JournalIndex from './components/journal/journalIndex';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import 'react-calendar/dist/Calendar.css';
import MoodTracker from './components/MoodTracker';
import '../src/App.css'
import BookAppointmentCreate from './components/BookAppointment/BookAppointmentCreate'
import JournalDetail from './components/journal/journalDetail'
    


export default function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token != null){
            let user = jwt_decode(token);

            if (user){
                setIsAuth(true)
                setUser(user)
            } else if (!user){
                localStorage.remove("token")
                setIsAuth(false)
            }
        }
    }, [])


    const registerHandler = (user) => {
        axios.post("auth/signup", user)
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err.message)
        })
    }
    

    const loginHandler = (cred) => {
        axios.post("auth/signin", cred)
        .then(res => {
            console.log(res.data.token)

            let token = res.data.token;
            if (token != null){
                localStorage.setItem("token", token);
                let user = jwt_decode(token);
                setIsAuth(true)
                setUser(user)
                return <Navigate to="/journalCreate" />
            }
        }).catch(error => {
            console.log(error)
        })
    }






    

    return(
        <div>
            <h1>React App</h1>
            <Router>
                <nav>
                    <div>

                    {/* <Link to="/create-journal">Add a Journal</Link> &nbsp; */}
                    <Link to="/journal">Journal</Link> &nbsp;
                    <Link to="/home">Home</Link> &nbsp;
                    <Link to="/about">About</Link> &nbsp;
                    <Link to="/signin" onClick={loginHandler}>Login</Link> &nbsp;
                    <Link to="/bookappointment">Book An Appointment</Link> &nbsp;
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
                    path='/mood'
                    element={<MoodTracker />}
                    />
                    <Route 
                    path="/signup"
                    element={<Signup register={registerHandler}></Signup>}
                    />
                    <Route 
                    path="/signin"
                    element={<Signin login={loginHandler}></Signin>}/>
                    <Route
                    path='/bookappointment'
                    element={<BookAppointmentCreate />}
                    />
                    <Route
                    element={<JournalDetail/>}
                    path='./journal/detail/:journalId'
                    />
                </Routes>
            </Router>
        </div>
    )

}

