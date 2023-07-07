import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, InputAdornment, IconButton} from '@material-ui/core';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Container, Form } from "react-bootstrap"

import { useNavigate, Link } from 'react-router-dom';

import Signup from './Signup'



const customStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block',
        textAlign: 'center',
    }, 
    card: {
        width: '100%',
        height: 430,
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        paddingLeft: 50,
        paddingRight: 50,
    },
    cardSignin: {
        width: '50%',
        height: 400,
        paddingTop: 20,
    }, 
    header: {
        color: '#a088d5',
        textAlign: 'center',
        fontSize: 30,
    }
})

const StyledButton = withStyles({
    root: {
      background: '#BEAEE2',
      color: '#FFFFFF',
      width: '100%',
      fontSize: 15,
      marginTop: 5,
      '&:hover' : {
        background: '#CDF0EA',
        color: '#000'
      }
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

export default function Signin(props) {
    const classes = customStyles()

    const [newUser, setNewUser] = useState({});

    const [validateValue, setValidateValue] = useState();
    const [emailValidate, setEmailValidate] = useState();

    const [eye, setEye] = useState(false)

    const navigate = useNavigate()

    const changeHandler = (e) => {
        const user = {...newUser};

        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }
    const passwordChangeHandler = (e) => {
        changeHandler(e)
        setValidateValue(e.target.value)
    }

    const emailChangeHandler = (e) => {
        changeHandler(e)
        setEmailValidate(e.target.value)
    }

    const loginHandler = () => {
        props.login(newUser)
        
    }

    // const navigateSignup = () => {
    //     navigate('/signup')
    // }

    const registerHandler = () => {
      console.log(newUser)
      props.register(newUser)
  }

  const eyeHandler = () => {
    setEye(!eye)
  }

  return (
    <div className={classes.card}>
        <Card className={classes.cardSignin}>
            <CardContent>
                <Container className={classes.container}>
                    <Typography
                    className={classes.header}
                    >
                        LOG INTO YOUR ACCOUNT
                    </Typography>
                    <form>
                        <TextField
                        className={classes.field}
                        label="Email Address"
                        name="emailAddress"
                        onChange={emailChangeHandler}
                        fullWidth
                        required
                        placeholder='Enter Your Email Address'
                        helperText={!emailValidate? 'Email Address is required' : ''}
                        error = {!emailValidate}
                        >  
                        </TextField>
                    
                        <TextField
                        className={classes.field}
                        label="Password"
                        type={eye? "text" : "password"}
                        name="password"
                        onChange={passwordChangeHandler}
                        fullWidth
                        required
                        // value={validateValue}
                        placeholder='Enter Your Password'
                        helperText={!validateValue?'Password is required':''}
                        error = {!validateValue}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>
                                <IconButton onClick={eyeHandler}>
                                    {eye? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                </IconButton>
                                </InputAdornment>
                        }}
                        >
                        </TextField>
                    </form>
                    <StyledButton onClick={loginHandler}>LOGIN</StyledButton>
                    
                    <Typography
                    className={classes.field}>

                        {/* Don't have an account? <Link onClick={navigateSignup()}><a>Signup</a></Link> */}


                        Don't have an account? <Link to="/signup">Signup</Link> &nbsp;

                    </Typography>
                </Container>
            </CardContent>
        </Card>
    </div>

  )
}
