import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "react-bootstrap/Image";
import flightClub from "../../logos/flightClub.png";
import goat from "../../logos/goat.png";
import klekt from "../../logos/klekt.png";
import stockX from "../../logos/stockX.png";
import DOMPurify from 'dompurify';
import { Loading } from '../Loading/Loading';
import "./../../Sneaker.css";
import Heart from "react-heart"

//Large shoe component
function BigSneaker(props) {

    if(props.sneaker===undefined)
        return <Loading/>;
    if(props.sneaker===null) //If null, shoe could not be found
        return <center>404 - Sneaker not found</center>;
    
    const logoMap={stockX:stockX, flightClub:flightClub, goat:goat, klekt:klekt};
    let resellRange="Price Not available";
    
    if(Object.keys(props.sneaker.lowestResellPrice).length !== 0) {
        const max=Math.max(...Object.values(props.sneaker.lowestResellPrice));
        const min=Math.min(...Object.values(props.sneaker.lowestResellPrice));
        resellRange="Price: $"+min+" - $"+max;
        if(min===max){
            resellRange="Price: $"+min;
        }
    }

    const priceList = Object.keys(props.sneaker.resellLinks).map((reseller) => {
        return (
            <a href={props.sneaker.resellLinks[reseller]} target="_blank" rel="noreferrer" style={{textDecoration: "none", color:"black", "width":"100%"}}>
                <div className="d-flex align-items-start justify-content-center border border-success m-2">
                    <div className="d-flex p-2"><Image height={"30vh"} src={logoMap[reseller]}></Image></div>
                    <div className="d-flex p-2"><h2>{Object.keys(props.sneaker.lowestResellPrice).length !== 0 ? "$ "+props.sneaker.lowestResellPrice[reseller] : "Click for price info"}</h2></div>
                </div>
            </a>);
    });

    const brandContained = props.sneaker.shoeName.includes(props.sneaker.brand);

    return (
        <div>
            <main className="container d-flex justify-content-center align-items-center flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row">
                 <img style={{maxWidth:"70%"}} src={props.sneaker.thumbnail} alt=""></img>

                <div className="right-column d-flex flex-column">
                    <div className="product-description">
                        <h1>{brandContained ? props.sneaker.shoeName : props.sneaker.brand + " " + props.sneaker.shoeName}</h1>
                        <p><div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.sneaker.description)}}></div></p>
                    </div>
                    <div style={{ width: "2rem" }}>
                        <Heart isActive={props.isFavourite} onClick={() => { props.changeFavourite(props.sneaker); }} animationTrigger="both" inactiveColor="rgba(255,50,100,.75)" activeColor="#fb3958" animationDuration={0.1} />
                    </div>
                    <p>Add to your favourites list!</p>
                    
                    <div className="product-price">{resellRange}</div>   
                    <h2>Buy from your favourite website!</h2>
                
                    {priceList}
                                
                </div>
            </main>
        </div>
      );
}

export { BigSneaker };