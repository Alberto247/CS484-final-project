import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Heart from "react-heart"

function Sneaker(props) {
    const navigate = useNavigate();
    let resellRange="Price Not available";
    
    if(props.sneaker.lowestResellPrice !== undefined) {
        const max=Math.max(...Object.values(props.sneaker.lowestResellPrice));
        const min=Math.min(...Object.values(props.sneaker.lowestResellPrice));
        resellRange="Price: $"+min+" - $"+max;
        if(min===max){
            resellRange="Price: $"+min;
        }
    }
    
    const brandContained=props.sneaker.shoeName.includes(props.sneaker.brand);
     return (
        <div className="d-flex p-2 flex-column">
        
            <Card className="sneaker-main-card" style={{ height: '100%', backgroundColor:'#293133' }}>
                <Card.Img className="card-img-top" variant="top" src={props.sneaker.thumbnail}/>
                <Card.Body>
                    <Card.Title style={{textDecoration: "none", color:"white", "width":"400px"}}>{brandContained ? props.sneaker.shoeName : props.sneaker.brand+" "+props.sneaker.shoeName}</Card.Title>
                    <Card.Text style={{textDecoration: "none", color:"white", "width":"200px"}}>
                    {resellRange}
                    </Card.Text>
                    {props.session!==null && <Card.Text>
                        <div style={{ width: "2rem" }}>
                        <Heart isActive={props.isFavourite} onClick={() => {props.changeFavourite(props.sneaker);}}animationTrigger = "both" inactiveColor = "rgba(255,50,100,.75)" activeColor = "#fb3958" style = {{marginTop:'1rem'}} animationDuration = {0.1}/>
                    </div>
                    </Card.Text>}
                    <Button variant="success" onClick={(ev)=>{navigate("/view/"+props.sneaker.shoeName);}}>Show prices</Button>
                </Card.Body>
            </Card>
        </div>
  );
} 




export{Sneaker}