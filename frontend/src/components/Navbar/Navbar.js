import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

function Topbar(props){
  const navigate = useNavigate()

  return(
    <Navbar expand="lg" sticky="top" bg="dark" variant="dark">
      <Container fluid>
      <Navbar.Brand href="#/" onClick={() => {props.getInitSneakers(); props.setSearch("");}}>
      <span style={{ color: 'white', marginLeft: '1em', fontSize: 25 }}>Sneakerscanner</span>
      </Navbar.Brand>
      <SearchBar setSneakers={props.setSneakers} setSearch={props.setSearch} setLoading={props.setLoading} setActivePage={props.setActivePage}/>
      {props.isLoggedIn ?
        <Button variant="light" active onClick={() => { props.signOut(); navigate("/"); }}>
            Logout
        </Button> :
      <Button variant="light" active onClick={() => navigate('/login')}>Login</Button>}
        </Container>
    </Navbar>
  )
}

function SearchBar(props){
  const navigate = useNavigate()
  const [input, setInput] = useState("");
  
  const getSneakers = async () => {
    props.setLoading(true);
    const response = await fetch('https://fluffy-dusk-8cf61e.netlify.app/.netlify/functions/search?page=1&search='+input);
    const product = await response.json();
    if(response.ok) {
      console.log(product.products.length);
      props.setSneakers(product.products);
    } else {
      throw product;  
    }
    props.setLoading(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if(input.length > 0) {
      setInput("");
      navigate("/");
      props.setSearch(input);
      props.setActivePage(1);
      await getSneakers();
    }
  };

  return(
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