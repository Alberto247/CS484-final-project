import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
function Topbar(props){
    const navigate = useNavigate()
    return(
        <Navbar expand="lg" sticky="top" bg="dark" variant="dark">
            <Container fluid>
            <Navbar.Brand href="#home">
            <span style={{ color: 'white', marginLeft: '1em', fontSize: 25 }}>Sneakerscanner</span>
            </Navbar.Brand>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"/>
            <Button variant="outline-success">Search</Button>
          </Form>
          {//props.loggedIn ?
            //<Button variant="light" active onClick={() => { props.logout(); navigate("./") }}>
               //logout
            //</Button> :
          <Button variant="light" active onClick={() => navigate('/login')}>Login</Button>}
            </Container>
        </Navbar>
    )
}

export {Topbar}