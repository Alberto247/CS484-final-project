import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import { Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

import logo from "../../logos/navbar.png";
import Nav from 'react-bootstrap/Nav';

function Topbar(props) {
  const navigate = useNavigate()
  return (
    <Navbar expand="lg" sticky="top" bg="dark" variant="dark">
      <Container fluid>
      <Col>
        <Navbar.Brand href="#/" onClick={() => { navigate("/"); }}>
        
          <img
              src={logo}
              width="50px"
              height="50px"
              className="d-inline-block align-top"
              alt="SneakerScanner logo"
            />
          <span style={{ color: 'white', marginLeft: '1em', fontSize: 30 }}>SneakerScanner</span>
          </Navbar.Brand>
      </Col>
      <Col lg={3} className="text-center">
          <Nav className="ms-auto">
        <SearchBar setSneakers={props.setSneakers} setSearch={props.setSearch} setLoading={props.setLoading} setActivePage={props.setActivePage} />
        </Nav>
      </Col>
      <Col>
        <Navbar.Collapse className="justify-content-end">
        <Nav className="justify-content-end">{props.session !== null ? 
            <><Nav.Link onClick={() => {navigate('/favourites')}}>Favourites</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {props.signOut(); navigate("/");}}>Logout</Nav.Link></>
          :
          <><Nav.Link onClick={() => {navigate('/login')}}>Favourites</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {navigate('/login')}}>Login</Nav.Link></>}
          </Nav>
         
        </Navbar.Collapse>
        </Col>  

              {/*props.session !== null ?
              <Button variant="light" active onClick={() => { props.signOut(); navigate("/"); }}>
                Logout
              </Button> :
        <Button variant="light" active onClick={() => navigate('/login')}>Login</Button>*/}
           
      </Container>
    </Navbar>
  )
}

function SearchBar(props) {
  const navigate = useNavigate()
  const [input, setInput] = useState("");


  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length > 0) {
      setInput("");
      navigate("/search/"+encodeURIComponent(input)+"/"+1);
    }
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        onChange={handleChange}
        aria-label="Search"
        value={input}
      />
      <Button variant="outline-success" onClick={handleSubmit}>Search</Button>
    </Form>
  )
}

export { Topbar }