import {Form, Button, Row, Col, Container} from 'react-bootstrap';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom'

function Signup(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPwd, setRepeatedPwd] = useState('');
    const supabase = props.supabase

    async function signupSubmit(){
        
        if(repeatedPwd === password){
            const { user, session, error } = await supabase.auth.signUp({
                email: username,
                password: password,
            })
            console.log(user)
            console.log(session)
            if(error){
                console.log(error)
                props.showError("Error in SignUp")
                throw error
            }
            
            props.showSuccess("Check your email address!")
            
        }else{
            props.showError("Passwords are not equals")
        }
    }

    return (
        <Container fluid>
        
        <Row className="justify-content-md-center">
          <Col sm={6}>
            <h1>Sign Up</h1>
            <Form onSubmit={signupSubmit}>
              <Form.Group controlId='username' className="mb-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='email' value={username} placeholder="Email" onChange={ev => setUsername(ev.target.value)} required={true} />
              </Form.Group>
  
              <Form.Group controlId='password' className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' value={password} placeholder="Password" onChange={ev => setPassword(ev.target.value)} required={true} minLength={6}/>
              </Form.Group>

              <Form.Group controlId='repeat password' className="mb-2">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control type='password' value={repeatedPwd} placeholder="Repeat Password" onChange={ev => setRepeatedPwd(ev.target.value)} required={true} minLength={6}/>
              </Form.Group>
  
              <Button type="submit">Sign Up</Button>
              
            </Form>
          </Col>
        </Row>
    </Container>
        );
}

export {Signup}