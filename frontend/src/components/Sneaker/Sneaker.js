import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Heart from "react-heart"
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Row, Col } from "react-bootstrap";
//Small component for the SneakerTable component.
function Sneaker(props) {
    const [input, setInput] = useState(props.threshold ? "$ " + props.threshold : "$ ");


    const handleChange = (e) => {
        e.preventDefault();
        const re = /^\$ [0-9\b]*$/; //Magic regex to avoid deleting the $ 
        if (e.target.value === '' || re.test(e.target.value)) {
            setInput(e.target.value);
        }

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.setThreshold(props.sneaker._id, parseInt(input.replace("$ ", "")))
        props.showSuccess("An e-mail will be sent to you when the price of that shoe goes below the thresold!")

    }

    const navigate = useNavigate();
    let resellRange = "Price Not available";

    if(Object.keys(props.sneaker.lowestResellPrice).length !== 0) {
        const max = Math.max(...Object.values(props.sneaker.lowestResellPrice));
        const min = Math.min(...Object.values(props.sneaker.lowestResellPrice));
        resellRange = "Price: $" + min + " - $" + max;
        if (min === max) {
            resellRange = "Price: $" + min;
        }
    }

    const brandContained = props.sneaker.shoeName.includes(props.sneaker.brand);
    const width = window.innerWidth;
    if (width < 800) {
        // For mobile devices
        return (
            <div className="d-flex p-2 flex-column">

                <Card className="sneaker-main-card" style={{ height: '100%', backgroundColor: '#293133', width: "90vw" }}>
                    <Card.Img className="card-img-top" variant="top" src={props.sneaker.thumbnail} onClick={(ev) => { navigate("/view/" + encodeURIComponent(props.sneaker.shoeName)); }} style={{ cursor: 'pointer' }} />
                    <Card.Body>
                        <Card.Title style={{ textDecoration: "none", color: "white" }}><span className="d-inline-block text-truncate" style={{ maxWidth: "80vw" }}>{brandContained ? props.sneaker.shoeName : props.sneaker.brand + " " + props.sneaker.shoeName}</span></Card.Title>
                        <Card.Text style={{ textDecoration: "none", color: "white" }}>
                            {resellRange}
                        </Card.Text>
                        {props.session !== null ? <>
                            <Row>
                            <Col lg={2} md="auto" className=".justify-content-start">
                            <div style={{ width: "2rem" }}>
                                <Heart isActive={props.isFavourite} onClick={() => { props.changeFavourite(props.sneaker); }} animationTrigger="both" inactiveColor="rgba(255,50,100,.75)" activeColor="#fb3958" animationDuration={0.1} />
                            </div>
                            </Col>
                            <Col md="auto" className=".justify-content-start">
                                <Button variant="success" onClick={(ev) => { navigate("/view/" + encodeURIComponent(props.sneaker.shoeName)); }}>Show prices</Button>
                            </Col>
                            
                            </Row>
                            </> 
                            :
                            <>
                             <Col md="auto" className=".justify-content-start">
                                <Button variant="success" onClick={(ev) => { navigate("/view/" + encodeURIComponent(props.sneaker.shoeName)); }}>Show prices</Button>
                            </Col>
                            </>

                        }
                            {props.fromFavourite ?
                                    <InputGroup className="mb-4">
                                    <Form.Control
                                    placeholder="Set the threshold"
                                    aria-label="Set the threshold"
                                    aria-describedby="basic-addon2"
                                    onChange={handleChange}
                                    value={input}
                                    />
                                    <Button variant="outline-success" onClick={handleSubmit}>
                                    Set threshold
                                    </Button>
                                </InputGroup>
                                 : <></>    
                            }
                        
                    </Card.Body>
                </Card>
            </div>
        );

    } else {
        // For normal devices
        return (
            <div className="d-flex p-2 flex-column">

                <Card className="sneaker-main-card" style={{ height: '100%', backgroundColor: '#293133', width: "25vw" }}>
                    <Card.Img className="card-img-top" variant="top" src={props.sneaker.thumbnail} onClick={(ev) => { navigate("/view/" + encodeURIComponent(props.sneaker.shoeName)); }} style={{ cursor: 'pointer' }} />
                    <Card.Body>
                        <Card.Title style={{ textDecoration: "none", color: "white" }}><span className="d-inline-block text-truncate" style={{ maxWidth: "23vw" }}>{brandContained ? props.sneaker.shoeName : props.sneaker.brand + " " + props.sneaker.shoeName}</span></Card.Title>
                        <Card.Text style={{ textDecoration: "none", color: "white" }}>
                            {resellRange}
                        </Card.Text>
                        {props.session !== null ? <>
                            <Row>
                            <Col lg={2} md="auto" className=".justify-content-start">
                            <div style={{ width: "2rem" }}>
                                <Heart isActive={props.isFavourite} onClick={() => { props.changeFavourite(props.sneaker); }} animationTrigger="both" inactiveColor="rgba(255,50,100,.75)" activeColor="#fb3958"  animationDuration={0.1} />
                            </div>
                            </Col>
                            <Col md="auto" className=".justify-content-start">
                                <Button variant="success" onClick={(ev) => { navigate("/view/" + encodeURIComponent(props.sneaker.shoeName)); }}>Show prices</Button>
                            </Col>
                            
                            </Row>
                            </> 
                            :
                            <>
                             <Col md="auto" className=".justify-content-start">
                                <Button variant="success" onClick={(ev) => { navigate("/view/" + encodeURIComponent(props.sneaker.shoeName)); }}>Show prices</Button>
                            </Col>
                            </>

                        }
                        
                            {props.fromFavourite ?
                                
                                <div className="p-2">
                                
                                <InputGroup className="mb-1">
                                    <Form.Control
                                    placeholder="Set the threshold"
                                    aria-label="Set the threshold"
                                    aria-describedby="basic-addon2"
                                    onChange={handleChange}
                                    value={input}
                                    />
                                    <Button variant="outline-success" onClick={handleSubmit}>
                                    Set threshold
                                    </Button>
                                </InputGroup>
                                </div>: <></>
                            }
                        
                    </Card.Body>
                </Card>
            </div>
        );

    }

}




export { Sneaker }