import {Form, Button, Row, Col, Container} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from 'react-router-dom'


function Login(props){
    const navigate = useNavigate()
    const [session, setSession] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const supabase = props.supabase
   
    const loginSubmit = async ()=>{
        await signInWithEmail()
        setSession("Setting Something as session")
        props.setLoggedIn(true)
        navigate("/")
    }

    
    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        })
        if(error){
            console.log(error)
            props.showError("Something went wrong :(")
            throw error
        }
       
        props.showSuccess("Welcome back!")
        
    }

    

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
        if(error){
          console.log(error)
          props.showError("Something went wrong :(")
          throw error
        }
        props.setLoggedIn(true)
        props.showSuccess("Welcome back!")
        navigate("/")
    }

    async function signInWithFacebook() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'facebook',
        })
        if(error){
          console.log(error)
          props.showError("Something went wrong :(")
          throw error
        } 
        props.setLoggedIn(true)
        props.showSuccess("Welcome back!")
        navigate("/")
    }
    
    
    return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col sm={6}>
            <FacebookLoginButton onClick={() => signInWithFacebook()} />
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col sm={6}>
            <GoogleLoginButton onClick={() => signInWithGoogle()}    />
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col sm={6}>
            <hr/>
            </Col>
        </Row>

          <Row className="justify-content-md-center">
            <Col sm={6}>
              <h1>Login</h1>
              <Form onSubmit={loginSubmit}>
                <Form.Group controlId='username' className="mb-2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='email' value={username} placeholder="Email" onChange={ev => setUsername(ev.target.value)} required={true} />
                </Form.Group>
    
                <Form.Group controlId='password' className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' value={password} placeholder="Password" onChange={ev => setPassword(ev.target.value)} required={true} minLength={6}/>
                </Form.Group>
    
                <Button type="submit">Login</Button> <Button class="btn btn-link" onClick={() => navigate('/signup')}>Sign Up</Button>
                
              </Form>
            </Col>
          </Row>
      </Container>
      )
}

// import { Auth, Typography, Button } from '@supabase/ui'



// function Login(props){
//     console.log(props.supabase)
//     const Container = (props) => {
//         const { user } = Auth.useUser()
//         if (user)
//           return (
//             <>
//               <Typography.Text>Signed in: {user.email}</Typography.Text>
//               <Button block onClick={() => props.supabaseClient.auth.signOut()}>
//                 Sign out
//               </Button>
//             </>
//           )
//         return props.children
//     }

    
    
//     return (
//         <>
//         <Auth.UserContextProvider supabaseClient={props.supabase}>
//         <Container supabaseClient={props.supabase}>
//             <Auth supabaseClient={props.supabase} providers={['google']} />
//         </Container>
//         </Auth.UserContextProvider>
//         </>
//     )
    
    
// }

export {Login};