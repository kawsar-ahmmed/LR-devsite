import logo from './logo.svg';
import './App.css'
import { getAuth } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const auth = getAuth(app);



function App() {

  const [email, setEmail] = useState([])


  const handleEmailBlur = event => {
    console.log(event.target.value)
  }

  const handlePasswordBlur = event => {
    console.log(event.target.value)
  }
  const handleFromSubmit = event => {
    console.log(event)
    event.preventDefault();
  }

  return (
    <div>
      <header className="App-header">
        {/* Advance from  */}
        <div className="registration-user w-50 mx-auto">
          <h1 className='text-primary m-10'>Registration here!!</h1>
          <Form onSubmit={handleFromSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </header>
    </div>
  );
}

export default App;
