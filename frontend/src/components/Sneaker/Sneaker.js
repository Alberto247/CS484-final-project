import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
        <div onClick={(ev)=>{ev.preventDefault(); navigate("/view/"+props.sneaker.shoeName);}}>
            <Card className="sneaker-main-card" style={{ height: '100%', backgroundColor:'#293133' }}>
            <Card.Img className="card-img-top" variant="top" src={props.sneaker.thumbnail}/>
            <Card.Body>
                <Card.Title style={{textDecoration: "none", color:"white", "width":"400px"}}>{brandContained ? props.sneaker.shoeName : props.sneaker.brand+" "+props.sneaker.shoeName}</Card.Title>
                <Card.Text style={{textDecoration: "none", color:"white", "width":"200px"}}>
                {resellRange}
                </Card.Text>
                <Button variant="success">Show prices</Button>
            </Card.Body>
            </Card>
        </div>
        </div>
  );
} 




export{Sneaker}