
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Sneaker(props) {
    let resellRange="Price Not available";
    const navigate = useNavigate()
    if(props.sneaker.lowestResellPrice !== undefined) {
        const max=Math.max(...Object.values(props.sneaker.lowestResellPrice));
        const min=Math.min(...Object.values(props.sneaker.lowestResellPrice));
        resellRange="Price: $"+min+"-$"+max;
        if(min===max){
            resellRange="Price: $"+min;
        }
    }
    
    const brandContained=props.sneaker.shoeName.includes(props.sneaker.brand)
/*     return (
        <div className="d-flex p-2 flex-column">
            <div onClick={(ev)=>{ev.preventDefault();navigate("/view/"+props.sneaker.shoeName)}} style={{textDecoration: "none", color:"black", "width":"400px"}}>
            <Figure>
                <div className="d-flex p-2">
                <Figure.Image
                    src={props.sneaker.thumbnail}
                    rounded
                    height={"400px"}
                    width={"150px"}
                />
                </div>
                <div className="d-flex p-2">
                <Figure.Caption style={{textDecoration: "none", color:"black", "width":"400px"}}>
                    {brandContained ? props.sneaker.shoeName : props.sneaker.brand+" "+props.sneaker.shoeName}
                </Figure.Caption>
                </div>
                <div className="d-flex p-2">
                <Figure.Caption style={{textDecoration: "none", color:"black", "width":"400px"}}>
                    {resellRange}
                </Figure.Caption>
                </div>
            </Figure>
            </div>
        </div>
        
    )*/
     return (
        <div className="d-flex p-2 flex-column">
        <div onClick={(ev)=>{ev.preventDefault();navigate("/view/"+props.sneaker.shoeName)}}>
            <Card raised className="sneaker-main-card" style={{ height: '100%', backgroundColor:'#293133' }}>
            <Card.Img className="sneaker-img" variant="top" src={props.sneaker.thumbnail} />
            <Card.Body>
                <Card.Title  style={{textDecoration: "none", color:"white", "width":"400px"}}>{brandContained ? props.sneaker.shoeName : props.sneaker.brand+" "+props.sneaker.shoeName}</Card.Title>
                <Card.Text style={{textDecoration: "none", color:"white", "width":"200px"}}>
                {resellRange}
                </Card.Text>
                <Button variant="success" onClick={(ev) => {ev.preventDefault();navigate("/view/"+props.sneaker.shoeName)}}>Show prices</Button>
            </Card.Body>
            </Card>
        </div>
        </div>
  );
} 




export{Sneaker}