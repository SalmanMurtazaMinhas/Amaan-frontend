import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography'
import { createTheme, ThemeProvider } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import JournalCreate from './components/journal/journalCreate';
import JournalIndex from './components/journal/journalIndex';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import MoodTracker from './components/mood/MoodTracker';
import BookAppointmentCreate from './components/BookAppointment/BookAppointmentCreate'
import JournalDetail from './components/journal/journalDetail'
import BookAppointmentIndex from './components/BookAppointment/BookAppointmentIndex';
    
const theme = createTheme({
    palette: {
        primary: {
            light: '#ebe6f6',
            main: '#BEAEE2',
            dark: '#a088d5'
        },
        secondary: {
            main: '#F7DBF0',

        }
    },
    typography: {
        fontFamily: 'Didact Gothic',
        fontSize: 16
    }
})

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
            console.log(res)
            console.log(res.data.token)
            console.log("You are logged in!")
            let token = res.data.token;
            if (token != null){
                localStorage.setItem("token", token);
                let user = jwt_decode(token);
                setIsAuth(true)
                setUser(user)
                return <Navigate to="/" />
            }
        }).catch(error => {
            console.log(error)
        })
    }


    const logoutHandler = (e) => {
        e.preventDefault() // do not reload page
        localStorage.removeItem("token")
        setIsAuth(false)
        setUser(null)
      }
    



    

    return(
        <ThemeProvider theme={theme}>
            <div>
            <Typography 
            variant="h4"
            color="secondary"
            align="left">
                Amaan
            </Typography>
            {/* <AppBar>
                <ToolBar>
                    <Typography></Typography>
                </ToolBar>
            </AppBar> */}
            <Router>
                <nav>
                    <div>
                    {/* <Link to="/create-journal">Add a Journal</Link> &nbsp; */}
                    <Link to="/journal">Journal</Link> &nbsp;
                    <Link to="/home">Home</Link> &nbsp;
                    <Link to="/about">About</Link> &nbsp;
                    <Link to="/mood">Mood</Link> &nbsp;
                    <Link to="/signin" onClick={loginHandler}>Login</Link> &nbsp;
                    <Link to="/bookappointment">Book An Appointment</Link> &nbsp;

                    <Link to="/bookappointment/index">Appointments Index</Link> &nbsp;

        { isAuth && <Link to='/logout' onClick={logoutHandler}>logout</Link> }

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
                    path='/bookappointment/index'
                    element={<BookAppointmentIndex />}
                    />
                    <Route
                    path='/journal/detail/:journalId'
                    element={<JournalDetail/>}
                    />
                </Routes>
            </Router>
        </div>
        </ThemeProvider>
    )
}

