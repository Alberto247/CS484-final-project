import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "react-bootstrap/Image";
import flightClub from "../../logos/flightClub.png";
import goat from "../../logos/goat.png";
import klekt from "../../logos/klekt.png";
import stockX from "../../logos/stockX.png";
import DOMPurify from 'dompurify';
import { Loading } from '../Loading/Loading';
import "./../../Sneaker.css";


function BigSneaker(props) {

    if(!props.sneaker)
        return <Loading/>;
    
    const logoMap={stockX:stockX, flightClub:flightClub, goat:goat, klekt:klekt};
    let resellRange="Price Not available";
    
    if(props.sneaker.lowestResellPrice !== undefined) {
        const max=Math.max(...Object.values(props.sneaker.lowestResellPrice));
        const min=Math.min(...Object.values(props.sneaker.lowestResellPrice));
        resellRange="Price: $"+min+" - $"+max;
        if(min===max){
            resellRange="Price: $"+min;
        }
    }
    const brandContained = props.sneaker.shoeName.includes(props.sneaker.brand)

    const priceList = Object.keys(props.sneaker.resellLinks).map((reseller) => {
        return (<a href={props.sneaker.resellLinks[reseller]} target="_blank" rel="noreferrer" style={{textDecoration: "none", color:"black", "width":"100%"}}><div className="d-flex align-items-start justify-content-center border border-success m-2">
            <div className="d-flex p-2"><Image height={"30vh"} src={logoMap[reseller]}></Image></div>
            <div className="d-flex p-2"><h2>$ {props.sneaker.lowestResellPrice ? props.sneaker.lowestResellPrice[reseller] : resellRange}</h2></div>
        </div></a>)
    })

   /*  return (
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
                <h2><center><div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.sneaker.description)}}></div></center></h2>
            </div>
            <div className="d-flex p-2">
                {resellRange}
            </div>
            {priceList}
        </div>
    ) */

    return (
        <div>
        <main className="container d-flex justify-content-center align-items-center flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                <img style={{maxWidth:"70%"}} src={props.sneaker.thumbnail} alt=""></img>

            <div className="right-column d-flex flex-column">
                <div class="product-description">
                    <h1>{brandContained ? props.sneaker.shoeName : props.sneaker.brand + " " + props.sneaker.shoeName}</h1>
                    <p><div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.sneaker.description)}}></div></p>
                </div>
                <div class="product-price">
                {resellRange}
                </div>   
                <h2>Buy from your favourite website!</h2>
            
                {priceList}
                            
            </div>
        </main>
        
        
        </div>
        
      );
}

export { BigSneaker };