import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "react-bootstrap/Image";
import flightClub from "../../logos/flightClub.png";
import goat from "../../logos/goat.png";
import klekt from "../../logos/klekt.png";
import stockX from "../../logos/stockX.png";

function BigSneaker(props) {
    const logoMap={stockX:stockX,flightClub:flightClub,goat:goat, klekt:klekt}
    const max = Math.max(...Object.values(props.sneaker.lowestResellPrice))
    const min = Math.min(...Object.values(props.sneaker.lowestResellPrice))
    const resellRange = "Price: $" + min + "-$" + max;
    const brandContained = props.sneaker.shoeName.includes(props.sneaker.brand)

    const priceList = Object.keys(props.sneaker.lowestResellPrice).map((reseller) => {
        return (<a href={props.sneaker.resellLinks[reseller]} style={{textDecoration: "none", color:"black", "width":"400px"}}><div className="d-flex align-items-start justify-content-center border border-success m-2">
            <div className="d-flex p-2"><Image height={"60px"} src={logoMap[reseller]}></Image></div>
            <div className="d-flex p-2"><h2>$ {props.sneaker.lowestResellPrice[reseller]}</h2></div>
        </div></a>)
    })

    return (
        <div className="d-flex p-2 flex-column align-items-center justify-content-center">
            <div className="d-flex p-2">
                <Image
                    src={props.sneaker.thumbnail}
                    rounded
                    height={"500vh"}
                />
            </div>
            <div className="d-flex p-2">
                <h1>{brandContained ? props.sneaker.shoeName : props.sneaker.brand + " " + props.sneaker.shoeName}</h1>
            </div>
            <div className="d-flex p-2">
                <h2><center>{props.sneaker.description.replace("<p>", "").replace("</p>","")}</center></h2>
            </div>
            <div className="d-flex p-2">
                {resellRange}
            </div>
            {priceList}
        </div>
    )
}

export { BigSneaker };