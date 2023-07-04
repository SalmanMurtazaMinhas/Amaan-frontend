import React, { useState } from 'react'; 
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {Container, Form} from "react-bootstrap"

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

export default function Signin(props) {

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
    <div>
        <h1>Signin</h1>
        <Container>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control name="emailAddress" onChange={changeHandler}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <StyledButton onClick={loginHandler}
            variant='primary'>
                Login
            </StyledButton>
            <p>Don't have an account? <a href='/signup'>Signup here</a></p>
        </Container>
    </div>
  )
}
