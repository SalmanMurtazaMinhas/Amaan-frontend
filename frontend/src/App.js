import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography'
import { createTheme, ThemeProvider } from '@material-ui/core'
// import AppBar from '@material-ui/core/AppBar'
// import ToolBar from '@material-ui/core/ToolBar'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
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
// import homepageImg from './images/DrawKit Vector Illustration Mental Health & Psychology (6).png'
import HomePage from './components/home/HomePage';
import SpecialistCreate from './components/Specialist/SpecialistCreate';
import SpecialistIndex from './components/Specialist/SpecialistIndex';
import Footer from './components/home/Footer';
import SupportGroupForm from './components/supportGroups/SupportGroupForm';
import SupportGroupIndex from './components/supportGroups/SupportGroupIndex';

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
        fontSize: 16,
    }
})

export default function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

    const [todayMood, setTodayMood] = useState({})

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token != null){
            let user = jwt_decode(token);
            console.log(user)

            if (user){
                setIsAuth(true)
                setUser(user)
                setLoaded(true)
            } else if (!user){
                localStorage.remove("token")
                setIsAuth(false)
            }
        }
    }, [])

    useEffect(() => {
        setTodayMood(todayMood)
    })

    const registerHandler = (user) => {
        axios.post("auth/signup", user)
        .then(res => {
          console.log(res)

          if(res.status === 201){
            navigate('/signin')
        }

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

            if(res.status === 200){
                navigate('/')
            }

            let token = res.data.token;
            if (token != null){
                localStorage.setItem("token", token);
                let user = jwt_decode(token);
                setIsAuth(true)
                setUser(user)
                
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
        navigate("/")
      }
    

    return(
        <ThemeProvider theme={theme}>
            <div>
                
                <nav className="navBar">
                    <div>
                    {/* <Typography 
                    variant="h5"
                    color="secondary"
                    align="left">
                      Amaan
                    </Typography> */}
                    {/* <Link to="/create-journal">Add a Journal</Link> &nbsp; */}
                    <Link to="/" className="navItem">Home</Link> &nbsp;
                    <Link to="/about" className="navItem">About</Link> &nbsp;
                    <Link to="/mood" className="navItem">Mood</Link> &nbsp;
                    <Link to="/journal" className="navItem">My Journals</Link> &nbsp;
                    {/* <Link to="/bookappointment" className="navItem">Book An Appointment</Link> &nbsp; */}
                    {/* <Link to="/bookappointment/index" className="navItem">Appointments Index</Link> &nbsp; */}
                    {/* <Link to="/specialist/index" className="navItem">Specialists Index</Link> &nbsp; */}
                    {/* <Link to="/specialist" className="navItem">Specialists</Link> &nbsp; */}
                    {!isAuth && <Link to="/signin" onClick={loginHandler} className="navItem">Login</Link>} &nbsp;

                    { isAuth && <Link to='/logout' onClick={logoutHandler} className="navItem">Logout</Link> }

                    </div>
                </nav>
                <Routes>

                <Route
                    path='/'
                    element={<HomePage userid= { user?.user? user.user.id : null} todayMood={todayMood} isAuth={isAuth}/>}
                    />
                    <Route
                    path='/create-journal'
                    element={<JournalCreate />}
                    />
                    <Route
                    path='/journal'

                    element={loaded && isAuth ? <JournalIndex userid= { user?.user? user.user.id : null}/> : <Signin login={loginHandler}/>}
                    />
                    <Route
                    path='/mood'
                    element={loaded && isAuth ? <MoodTracker userid= { user?.user? user.user.id : null}/> : <Signin login={loginHandler}/>}
                    />
                    <Route 
                    path="/signup"
                    element={<Signup register={registerHandler} />}
                    />
                    <Route 
                    path="/signin"
                    element={<Signin login={loginHandler}/>}/>
                    <Route
                    path='/bookappointment'
                    element={isAuth ? <BookAppointmentCreate /> : <Signin login={loginHandler}/>}
                    />
                    <Route
                    path='/bookappointment/index'
                    element={<BookAppointmentIndex />}
                    />
                    <Route
                    path='/journal/detail/:journalId'
                    element={<JournalDetail/>}
                    />
                    <Route
                    path='/specialist'
                    element={<SpecialistCreate />}
                    />
                    <Route
                    path='/specialist/index'
                    element={<SpecialistIndex />}
                    />
                    <Route 
                    path='/supportgroup'
                    element={<SupportGroupForm />}
                    />
                    <Route
                    path='/supportgroup/index'
                    element={<SupportGroupIndex />}
                    />
                </Routes>

            
            <Footer />
             </div>
        </ThemeProvider>
    )
}

