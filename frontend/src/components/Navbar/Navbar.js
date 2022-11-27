import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import { Dropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";

function Topbar(props) {
  const navigate = useNavigate()
  return (
    <Navbar expand="lg" sticky="top" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#/" onClick={() => { navigate("/"); }}>
          <span style={{ color: 'white', marginLeft: '1em', fontSize: 25 }}>SneakerScanner</span>
        </Navbar.Brand>
        <SearchBar setSneakers={props.setSneakers} setSearch={props.setSearch} setLoading={props.setLoading} setActivePage={props.setActivePage} />
        {props.session !== null ?
          <>
            <Dropdown align={'end'}>

              <Dropdown.Toggle as={PersonCircle} size={50} style={{
                paddingRight: 0,
                borderRadius: '50%',
                cursor: 'pointer',
                //backgroundColor: 'white',
                bg:'dark',
                color: 'green'
              }} />

              <Dropdown.Menu>


                
                <Dropdown.Item onClick={()=> {navigate("/favourites")}}>Favourites</Dropdown.Item>
                <Dropdown.Item onClick={() => { props.signOut(); navigate("/"); }}>Logout</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
              </>
              : <Button variant="light" active onClick={() => navigate('/login')}>Login</Button>}


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