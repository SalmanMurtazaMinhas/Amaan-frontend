import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { Container, Form } from "react-bootstrap";
import { Navigate } from 'react-router-dom';

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
        height: 390,
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

    const changeHandler = (e) => {
        const user = {...newUser};

        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = () => {
        props.login(newUser)

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
                    <StyledButton onClick={loginHandler}>LOGIN</StyledButton>
                    <Typography
                    className={classes.field}>
                        Don't have an account? <a href='/signup'>Signup</a>
                    </Typography>
                </Container>
            </CardContent>
        </Card>
    </div>

  )
}
