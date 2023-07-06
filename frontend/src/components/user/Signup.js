import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { Container, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';

const customStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block',
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
    card2: {
        width: '50%',
        height: 480,
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
    const navigate = useNavigate()
    // console.log(props.status)

    const changeHandler = (e) => {
        const user = {...newUser};

        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);

    }

    const registerHandler = () => {
        if(props.status !== 500){
            navigate('/signin')
        }
        props.register(newUser)
        console.log(newUser)
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
                onChange={changeHandler}
                fullWidth
                required
                >
                </TextField>
            
                <TextField
                className={classes.field}
                label="Last Name"
                name="lastName"
                onChange={changeHandler}
                fullWidth
                required
                >
                </TextField>
            
                <TextField
                className={classes.field}
                label="Email" 
                name="emailAddress"
                onChange={changeHandler}
                fullWidth
                required
                >
                </TextField>
            
                <TextField
                className={classes.field}
                label="Password"
                type="password"
                name="password"
                onChange={changeHandler}
                fullWidth
                required
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
