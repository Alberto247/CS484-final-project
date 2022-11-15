import Figure from 'react-bootstrap/Figure'
import { useNavigate } from 'react-router-dom'

function Sneaker(props) {
    const navigate = useNavigate()
    const max=Math.max(...Object.values(props.sneaker.lowestResellPrice))
    const min=Math.min(...Object.values(props.sneaker.lowestResellPrice))
    let resellRange="Price: $"+min+"-$"+max;
    if(min===max){
        resellRange="Price: $"+min
    }
    const brandContained=props.sneaker.shoeName.includes(props.sneaker.brand)
    return (
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
        
    )
}
export{Sneaker}