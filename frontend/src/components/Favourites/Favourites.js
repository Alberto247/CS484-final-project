import 'bootstrap/dist/css/bootstrap.min.css';
import { Loading } from '../Loading/Loading';
import {Sneaker} from '../Sneaker/Sneaker';
import Heart from "react-heart"
import { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'   
import logo from "../../logos/pizza_pasta_logo.png";
const emoji="🤌"
//Favourites page
function Favourites(props) {
    const [active, setActive] = useState(false);
    const [switches, setSwitches] = useState(0);
    const { width, height } = useWindowSize()
    if(props.loading) {
        return <Loading/>;
    }
    let confetti = <></>;
    let img=<></>
    if(switches>=10){
        confetti = <Confetti
        width={width}
        height={height}
        numberOfPieces={100}
        confettiSource={{x: width/2, y: height, w: 0, h: 0}}
        initialVelocityY={20}
        initialVelocityX={10}
        recycle={true}
        drawShape={ctx => {
            ctx.font = `40px Arial`
            ctx.fillText(emoji, 10, 10);
          }}
        />
        img=
        <div className="text-style">
        <img
          src={logo}
          width="500px"
          height="500px"
          className="d-inline-block align-top"
          alt=""
        />
        </div>

    }
    return(<>{props.favourites.length !==0 ? 
        <>
            <div className="d-flex mt-3 justify-content-center" ><h1>Favourites</h1></div>
            <div className="d-flex flex-row mb-3 align-items-center justify-content-center flex-wrap m-5"> 
                {props.favourites.map((el)=>{const e=el.productInfo;return <div key={e._id} className="p-2"><Sneaker showSuccess={props.showSuccess} isFavourite={true} fromFavourite={true} setThreshold={props.setThreshold} threshold={el.threshold} sneaker={e} changeFavourite={props.changeFavourite} session={props.session}> </Sneaker></div>})}
            </div>  
        </>:
        <>
        <h1 className="d-flex mt-3 justify-content-center">
            You have no favourites!
        </h1>
        <p className='d-flex mt-3 justify-content-center'>
             Click on the <Heart  style={{ width: "2rem", marginLeft:"1rem", marginRight:"1rem" }} onClick={() => { setSwitches(switches+1); setActive(!active); }} isActive={active} animationTrigger="both" inactiveColor="rgba(255,50,100,.75)" activeColor="#fb3958" animationDuration={0.1}></Heart> to add a sneaker to your favourites and be able to monitor its price in real time.
        </p>
        {confetti}{img}
        </>
        
    }</>
    );
}

export { Favourites }