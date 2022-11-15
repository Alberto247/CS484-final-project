import Figure from 'react-bootstrap/Figure'
import Image from "react-bootstrap/Image";
function Sneaker(props) {
    
    const max=Math.max(...Object.values(props.sneaker.lowestResellPrice))
    const min=Math.min(...Object.values(props.sneaker.lowestResellPrice))
    const resellRange="Price: $"+min+"-$"+max;
    const brandContained=props.sneaker.shoeName.includes(props.sneaker.brand)
    return (
        <>
            <Figure>
                <Image
                    src={props.sneaker.thumbnail}
                    rounded
                />
                <Figure.Caption>
                    {brandContained ? props.sneaker.shoeName : props.sneaker.brand+" "+props.sneaker.shoeName}
                </Figure.Caption>
                <Figure.Caption>
                    <h2>{resellRange}</h2>
                </Figure.Caption>
            </Figure>
        </>
    )
}
export{Sneaker}