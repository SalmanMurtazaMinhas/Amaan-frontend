import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, InputAdornment, IconButton} from '@material-ui/core';
import { Container, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const customStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block',
    }, 
    card: {
        width: '100%',
        height: 430,
        marginBottom: 200,
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        paddingLeft: 50,
        paddingRight: 50,
    },
    card2: {
        width: '50%',
        height: 550,
        paddingTop: 20,
    }, 
    header: {
        color: '#a088d5',
        textAlign: 'center',
        fontSize: 35,
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

export default function Signup(props) {
    const classes = customStyles()
    const [newUser, setNewUser] = useState({});

    const [firstNameValidate, setFirstNameValidate] = useState();
    const [lastNameValidate, setLastNameValidate] = useState();
    const [emailValidate, setEmailValidate] = useState();
    const [passwordValidateValue, setPasswordValidateValue] = useState();

    const [eye, setEye] = useState(false)

    const navigate = useNavigate()
    // console.log(props.status)

    const changeHandler = (e) => {
        const user = {...newUser};

        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const firstNameChangeHandler = (e) => {
        changeHandler(e)
        setFirstNameValidate(e.target.value)
    }

    const lastNameChangeHandler = (e) => {
        changeHandler(e)
        setLastNameValidate(e.target.value)
    }

    const emailChangeHandler = (e) => {
        changeHandler(e)
        setEmailValidate(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        changeHandler(e)
        setPasswordValidateValue(e.target.value)
    }

    const registerHandler = (e) => {
        props.register(newUser)
        console.log(newUser)
    }

    const eyeHandler = () => {
        setEye(!eye)
      }

  return (
    <div className={classes.card}>
        
        <Card className={classes.card2}>
            <CardContent>
            <Container className={classes.container}>
            <Typography 
            variant="h5"
            className={classes.header}>
                CREATE AN ACCOUNT
            </Typography>

            <form autoComplete="off">
                <TextField 
                className={classes.field}
                label="First Name" 
                name="firstName"
                onChange={firstNameChangeHandler}
                fullWidth
                required
                placeholder='Enter Your First Name'
                helperText={!firstNameValidate?'First Name is required':''}
                error = {!firstNameValidate}
                >
                </TextField>
            
                <TextField
                className={classes.field}
                label="Last Name"
                name="lastName"
                onChange={lastNameChangeHandler}
                fullWidth
                required
                placeholder='Enter Your Last Name'
                helperText={!lastNameValidate?'Last Name is required':''}
                error = {!lastNameValidate}
                >
                </TextField>
            
                <TextField
                className={classes.field}
                label="Email" 
                name="emailAddress"
                onChange={emailChangeHandler}
                fullWidth
                required
                placeholder='Enter Your Email Address'
                helperText={!emailValidate?'Email Address is required':''}
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
                placeholder='Enter Your Password'
                helperText={!passwordValidateValue?'Password is required':''}
                error = {!passwordValidateValue}
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
            <StyledButton onClick={registerHandler}>Register</StyledButton>
            </Container>
            </CardContent>
        </Card>
        
    </div>
  )
}
