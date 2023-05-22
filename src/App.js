import logo from './logo.svg';
import './App.css'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const auth = getAuth(app);



function App() {

  const [email, setEmail] = useState('');
  const [password, setPasswpord] = useState('');
  const [registared, setRegistar] = useState(false);

  const handleEmailBlur = event => {
    setEmail(event.target.value)
  }

  const handlePasswordBlur = event => {
    setPasswpord(event.target.value)
  }
  const handleRegistarChange = event => {
    setRegistar(event.target.checked)
  }
  const handleFromSubmit = event => {
    // console.log('From Submited ' + email, password)
    event.preventDefault();
    // email added
    createUserWithEmailAndPassword(auth, email, password)

      .catch(error => {
        console.log('User Already Registraed')
      })
    // login
    if (registared) {
      signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user)
      })
      .catch( error => {
        console.log('47 error')
      })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          setEmail('')
          setPasswpord('')
          verifyEmail()
        })
    }

  }

  const verifyEmail = ()=> {
    sendEmailVerification(auth.currentUser)
    .then(result => {
      console.log('email send')
    })
  }

  return (
    <div>
      <header className="App-header">
        {/* Advance from  */}
        <div className="registration-user w-50 mx-auto">
          <h1 className='text-primary m-10'>{registared ? 'login ' : 'Registar'}</h1>
          <Form onSubmit={handleFromSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label r>Email address</Form.Label>
              <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
            </Form.Group>
            {/* Check out */}
            <Form.Group className="mb-3">
              <Form.Check
                onChange={handleRegistarChange}
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            {/*  */}
            <Button variant="primary" type="submit">
              {registared ? "Login" : "Registrad"}
            </Button>
          </Form>
        </div>
      </header>
    </div>
  );
}

export default App;
