import Figure from 'react-bootstrap/Figure'
function Sneaker(props) {
    
    const max=Math.max(...Object.values(props.sneaker.lowestResellPrice))
    const min=Math.min(...Object.values(props.sneaker.lowestResellPrice))
    const resellRange="Price: $"+min+"-$"+max;
    const brandContained=props.sneaker.shoeName.includes(props.sneaker.brand)
    return (
        <>
            <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    src={props.sneaker.thumbnails}
                />
                <Image
                    src={props.sneaker.thumbnail}
                    rounded
                    height={"500vh"}
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