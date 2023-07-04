import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

import { Container, Form } from "react-bootstrap"

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
        width: '50%'
    }
})

const StyledButton = withStyles({
    root: {
      background: '#BEAEE2',
      color: '#FFFFFF',
      width: 150,
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

    const changeHandler = (e) => {
        const user = {...newUser};

        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);

    }

    const registerHandler = () => {
        console.log(newUser)
        props.register(newUser)
    }

  return (
    <div className={classes.card}>
        
        <Card className={classes.card2}>
            <CardContent>
            <Container className={classes.container}>
            <Typography variant="h4">
                CREATE AN ACCOUNT
            </Typography>

            <form autoComplete="off">
                <TextField 
                className={classes.field}
                label="First Name" 
                onChange={changeHandler}
                color="primary"
                fullWidth
                required
                >
                </TextField>
            </form>
            <form>
                <TextField
                className={classes.field}
                label="Last Name"
                onChange={changeHandler}
                fullWidth
                required
                >
                </TextField>
            </form>
            <form>
            <TextField
                className={classes.field}
                label="Email" 
                onChange={changeHandler}
                fullWidth
                required
                >
                </TextField>
            </form>
            <form>
                <TextField
                className={classes.field}
                label="Password"
                type="password"
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
